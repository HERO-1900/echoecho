#!/usr/bin/env node
// 用户反馈舰队:Kimi ×5 + MiniMax ×5,每个跑一组 persona 案例测产品反馈
// 产出 docs/research/feedback-kimi-N.md / feedback-minimax-N.md
const KIMI = process.env.KIMI_API_KEY, MMX = process.env.MINIMAX_API_KEY;
if (!KIMI || !MMX) { console.error('缺 key'); process.exit(1); }

const PRODUCT = `产品:双向情侣备忘录 App。她/他说一句话(语音或文字)→ 对方那里变成一张任务卡 → 三态流转"收到/在办(带进度%)/办妥";AI 僚机能把一句需求自动变成方案页(如"想买洗衣机"→选购对比);语音优先;五种可切换人格模式:
- 念想(成熟同居/生活琐事)· 拉勾勾(恋爱前中期/甜蜜仪式感)· 女王陛下(权力反差角色扮演,双向)· 毒舌修勾(情侣"小狗"情结,对方像小狗一样听话,对抗式好玩+陪伴感)· 爸妈听话(子女↔父母牵挂,适老大字)
将来有硬件挂坠:想念的一瞬,按一下,对方感到你的声音和震动。`;

// Kimi 5 组:不同关系原型深访
const KIMI_TASKS = [
  '扮演 3 对【异国恋】(中美/中日/中澳,有时差)情侣,各自第一人称讲:时差里最想要什么、"想念一瞬对方能感到震动"这个硬件卖点戳不戳、哪个模式适合他们、愿不愿付费买挂坠。',
  '扮演 3 对【结婚 5-15 年的老夫老妻】,讲:这个产品对老夫老妻有没有用(还是只适合热恋)、生活琐事协作的真实痛点、哪个模式不尴尬、什么会让他们卸载。',
  '扮演 3 个【对这类产品高度怀疑的人】(独立女性/嫌麻烦的男生/隐私敏感者),让他们尖锐吐槽:这产品是不是在把爱情工具化/KPI 化、凭什么比微信好、什么设计会让他们反感。要求真的挑刺不要捧。',
  '扮演 3 对【刚在一起的年轻情侣】,讲:拉勾勾/女王/修勾三个模式哪个会让他们尖叫想玩、会不会截图发小红书、什么"梗"能让他们主动安利给闺蜜(破圈点)。',
  '扮演 3 个【被父母使用的场景】(给爸妈装的子女+一个真实老人),讲:爸妈听话模式老人能不能用起来、大字够不够、"关心变监控"的界限在哪、这条线值不值得单独做一个 App。',
];
// MiniMax 5 组:功能/商业/破圈/风险/跨市场
const MMX_TASKS = [
  '站在【产品经理】视角,基于这 5 个模式,提出 8 个现在 PRD 里可能没有、但用户会尖叫的新功能创意,每个说清对应哪个模式/人群、为什么会火。',
  '站在【增长/破圈】视角,分析:第一版要破圈,五个模式里哪一个最可能在小红书/抖音自传播?给出 3 个具体的"病毒点子"(可截图/可玩梗/可晒)。',
  '站在【商业化】视角,针对情绪消费+硬件,设计这个产品最可能赚钱的 3 条路径,并预判哪个模式的用户付费意愿最高、为什么。',
  '扮演 3 对【日本情侣】和 3 对【韩国情侣】,用当地视角讲:这个产品在你们国家会不会火、哪个模式水土不服、"女方给男方派任务"在你们文化里会不会有问题(尤其韩国)。',
  '站在【红队/风险】视角,预测这个产品上线后最可能翻车的 5 个点(社会舆论/情感反噬/隐私/性别争议/被大厂抄),每个给缓解思路。',
];

async function kimi(p) {
  const r = await fetch('https://api.kimi.com/coding/v1/messages', { method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KIMI, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'kimi-for-coding', max_tokens: 10000, messages: [{ role: 'user', content: p }] }) });
  const j = await r.json();
  return (j?.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
}
async function mmx(p) {
  const r = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', { method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + MMX },
    body: JSON.stringify({ model: 'MiniMax-M3', max_tokens: 10000, messages: [{ role: 'user', content: p }] }) });
  const j = await r.json();
  return j?.choices?.[0]?.message?.content || '';
}

const fs = await import('fs');
const run = async (engine, fn, tasks, tag) => {
  for (let i = 0; i < tasks.length; i++) {
    try {
      const t = await fn(`${PRODUCT}\n\n【任务】${tasks[i]}\n\n要求:真实、有生活细节、有锐利判断,不要都说好。输出 markdown。`);
      if (!t) throw new Error('空响应');
      fs.writeFileSync(`docs/research/feedback-${tag}-${i + 1}.md`, `# ${engine} 用户反馈 #${i + 1}\n\n> ${tasks[i]}\n\n${t}\n`);
      console.log(`[${tag}-${i + 1}] ✓ ${t.length}字`);
    } catch (e) { console.error(`[${tag}-${i + 1}] ✗`, e.message); }
  }
};
await Promise.all([
  run('Kimi', kimi, KIMI_TASKS, 'kimi'),
  run('MiniMax', mmx, MMX_TASKS, 'minimax'),
]);
console.log('[fleet] 全部完成');
