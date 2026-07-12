#!/usr/bin/env node
// 辅助调研批处理:Kimi + MiniMax 分工跑 UX走查/场景/定价/GTM文案/英文名
// 产出到 docs/research/,每个任务独立文件。用法:source key 后 node scripts/aux-research.mjs
const KIMI = process.env.KIMI_API_KEY, MMX = process.env.MINIMAX_API_KEY;
if (!KIMI || !MMX) { console.error('缺 key'); process.exit(1); }

const UI_SPEC = `产品「念响」当前网页版(v1.0)交互现状:
1) 开屏:建小家(昵称+小家名)或邀请码加入,无手机号无密码,token 存本地
2) 主界面:顶部小家名+邀请码chip+设置;三张统计卡(办妥率/待我回响/AI方案数);tabs(全部/我发出的/我收到的)+搜索框;任务卡列表
3) 任务卡:发起人+时间+文字(语音有"听原声"),三态按钮 收到→在办→办妥(在办出进度滑条,办妥可附一句交待),下方"请AI僚机出方案"按钮,方案好了变链接
4) 发送:底部输入条,文字或点🎙️开始/再点结束(录音→云端转写→发出)
5) 办妥时执行方看到庆祝动效,发起方收到"🌸有回响"通知;12秒轮询刷新
6) 方案页:AI生成的完整HTML,底部"←回到主界面/分享/回响给TA"
7) 设置:成员列表/生成硬件设备Token/退出`;

const JOBS = [
  { engine: 'kimi', out: 'UX_REVIEW_KIMI.md', name: 'UX走查',
    prompt: `你扮演 6 个不同的真实用户(手残党男生/细节控女生/50岁阿姨/程序员/异地恋/新用户第一次打开),逐一走查以下产品的完整流程,以每个人的口吻挑交互毛病并给具体修改建议(精确到"哪个界面哪个控件怎么改")。最后汇总"Top10 交互修改清单"按影响排序,并单列"新手首次体验的 3 个流失点"。\n${UI_SPEC}\n输出 markdown。` },
  { engine: 'kimi', out: 'GTM_COPY_KIMI.md', name: 'GTM文案包',
    prompt: `为「念响」(双向情侣备忘录,slogan 事事有回应句句有回响,五条产品线:念响/拉勾勾/女王陛下/毒舌修勾/爸妈听话)撰写发布物料包:1)发布计划:小红书/抖音/B站/即刻 各平台首发节奏与内容形态建议 2)每条产品线 3 句备选 slogan(共15句) 3)小红书种草文案 2 篇(300字内,真实口吻带场景) 4)抖音口播脚本 1 个(30秒) 5)App Store 描述文案 1 版 6)七夕挂坠众筹页头图文案 3 组。输出 markdown。` },
  { engine: 'minimax', out: 'SCENARIOS_MINIMAX.md', name: '场景扩展',
    prompt: `产品「念响」:说一句话→对方那里变任务卡(收到/在办/办妥+进度)+AI自动出方案+语音优先。已有 24 个情侣/亲子/长辈用例。请再构思 30 个新使用场景,重点覆盖我们没想到的:节日节点(春节红包/母亲节)、生活转折(搬家/怀孕/术后照护/宠物)、微妙关系时刻(冷战后台阶/道歉/异地时差)、群体场景(室友/闺蜜/球队)、硬件挂坠专属场景(开车/做饭/健身)。每个:场景名/一句话情境/产品动作/情绪价值,标注哪条产品线最适配。输出 markdown。` },
  { engine: 'minimax', out: 'PRICING_MINIMAX.md', name: '阶梯定价',
    prompt: `为「念响」设计商业化定价体系。背景:双人订阅制,已有调研建议 ¥98/年双人档;五条产品线共用底盘;AI 方案生成有算力成本;将来有硬件挂坠(BOM ¥55-75)。请输出:1)免费层边界设计(哪些功能免费才能起网络效应,AI方案免费几次) 2)三档阶梯定价表(档名/价格/权益/目标人群),按中国市场情侣客单敏感度校准 3)特调系列(女王/修勾皮肤话术包)按次买断 vs 订阅内含的利弊与建议 4)硬件+订阅捆绑定价 2 套方案 5)家庭版(爸妈听话)单独定价逻辑 6)收入结构第一年预估(标注全部假设)。输出 markdown。` },
  { engine: 'minimax', out: 'NAMING_EN_MINIMAX.md', name: '英文名再探',
    prompt: `中文品牌「念响」(念念不忘必有回响;她端"念"他端"响";双向情侣备忘录)已有英文名候选 Reecho(主推)/Resono/Everecho/Murmur/Echoly/Koecho,用户觉得还能更好。请再爆破 30 个新候选,方向:1)双关词(说/听/记/应答) 2)造词(音节美,全球好发音,.app域名大概率可注册) 3)现实物件隐喻(风铃/回音壁/留声机…) 4)中文拼音系(如 Nian, NianX)。每个:名字/发音/寓意/风险。最后给 top5 推荐榜与理由。输出 markdown。` },
];

async function kimi(p) {
  const r = await fetch('https://api.kimi.com/coding/v1/messages', {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KIMI, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'kimi-for-coding', max_tokens: 16000, messages: [{ role: 'user', content: p }] }) });
  const j = await r.json();
  return (j?.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
}
async function minimax(p) {
  const r = await fetch('https://api.minimaxi.com/v1/text/chatcompletion_v2', {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + MMX },
    body: JSON.stringify({ model: 'MiniMax-M3', max_tokens: 16000, messages: [{ role: 'user', content: p }] }) });
  const j = await r.json();
  return j?.choices?.[0]?.message?.content || '';
}

const fs = await import('fs');
for (const job of JOBS) {
  try {
    const t = await (job.engine === 'kimi' ? kimi(job.prompt) : minimax(job.prompt));
    if (!t) throw new Error('空响应');
    fs.writeFileSync('docs/research/' + job.out, `# ${job.name}(${job.engine} 生成,待人工复核)\n\n` + t + '\n');
    console.log(`[aux] ${job.name} ✓ ${t.length}字 → ${job.out}`);
  } catch (e) { console.error(`[aux] ${job.name} ✗`, e.message); }
}
console.log('[aux] 全部完成');
