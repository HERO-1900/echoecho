#!/usr/bin/env node
// 品牌 A/B 模拟投票 · 由 Kimi(kimi-for-coding)扮演 50 个分层用户
// 用法: source "API Key 集合" 后 node scripts/brand-vote-kimi.mjs
// 产出: docs/research/BRAND_VOTE.md(含逐票理由与分层统计)
const KEY = process.env.KIMI_API_KEY;
if (!KEY) { console.error('缺 KIMI_API_KEY'); process.exit(1); }

// 50 人分层(数量,人群,年龄段,补充设定)
const SEGMENTS = [
  [8, '刚谈恋爱的年轻人', '18-23', '学生或初入职场,注重仪式感与好玩'],
  [8, '热恋同居情侣', '23-28', '开始面对家务分工与琐事摩擦'],
  [7, '备婚/新婚', '26-32', '筹备婚礼/装修,大宗决策多'],
  [7, '已婚有娃', '30-40', '时间稀缺,信息在家庭群里淹没'],
  [6, '老夫老妻', '40-55', '表达含蓄,实用主义,反感花哨'],
  [6, '异地恋', '20-30', '靠线上维系,在意"被记住"的证据'],
  [4, '给父母/孩子用的家庭用户', '35-50', '亲子或赡养场景,非情侣'],
  [4, '多元关系与个性人群', '20-35', '含 LGBTQ+、玩梗青年、亚文化爱好者'],
];

const BRIEF = `两个品牌方案(同一产品:双向备忘录——她说一句,他那边变成任务卡,收到/在办/办妥,AI 自动出方案,语音优先,将来有硬件挂坠):
【A 念想(念响)】气质:温柔、文艺、余韵。核心:「念念不忘,必有回响」,她端"念"墨青安静,他端"响"珊瑚声波,slogan"事事有回应,句句有回响"。
【B 拉勾勾 Pinky Promise】气质:童趣、俏皮、契约感。核心:「拉过勾的事,不许忘」,拉勾=承诺成立,办妥=盖"说到做到"红章,粉+奶油+朱砂,硬件是小指挂坠。`;

async function kimi(prompt) {
  const r = await fetch('https://api.kimi.com/coding/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'kimi-for-coding', max_tokens: 8000, messages: [{ role: 'user', content: prompt }] }),
  });
  const j = await r.json();
  const t = (j?.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  if (!t) throw new Error('Kimi 空响应: ' + JSON.stringify(j).slice(0, 160));
  return t;
}

const votes = [];
for (const [n, seg, age, note] of SEGMENTS) {
  const prompt = `${BRIEF}
请你扮演 ${n} 个互不相同的「${seg}」(${age} 岁,${note}),每人独立投票选 A 或 B(实在都不喜欢可投 N 并说想要什么)。人物要具体(化名/年龄/城市/职业/关系细节),理由要说人话、有生活细节,不要营销腔。
只输出 JSON 数组,不要其他文字,每项字段:
{"name":"","age":0,"city":"","segment":"${seg}","vote":"A|B|N","reason":"两三句","style_want":"最希望的产品风格一句话","pay":"愿付价位或不付"}`;
  try {
    const raw = await kimi(prompt);
    const m = raw.match(/\[[\s\S]*\]/);
    const arr = JSON.parse(m ? m[0] : raw);
    votes.push(...arr);
    console.log(`[投票] ${seg}: ${arr.length} 票`);
  } catch (e) { console.error(`[投票] ${seg} 失败:`, e.message); }
}

const cnt = v => votes.filter(x => x.vote === v).length;
const bySeg = {};
for (const v of votes) {
  bySeg[v.segment] ??= { A: 0, B: 0, N: 0 };
  bySeg[v.segment][v.vote] = (bySeg[v.segment][v.vote] || 0) + 1;
}
let md = `# 品牌 A/B 模拟投票(Kimi 扮演 ${votes.length} 人)\n\n> 模拟调研非真实用户;引擎 kimi-for-coding;分层设计见脚本。\n\n## 总票\nA 念想:${cnt('A')} | B 拉勾勾:${cnt('B')} | 都不选:${cnt('N')}\n\n## 分层\n|人群|A|B|N|\n|---|---|---|---|\n`;
for (const [s, c] of Object.entries(bySeg)) md += `|${s}|${c.A || 0}|${c.B || 0}|${c.N || 0}|\n`;
md += `\n## 逐票理由\n`;
for (const v of votes) md += `- **${v.vote}** ${v.name}(${v.age},${v.city},${v.segment}):${v.reason} · 想要风格:${v.style_want} · 付费:${v.pay}\n`;
const fs = await import('fs');
fs.writeFileSync('docs/research/BRAND_VOTE.md', md);
console.log(`完成:${votes.length} 票 → docs/research/BRAND_VOTE.md`);
