// 念念 EchoEcho · API v1.0.0 — 单文件路由(Cloudflare Pages Functions)
// 鉴权模型:member token(Bearer)| 硬件 X-Device-Token | 调研引擎 ENGINE_TOKEN

const J = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
const uid = () => crypto.randomUUID().replaceAll('-', '').slice(0, 16);
const code6 = () => { // 邀请码:NN-XXXX,去易混字符
  const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; let s = '';
  const r = crypto.getRandomValues(new Uint8Array(4));
  for (const b of r) s += A[b % A.length];
  return 'NN-' + s;
};

async function auth(env, request) {
  const t = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!t) return null;
  const m = await env.DB.prepare('SELECT * FROM ee_members WHERE token=?').bind(t).first();
  return m || null;
}

async function transcribe(env, buf) {
  // Workers AI Whisper:音频 → 文字。实测基础版对中文最稳(turbo 版曾输出乱码,已回滚);
  // 已知问题:中文常输出繁体,v1.1 计划在调研 runner 侧做繁→简转换
  const res = await env.AI.run('@cf/openai/whisper', { audio: [...new Uint8Array(buf)] });
  return (res && res.text || '').trim();
}

async function createItem(env, { space_id, from_member, kind, text, audio_key }) {
  const id = uid(), now = Date.now();
  await env.DB.prepare(
    `INSERT INTO ee_items (id,space_id,from_member,kind,text,audio_key,status,progress,research,created_at,updated_at)
     VALUES (?,?,?,?,?,?,'received',0,'none',?,?)`
  ).bind(id, space_id, from_member, kind, text, audio_key || null, now, now).run();
  return id;
}

