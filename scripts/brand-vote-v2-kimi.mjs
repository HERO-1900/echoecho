#!/usr/bin/env node
// 品牌 ABCDE 模拟投票 v2 · Kimi 扮演 90 个分层用户 + 功能偏好调研
// 产出: docs/research/BRAND_VOTE_V2.md
const KEY = process.env.KIMI_API_KEY;
if (!KEY) { console.error('缺 KIMI_API_KEY'); process.exit(1); }

const SEGMENTS = [
  ['刚谈恋爱的年轻人', '18-23', '学生/初入职场,爱玩梗重仪式感'],
  ['热恋同居情侣', '23-28', '家务分工与琐事摩擦期'],
  ['备婚/新婚', '26-32', '婚礼装修大宗决策多'],
  ['已婚有娃', '30-40', '时间稀缺,家庭群信息爆炸'],
  ['老夫老妻', '40-55', '表达含蓄,实用主义'],
  ['异地恋', '20-30', '在意被记住的证据'],
  ['要照顾父母的子女', '28-45', '吃药复诊提醒,报喜不报忧的爸妈'],
  ['被子女关心的父母', '55-75', '不太会用智能机,怕麻烦孩子'],
  ['亚文化玩梗青年', '18-30', '嗑CP/玩梗/亚文化圈层,反感说教'],
];
const FEATURES = '1语音说完自动变任务卡 2AI自动出选购方案 3进度条免催 4办妥回响仪式 5鸽了赎回玩法(请奶茶抵债) 6opt-in趣味排行 7纪念日周期提醒 8锁屏强提醒 9硬件挂坠 10长辈大字模式 11毒舌催办文案 12模式一键切换(甜蜜/毒舌/女王/关怀) 13历史搜索 14家庭群消息自动抓任务';

const BRIEF = `同一个双向备忘录产品(说一句→对方变任务卡:收到/在办/办妥+AI自动出方案+语音优先+将来有硬件),五种品牌包装:
【A 念响】温柔文艺:"念念不忘必有回响",墨青+珊瑚,她端念他端响。
【B 拉勾勾】童趣契约:"拉过勾的事不许忘",办妥盖"说到做到"红章,粉+朱砂,小指挂坠。
【C 女王陛下】暗黑高级玩梗:她=女王他=忠犬,"汪!遵命/求摸头",曜石黑+鎏金,项圈狗牌,双方确认制。
【D 毒舌修勾】meme互怼:柴犬管家阴阳怪气催办,"鸽王行为预警"通缉令,荧光绿贴纸风,小饼干赎回协议。
【E 爸妈听话】温情反转:"小时候你教我听话,现在换我啰嗦你",吃药打卡/复诊提醒/大字适老,米黄枣红。`;

async function kimi(prompt) {
  const r = await fetch('https://api.kimi.com/coding/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'kimi-for-coding', max_tokens: 9000, messages: [{ role: 'user', content: prompt }] }),
  });
  const j = await r.json();
  const t = (j?.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  if (!t) throw new Error('Kimi 空响应: ' + JSON.stringify(j).slice(0, 160));
  return t;
}

const votes = [];
for (const [seg, age, note] of SEGMENTS) {
  for (const half of [1, 2]) { // 每分层 2 批 ×5 人 = 10 人
    const prompt = `${BRIEF}
请扮演 5 个互不相同的「${seg}」(${age} 岁,${note};第 ${half} 批,与另一批人物不同),每人独立:
1. 从 ABCDE 五个品牌选最喜欢的一个投票(都不喜欢投 N 并说想要什么)
2. 从功能清单选 top3(报编号):${FEATURES}
3. 给出愿付价位
人物要具体,理由说人话有生活细节。只输出 JSON 数组:
[{"name":"","age":0,"city":"","segment":"${seg}","vote":"A|B|C|D|E|N","reason":"两三句","top3":[1,2,3],"pay":""}]`;
    try {
      const raw = await kimi(prompt);
      const m = raw.match(/\[[\s\S]*\]/);
      votes.push(...JSON.parse(m ? m[0] : raw));
      console.log(`[v2] ${seg} 批${half} ✓ 累计 ${votes.length}`);
    } catch (e) { console.error(`[v2] ${seg} 批${half} ✗`, e.message); }
  }
}

const tally = {}; const featCnt = {}; const bySeg = {};
for (const v of votes) {
  tally[v.vote] = (tally[v.vote] || 0) + 1;
  bySeg[v.segment] ??= {}; bySeg[v.segment][v.vote] = (bySeg[v.segment][v.vote] || 0) + 1;
  for (const f of v.top3 || []) featCnt[f] = (featCnt[f] || 0) + 1;
}
const FNAMES = FEATURES.split(' ').map(s => s.replace(/^\d+/, ''));
let md = `# ABCDE 五品牌模拟投票 v2(Kimi 扮演 ${votes.length} 人)\n\n> 模拟调研非真实用户;kimi-for-coding;9 分层×10。\n\n## 总票\n${['A','B','C','D','E','N'].map(k => `${k}:${tally[k] || 0}`).join(' | ')}\n\n## 分层票型\n|人群|A|B|C|D|E|N|\n|---|---|---|---|---|---|---|\n`;
for (const [s, c] of Object.entries(bySeg)) md += `|${s}|${['A','B','C','D','E','N'].map(k => c[k] || 0).join('|')}|\n`;
md += `\n## 功能偏好总榜(被选进 top3 次数)\n`;
Object.entries(featCnt).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => md += `- ${FNAMES[f - 1] || f}:${n}\n`);
md += `\n## 逐票\n`;
for (const v of votes) md += `- **${v.vote}** ${v.name}(${v.age},${v.city},${v.segment}):${v.reason} · top3:[${(v.top3 || []).join(',')}] · 付费:${v.pay}\n`;
const fs = await import('fs');
fs.writeFileSync('docs/research/BRAND_VOTE_V2.md', md);
console.log(`完成:${votes.length} 票 → docs/research/BRAND_VOTE_V2.md`);
