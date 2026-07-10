#!/usr/bin/env node
// 念念 EchoEcho · AI 僚机 runner v1.0.0
// 轮询云端调研队列 → 调 LLM 生成方案页(完整 HTML)→ 回写。
// 两种引擎配置(二选一,谁在环境变量里就用谁):
//   A) 双引擎:KIMI_API_KEY + MINIMAX_API_KEY(MiniMax 调研内容,Kimi 排版成页)
//   B) BYOK 单引擎:LLM_BASE + LLM_KEY + LLM_MODEL(任意 OpenAI 兼容端点)
// 必需:ENGINE_TOKEN(与 Cloudflare Pages 的 secret 一致)
// 用法:node scripts/research-runner.mjs --once | --watch=30

const BASE = process.env.EE_BASE || 'https://echoecho-aqp.pages.dev';
const TOKEN = process.env.ENGINE_TOKEN;
const KIMI = process.env.KIMI_API_KEY;
const MINIMAX = process.env.MINIMAX_API_KEY;
const BYOK = process.env.LLM_KEY && process.env.LLM_BASE;
if (!TOKEN) { console.error('缺 ENGINE_TOKEN'); process.exit(1); }
if (!BYOK && !(KIMI && MINIMAX)) { console.error('缺引擎:配 KIMI_API_KEY+MINIMAX_API_KEY 或 LLM_BASE+LLM_KEY+LLM_MODEL'); process.exit(1); }

// BYOK:任意 OpenAI 兼容端点
async function byokChat(prompt, maxTokens = 6000) {
  const r = await fetch(process.env.LLM_BASE.replace(/\/$/, '') + '/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + process.env.LLM_KEY },
    body: JSON.stringify({ model: process.env.LLM_MODEL || 'gpt-4o-mini', max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] }),
  });
  const j = await r.json();
  const t = j?.choices?.[0]?.message?.content;
  if (!t) throw new Error('LLM 空响应: ' + JSON.stringify(j).slice(0, 200));
  return t;
}
// Kimi coding 端点(Anthropic 风格 messages API)
async function kimiChat(prompt, maxTokens = 16000) {
  const r = await fetch('https://api.kimi.com/coding/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KIMI, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'kimi-for-coding', max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] }),
  });
  const j = await r.json();
  // kimi-for-coding 可能先回 thinking 块,取 text 块
  const t = (j?.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  if (!t) throw new Error('Kimi 空响应: ' + JSON.stringify(j).slice(0, 200));
  return t;
}
// MiniMax chatcompletion_v2
async function minimaxChat(prompt, maxTokens = 8000) {
  const r = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + MINIMAX },
    body: JSON.stringify({ model: 'MiniMax-M3', max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] }),
  });
  const j = await r.json();
  const t = j?.choices?.[0]?.message?.content;
  if (!t) throw new Error('MiniMax 空响应: ' + JSON.stringify(j).slice(0, 200));
  return t;
}

const PAGE_RULES = `输出一个完整独立 HTML 文档(<!DOCTYPE html> 开头),手机优先,内联 CSS,禁止外部资源。
视觉:底色 #FAF6F0、主色 #E8604C、深色 #2C3A42,圆角卡片,中文排版舒适。
结构:大标题(引用 TA 的原话)→ 快速结论卡 → 预算分档或方案对比表 → 行动清单(可勾选样式)→ 温馨提示。
页脚必须有:"AI 僚机生成,型号价格等请以实际核实为准"。只输出 HTML,不要 markdown 围栏。`;

async function doResearch(item) {
  console.log('[僚机] 接单:', item.text.slice(0, 30));
  const strip = h => h.replace(/^[\s\S]*?(?=<!DOCTYPE html>)/i, '').replace(/```\s*$/, '').trim();
  if (BYOK) {
    return strip(await byokChat(
      `你是贴心的生活顾问"AI 僚机",帮伴侣把一句需求变成靠谱方案页。${PAGE_RULES}\n\nTA 说:「${item.text}」。请出完整方案页。`, 8000));
  }
  const brief = await minimaxChat(
    `你是严谨的生活调研员。伴侣提了一句需求,请输出结构化调研:需求拆解、3 个候选方案(含大致价位与优缺点)、决策建议、注意事项。涉及具体型号/价格要标注"以实际售价为准"。\n\n需求:「${item.text}」`, 6000);
  return strip(await kimiChat(
    `你是网页设计师,把调研内容排成漂亮的方案页。${PAGE_RULES}\n\nTA 的原话:「${item.text}」\n\n调研内容:\n${brief}`, 16000));
}

async function tick() {
  const q = await fetch(BASE + '/api/research/queue', { headers: { 'x-engine-token': TOKEN } }).then(r => r.json());
  for (const item of q.queue || []) {
    try {
      const html = await doResearch(item);
      if (!/^<!DOCTYPE html>/i.test(html.trim())) throw new Error('产出不是完整 HTML');
      await fetch(BASE + '/api/research/result', {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-engine-token': TOKEN },
        body: JSON.stringify({ id: item.id, html }),
      });
      console.log('[僚机] 交付 ✓', item.id);
    } catch (e) {
      await fetch(BASE + '/api/research/result', {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-engine-token': TOKEN },
        body: JSON.stringify({ id: item.id, error: String(e.message || e) }),
      });
      console.error('[僚机] 失败 ✗', item.id, e.message);
    }
  }
  return (q.queue || []).length;
}

const watch = process.argv.find(a => a.startsWith('--watch'));
if (watch) {
  const sec = Number(watch.split('=')[1] || 30);
  console.log(`[僚机] 值班中,每 ${sec}s 巡一次 → ${BASE}`);
  const loop = async () => { try { await tick(); } catch (e) { console.error('[僚机] tick 出错:', e.message); } setTimeout(loop, sec * 1000); };
  loop();
} else {
  tick().then(n => console.log(`[僚机] 本轮处理 ${n} 条`));
}