export async function onRequest({ request, env, params }) {
  const path = '/' + (params.path || []).join('/');
  const method = request.method;
  try {
    // ---------- 结对 ----------
    if (path === '/space' && method === 'POST') {
      const { name, nickname } = await request.json();
      if (!nickname) return J({ error: 'nickname required' }, 400);
      const sid = uid(), mid = uid(), token = crypto.randomUUID(), now = Date.now();
      let invite = code6();
      for (let i = 0; i < 5; i++) { // 撞码重试
        const dup = await env.DB.prepare('SELECT id FROM ee_spaces WHERE invite_code=?').bind(invite).first();
        if (!dup) break; invite = code6();
      }
      await env.DB.prepare('INSERT INTO ee_spaces (id,name,invite_code,created_at) VALUES (?,?,?,?)')
        .bind(sid, name || '我们的小家', invite, now).run();
      await env.DB.prepare('INSERT INTO ee_members (id,space_id,nickname,token,created_at) VALUES (?,?,?,?,?)')
        .bind(mid, sid, nickname, token, now).run();
      return J({ space_id: sid, invite_code: invite, member_id: mid, token });
    }
    if (path === '/join' && method === 'POST') {
      const { invite_code, nickname } = await request.json();
      const sp = await env.DB.prepare('SELECT * FROM ee_spaces WHERE invite_code=?')
        .bind((invite_code || '').trim().toUpperCase()).first();
      if (!sp) return J({ error: '邀请码不存在' }, 404);
      const mid = uid(), token = crypto.randomUUID();
      await env.DB.prepare('INSERT INTO ee_members (id,space_id,nickname,token,created_at) VALUES (?,?,?,?,?)')
        .bind(mid, sp.id, nickname || '新成员', token, Date.now()).run();
      return J({ space_id: sp.id, space_name: sp.name, member_id: mid, token });
    }

    // ---------- 一次性自举建表(token 无 D1 CLI 权限的绕行;只建不删)----------
    if (path === '/setup' && method === 'POST') {
      if (request.headers.get('x-engine-token') !== env.ENGINE_TOKEN) return J({ error: 'forbidden' }, 403);
      const ddl = [
        `CREATE TABLE IF NOT EXISTS ee_spaces (id TEXT PRIMARY KEY, name TEXT NOT NULL, invite_code TEXT UNIQUE NOT NULL, created_at INTEGER NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS ee_members (id TEXT PRIMARY KEY, space_id TEXT NOT NULL, nickname TEXT NOT NULL, token TEXT UNIQUE NOT NULL, created_at INTEGER NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS ee_items (id TEXT PRIMARY KEY, space_id TEXT NOT NULL, from_member TEXT NOT NULL, to_member TEXT, kind TEXT NOT NULL DEFAULT 'text', text TEXT NOT NULL, audio_key TEXT, status TEXT NOT NULL DEFAULT 'received', progress INTEGER NOT NULL DEFAULT 0, note TEXT, research TEXT NOT NULL DEFAULT 'none', research_html TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS ee_devices (token TEXT PRIMARY KEY, member_id TEXT NOT NULL, label TEXT, created_at INTEGER NOT NULL)`,
        `CREATE INDEX IF NOT EXISTS idx_ee_items_space ON ee_items(space_id, created_at DESC)`,
        `CREATE INDEX IF NOT EXISTS idx_ee_members_space ON ee_members(space_id)`,
      ];
      for (const s of ddl) await env.DB.prepare(s).run();
      return J({ ok: true, tables: ['ee_spaces', 'ee_members', 'ee_items', 'ee_devices'] });
    }

    // ---------- 调研引擎通道(本地 runner / BYOK)----------
    if (path === '/research/queue' && method === 'GET') {
      if (request.headers.get('x-engine-token') !== env.ENGINE_TOKEN) return J({ error: 'forbidden' }, 403);
      const rows = await env.DB.prepare(
        "SELECT id,text FROM ee_items WHERE research='wanted' ORDER BY updated_at LIMIT 3").all();
      const ids = (rows.results || []).map(r => r.id);
      if (ids.length)
        await env.DB.prepare(`UPDATE ee_items SET research='running', updated_at=? WHERE id IN (${ids.map(() => '?').join(',')})`)
          .bind(Date.now(), ...ids).run();
      return J({ queue: rows.results || [] });
    }
    if (path === '/research/result' && method === 'POST') {
      if (request.headers.get('x-engine-token') !== env.ENGINE_TOKEN) return J({ error: 'forbidden' }, 403);
      const { id, html, error } = await request.json();
      await env.DB.prepare('UPDATE ee_items SET research=?, research_html=?, updated_at=? WHERE id=?')
        .bind(error ? 'error' : 'done', html || null, Date.now(), id).run();
      return J({ ok: true });
    }

    // ---------- 硬件通道:挂链一键录音 ----------
    if (path === '/ingest' && method === 'POST') {
      const dt = request.headers.get('x-device-token');
      const dev = dt && await env.DB.prepare('SELECT * FROM ee_devices WHERE token=?').bind(dt).first();
      if (!dev) return J({ error: 'unknown device' }, 403);
      const owner = await env.DB.prepare('SELECT * FROM ee_members WHERE id=?').bind(dev.member_id).first();
      if (!owner) return J({ error: 'orphan device' }, 410);
      const buf = await request.arrayBuffer();
      if (!buf.byteLength || buf.byteLength > 25 * 1048576) return J({ error: 'audio 0-25MB' }, 400);
      const key = `voice/${owner.space_id}/${uid()}.audio`;
      await env.AUDIO.put(key, buf, { httpMetadata: { contentType: request.headers.get('content-type') || 'application/octet-stream' } });
      const text = await transcribe(env, buf);
      const id = await createItem(env, {
        space_id: owner.space_id, from_member: owner.id, kind: 'voice',
        text: text || '(转写失败,请听原声)', audio_key: key,
      });
      return J({ ok: true, id, transcript: text });
    }

    // ---------- 以下都要成员登录 ----------
    const me = await auth(env, request);
    if (!me) return J({ error: 'unauthorized' }, 401);

    if (path === '/me' && method === 'GET') {
      const sp = await env.DB.prepare('SELECT * FROM ee_spaces WHERE id=?').bind(me.space_id).first();
      const members = await env.DB.prepare('SELECT id,nickname,created_at FROM ee_members WHERE space_id=?').bind(me.space_id).all();
      return J({ me: { id: me.id, nickname: me.nickname }, space: sp, members: members.results || [] });
    }

    if (path === '/items' && method === 'GET') {
      const rows = await env.DB.prepare(
        `SELECT id,from_member,to_member,kind,text,audio_key,status,progress,note,research,
                (research_html IS NOT NULL) AS has_page,created_at,updated_at
         FROM ee_items WHERE space_id=? ORDER BY created_at DESC LIMIT 200`).bind(me.space_id).all();
      return J({ items: rows.results || [] });
    }
    if (path === '/items' && method === 'POST') {
      const { text } = await request.json();
      if (!text || !text.trim()) return J({ error: 'text required' }, 400);
      const id = await createItem(env, { space_id: me.space_id, from_member: me.id, kind: 'text', text: text.trim() });
      return J({ ok: true, id });
    }
    if (path === '/voice' && method === 'POST') {
      const buf = await request.arrayBuffer();
      if (!buf.byteLength || buf.byteLength > 25 * 1048576) return J({ error: 'audio 0-25MB' }, 400);
      const key = `voice/${me.space_id}/${uid()}.audio`;
      await env.AUDIO.put(key, buf, { httpMetadata: { contentType: request.headers.get('content-type') || 'audio/webm' } });
      const text = await transcribe(env, buf);
      const id = await createItem(env, {
        space_id: me.space_id, from_member: me.id, kind: 'voice',
        text: text || '(转写失败,请听原声)', audio_key: key,
      });
      return J({ ok: true, id, transcript: text });
    }

    const mItem = path.match(/^\/items\/([a-z0-9]+)$/);
    if (mItem && method === 'PATCH') {
      const it = await env.DB.prepare('SELECT * FROM ee_items WHERE id=? AND space_id=?').bind(mItem[1], me.space_id).first();
      if (!it) return J({ error: 'not found' }, 404);
      const b = await request.json();
      const status = ['received', 'doing', 'done'].includes(b.status) ? b.status : it.status;
      const progress = Number.isInteger(b.progress) ? Math.max(0, Math.min(100, b.progress)) : it.progress;
      const research = b.research === 'wanted' && ['none', 'error'].includes(it.research) ? 'wanted' : it.research;
      await env.DB.prepare('UPDATE ee_items SET status=?, progress=?, note=?, research=?, updated_at=? WHERE id=?')
        .bind(status, status === 'done' ? 100 : progress, b.note ?? it.note, research, Date.now(), it.id).run();
      return J({ ok: true });
    }

    const mAudio = path.match(/^\/audio\/(.+)$/);
    if (mAudio && method === 'GET') {
      const key = decodeURIComponent(mAudio[1]);
      if (!key.startsWith(`voice/${me.space_id}/`)) return J({ error: 'forbidden' }, 403); // 只能听自己空间的
      const obj = await env.AUDIO.get(key);
      if (!obj) return J({ error: 'not found' }, 404);
      return new Response(obj.body, { headers: { 'content-type': obj.httpMetadata?.contentType || 'audio/webm' } });
    }

    const mPage = path.match(/^\/page\/([a-z0-9]+)$/); // AI 僚机方案页
    if (mPage && method === 'GET') {
      const it = await env.DB.prepare('SELECT research_html FROM ee_items WHERE id=? AND space_id=?').bind(mPage[1], me.space_id).first();
      if (!it || !it.research_html) return J({ error: 'not ready' }, 404);
      return new Response(it.research_html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }

    if (path === '/devices' && method === 'POST') {
      const { label } = await request.json().catch(() => ({}));
      const token = 'dev_' + crypto.randomUUID();
      await env.DB.prepare('INSERT INTO ee_devices (token,member_id,label,created_at) VALUES (?,?,?,?)')
        .bind(token, me.id, label || '挂链', Date.now()).run();
      return J({ device_token: token });
    }

    return J({ error: 'not found' }, 404);
  } catch (e) {
    return J({ error: String(e && e.message || e) }, 500);
  }
}
