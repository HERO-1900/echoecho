#!/usr/bin/env node
// N2:MiniMax 模拟用户批 —— 与 Sonnet 批互为独立样本(换模型重现,验证共性需求不是单模型偏见)
const KEY = process.env.MINIMAX_API_KEY;
if (!KEY) { console.error('缺 MINIMAX_API_KEY'); process.exit(1); }

const PROMPT = `你在为「双向情侣备忘录」产品做用户模拟调研(她说一句话→他那边变成任务卡,三态收到/在办/办妥+进度%,AI 僚机自动出方案,语音优先,将来有硬件挂链)。
请扮演 6 个中国下沉市场与非一线场景的 persona(有意与一线白领错开):县城幼师/工厂班组长/外卖骑手/宝妈微商/异地打工情侣/50 岁给老伴用的阿姨。每个第一人称输出:我是谁、三次"说了就忘"真实场景(生活颗粒度)、当时情绪、现在土办法、最想要的 3 个功能、最担心 1 点、付费意愿(具体到钱)。
最后加"横向洞察:下沉市场与一线的 3 个不同点"。直接输出 markdown。`;

const r = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', {
  method: 'POST',
  headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KEY },
  body: JSON.stringify({ model: 'MiniMax-M3', max_tokens: 12000, messages: [{ role: 'user', content: PROMPT }] }),
});
const j = await r.json();
const t = j?.choices?.[0]?.message?.content;
if (!t) { console.error('MiniMax 空响应:', JSON.stringify(j).slice(0, 300)); process.exit(1); }
const fs = await import('fs');
fs.writeFileSync('docs/research/personas-minimax.md', '# MiniMax 模拟用户批(下沉/非一线视角)\n\n' + t + '\n');
console.log('OK', t.length, '字');
