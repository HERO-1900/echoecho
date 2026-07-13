# 全球出海战略 · GLOBAL_GTM v1.0.0

> 产品：双向情侣备忘录（她说一句 → 他那边变任务卡 → 收到/在办/办妥 + AI 自动出方案 + 语音优先）+ 未来硬件挂坠
> 目标市场：日本 / 韩国 / 美国（创始人已明确：一定做硬件，一定出海，这三国一定做）
> 撰写日期：2026-07-13
> 上游文档：`MARKET.md`、`HARDWARE_LANDSCAPE.md`、`EMOTION_ECONOMY.md`、`AI_NATIVE_VALUE.md`、`NAMING_R2_PINKY.md`、`docs/PRD.md`、`docs/MODE_SPEC.md`
>
> **数据纪律**：凡有来源的数字均附链接。查不到的一律标 **[未查证]** 或 **[推理/估算]**，不冒充实据。检索边界在 §2.4 与文末 §7 明确列出。

---

## 0. 结论前置（三句话）

**一、核心假设成立，而且比创始人想的还强。**
拉勾仪式在中日韩美**同源**——不是"巧合地相似"，是**从日本江户吉原的「指切り」向外扩散的同一个仪式**。更关键的是，韩国那一版**天然带"拇指盖章（도장）"**——这不是我们需要去发明的隐喻，**这是韩国小孩现在就在做的动作，而它和我们"办妥=盖章"的三态终点是同一个手势。**（§1）
但它**不能直接当品牌名用**：中/日/韩/美四国的这个词，各自都被寄生或占用了（拉勾网、货拉拉、Pinky Swear 儿童癌症基金会……）。**它是品牌内核，不是品牌名。**（§1.4）

**二、命名：选方案 B（概念统一 + 名字本地化），但必须配一个全球统一的拉丁文字标。不骑墙的理由是一个技术事实——**
App Store Connect 与 Google Play 都支持**在同一个 App 记录下、按语言/地区设置不同的显示名**（[App Store 每 locale 独立 30 字符 name 字段](https://www.apptweak.com/en/aso-blog/guide-to-app-store-localization)、[Google Play 最多 50 套自定义商店listing](https://www.onesky.ai/blog/how-to-add-localized-store-listings-to-google-play-and-app-store)）。**这意味着"名字本地化"的边际成本接近于零：一个开发者账号、一个 bundle ID、一套代码、四个显示名。** 方案 B 的成本被高估了，而它的收益（四个市场各自零解释成本的童年记忆）是买不到的。**方案 A 要求你放弃这个免费资产，去换一个在四国都毫无联想的生造词——这笔账算不过来。**（§2.3）

**三、首发国家：日本。**
不是因为日本文化最贴合（**最贴合的是韩国**），而是因为**日本刚刚空出来**：日本本土情侣 App 已全线阵亡（Pairy 2026-06-30 关服、Couples 2020 关服），当前日本 App Store 情侣类前三名**全是韩国 App**，而唯一的日本本土 AI 情侣产品 COUPPLY 上线一年只有约 4,000 对情侣。**一个 1.2 亿人口、全球第三大 App 消费市场，情侣赛道现在没有本地玩家。** 加上日本刚在 2025-12 全面施行「智能手机新法」，可以合法绕开 30% IAP 抽成——这是一个有时效的窗口。（§6.1）

---

## 1. 核心假设验证：拉勾仪式能不能当全球品牌内核？

### 1.1 逐一考证

#### 日本：指切りげんまん（ゆびきりげんまん）—— ✅ 成立，且是这个仪式的源头

- **民俗来源**：起源于**江户时代的游里（吉原游郭）**。游女为向恩客立"心中立（しんじゅうだて）"之誓，**真的切下左手小指第一关节送给对方**，作为"爱情不变"的凭证。后来这个动作被庶民和儿童模仿，退化为"勾小指"的游戏。（[語源由来辞典](https://gogen-yurai.jp/yubikirigenman/)、[国立国会図書館 レファレンス協同データベース](https://crd.ndl.go.jp/reference/entry/index.php?id=1000260700&page=ref_view)、[マイナビニュース](https://news.mynavi.jp/article/20230607-2541335/)）
- **「げんまん」= 拳万 = 用拳头打一万下；「針千本呑ます」= 让你吞一千根针。** 这两句是后来追加给儿童版的惩罚条款。（同上）
- **童谣原文**：「**指切りげんまん、嘘ついたら針千本呑ます、指切った**」
- **当代认知度**：全民级。这是日本人从幼儿园就会的仪式，无需任何解释。
- ⚠️ **必须知道的黑暗面（这是本节最重要的风险提示）**：**「指切り」和黑道的「指詰め」（切手指谢罪）同根同源**——江户时代切小指既是游女的爱情誓约，也是**私刑/处罚的形式**，后者延续成了 yakuza 的断指文化。（[草の実堂](https://kusanomido.com/study/fushigi/17939/)、[歴人マガジン](https://rekijin.com/?p=22112)、[Japaaan](https://mag.japaaan.com/archives/160099)）
  - **产品结论**：**日本市场绝不使用汉字「指切り」，只用平假名「ゆびきり」。** 汉字写法直接指向"切手指"；平假名写法指向童谣。**同时，视觉上永远不出现刀、血、断指、红色液体。** 这条是一票否决级的设计红线。

#### 韩国：새끼손가락 걸고 약속 + **도장（拇指盖章）** —— ✅ 成立，而且是**四国里对我们最有利的一版**

- **民俗来源**：韩国学界与大众科普口径一致认为源自**日本的 유비키리（指切り）**——江户游女切小指立誓 → 传入民间 → 儿童模仿 → 「유비키리 겐만」。（[아하 문답](https://www.a-ha.io/questions/42d10bc077eb4fcb8b8ab9c66bad48fa)、[아시아엔 The AsiaN 고선윤 칼럼](https://kor.theasian.asia/archives/73556)）
- **🔥 关键发现：韩国版比中日版多一个动作——拇指盖章。**
  > 「한국에서는 새끼손가락을 걸어놓은 채로 **서로의 엄지를 맞대는 것까지가 기본 행동**으로 통하며, **이를 '도장 찍는다'고 말하고**」——勾着小指的同时**两个拇指对压，这叫"盖章"**，这是韩国的**基本动作**，不是选配。（[아하](https://www.a-ha.io/questions/42d10bc077eb4fcb8b8ab9c66bad48fa)）
  - **英文维基百科独立佐证**：「In 21st-century South Korea, the hooked pinky has been followed by a **'seal,' wherein the thumbs touch each other while the pinkies are still hooked**.」（[Wikipedia: Pinky swear](https://en.wikipedia.org/wiki/Pinky_swear)）—— **两个独立来源交叉验证，可信度高。**
  - **而且还在加长**：当代韩国年轻人玩到 **약속(勾) → 도장(盖章) → 사인(食指在掌心签名) → 복사(手掌相擦复印) → 코팅(手背相擦过塑)** —— 一整套"承诺公证流程"的儿童版。（[아하](https://www.a-ha.io/questions/42d10bc077eb4fcb8b8ab9c66bad48fa)）
- **国民童谣**：「꼭꼭 약속해」——歌词第一句就是「**새끼 손가락 고리 걸고 꼭꼭 약속해**」（勾住小指，紧紧约定）。（[나무위키](https://namu.wiki/w/%EA%BC%AD%EA%BC%AD%20%EC%95%BD%EC%86%8D%ED%95%B4)、[Melon 歌词](https://www.melon.com/song/lyrics.htm?songId=4388767)）
- **对产品的意义（这是本次调研最大的意外收获）**：
  > 我们的三态是「收到 → 在办 → **办妥（盖章）**」。`MODE_SPEC.md` 里 B 模式「拉勾勾」的 done 态就叫**「盖章兑现」**，视觉是**印章**。
  > **韩国小孩拉完勾要盖拇指章。这不是我们要教给韩国用户的隐喻——这是他们六岁就会的动作。**
  > 在韩国，"拉勾 = 发起承诺 / 盖章 = 兑现承诺"这套语法是**现成的、免费的、零教育成本的**。**韩国是这个品牌内核唯一能 100% 兑现的市场。**

#### 美国：Pinky Promise / Pinky Swear —— ✅ 仪式成立，❌ **但名字已被商业与慈善双重占死**

- **来源**：北美至少 **1860 年**已有记载；英文维基把仪式源头也归到日本（1600–1803）。1860 年《Dictionary of Americanisms》记录的童谣是：「Pinky, pinky, bow-bell, / Whoever tells a lie / Will sink down to the bad place, / And never rise up again.」（[Wikipedia: Pinky swear](https://en.wikipedia.org/wiki/Pinky_swear)）
- **当代认知度**：全民级，且是活的 TikTok 语汇（[TikTok #pinkypromise 话题页](https://www.tiktok.com/discover/pinky-promise-trend)）。Gen Z 语境里它代表 trust / commitment，**情感色彩正面**。
- ❌ **名字不可用（三重死锁，`NAMING_R2_PINKY.md` §1 已实测，本次复核确认）**：
  1. **Pinky Swear Foundation** = 美国知名**儿童癌症慈善基金会**（2003 创立，持有 pinkyswear.org）。**拿儿童癌症慈善的名字卖情侣 App，是公关自杀。**
  2. **Pinky Promise** 美区 App Store 已有 4 个同名，其中 `Pinky Promise Health` 背后是同名公司 **Pinky Promise Private Limited**。
  3. **Littlefinger**（小指头的英文直译）= 《权力的游戏》里全球最著名的**背叛者**。一个讲"守信"的品牌用它，是语义自杀。
- **补充**：英语儿童的"惩罚型誓言"另有一支——「cross my heart and hope to die, **stick a needle in my eye**」（首见 1908 年，[The Free Dictionary](https://idioms.thefreedictionary.com/Cross+my+heart+and+hope+to+die,+stick+a+needle+in+my+eye.)）。**"说谎就用针扎"的母题在日（吞千针）与英美（针扎眼）同时存在**——这是仪式跨文化同构的又一佐证。但**严格说它属于姊妹誓言，不是 pinky promise 本身的原句**，对外讲故事时不要混为一谈（会被较真的人抓住）。

#### 中国：拉勾上吊一百年不许变 —— ✅ 成立（本仓库已有实测结论，不重复）

见 `NAMING_R2_PINKY.md`：概念保住、「我们拉勾」cn/us 双端 App Store `resultCount = 0`、「一百年不许变」/「不许变」同样 0/0。

### 1.2 三个反直觉的发现

**发现一：这不是"四个文化恰好都有类似仪式"，这是"一个仪式扩散到了四个文化"。**
日→韩、日→美（英文维基把 pinky swear 的源头指向 yubikiri）、日/中互有影响。**这意味着讲品牌故事时，你有一个真实的、可考证的、跨国的历史叙事**——而不是硬凑的"东西方共鸣"。这种故事在 PR 上极其值钱，且**日本媒体会特别买账**（"起源于我们、传遍了世界"）。

**发现二：仪式的"惩罚条款"在每个文化里都存在，而且都很狠。**
日本吞千针 / 拳打一万下、中国"上吊"、美国"沉入地狱 / 针扎眼睛"。
> **这解释了为什么这个仪式配得上做"承诺协议"产品的内核：它天生就不是"甜"，它是"契约 + 违约罚则"。** 这和 `MARKET.md` 的核心结论（"付费假设必须钉死在'着落'上，不能钉在'甜'上"）严丝合缝。**竞品都在卖甜，这个符号让我们可以卖"作数"。**

**发现三：这个符号的商业占用，四国全部集中在"名字"，没有一家占住"视觉"。**
Pinky Swear Foundation 占了英文名，拉勾网占了中文名，但——**没有任何一家公司拥有"两个拳头各伸出一根小指相扣、负空间是一颗心"这个图形。**
> **`NAMING_R2_PINKY.md` §0.5 那个视觉总纲（必须画拳头 / 负空间藏心 / 缩小成 ✓）是这次出海最值钱的、且是唯一四国通用的资产。** 名字要分四份，**图形只需要一份**。

### 1.3 反方意见（红队自攻，必须认）

1. **"儿童仪式"有幼齿风险。** 25+ 已婚人群（`NAMING_R2_PINKY.md` 里的"老K 32岁""大鹏 38岁"）可能觉得幼稚。
   → **吸收**：这正是 `MODE_SPEC.md` 五人格模式的价值——**「拉勾勾」是年轻派皮肤，不是唯一皮肤**。品牌**内核**是"承诺 + 兑现"，**表皮**可以是童谣（年轻）或印章契约（成熟）。出海时同样按 `EMOTION_ECONOMY.md` §3 的系列化逻辑走。
2. **仪式认知度高 ≠ 转化率高。** 所有人都认得，不代表所有人会因此下载。
   → **认。** 仪式解决的是**"这个 App 是干什么的"的解释成本**（0 秒讲清），不解决"我为什么要装"。后者靠痛点（§3）。**不要把品牌内核当增长引擎用。**
3. **日本的"切手指"暗面是真实的公关地雷**，见 §1.1 的红线。

### 1.4 判决

> **✅ 这个仪式能作为全球通用的品牌内核——但它是「内核 + 视觉」，不是「名字」。**
>
> - **可全球统一的**：① 手势视觉（两拳 + 小指相扣 + 负空间心 + 缩小成 ✓）；② 产品语法（勾 = 立约 / 盖章 = 兑现）；③ 品牌故事（一个从江户传到全世界的儿童契约）。
> - **必须本地化的**：名字（四国四个词，全部被寄生或占用，见 §2.4）。
> - **韩国是这个内核的最优兑现地**（拇指盖章 = 现成的"办妥"手势）；**日本是它的历史原产地**（PR 叙事最强）；**美国的仪式活着但名字死了**（用视觉、不用名字）。

**这是本项目最大的出海资产。** 但要清醒：它是**降低解释成本**的资产，不是**降低获客成本**的资产。

---

## 2. 命名战略

### 2.1 方案 A：全球一个品牌（一个名字通杀四国）

**硬约束**（决定候选池）：
- 音节必须是开音节（CV）结构，才能同时被中文拼音、日语片假名、韩语谚文、英文自然拼读；
- 避开 `-inky` 结尾（**Kinky** = 性癖，英文语境高危）；
- 避开 Hook 词根（`Hooked` / `Hookd` 已被占，且 `Hook up` 英文俚语 = 约炮，见 `NAMING_R2_PINKY.md` §1）；
- 避开 `약속/約束` 直用（中文"约束"= 限制，语义反向）。

**5 个候选（含实测）**：

| # | 候选 | 构词 | JP App Store | KR App Store | 四国可读性 | 致命伤 |
|---|---|---|---|---|---|---|
| A1 | **Pinkypact** | pinky + pact | **0** ✅ | **0** ✅ | 中：日「ピンキーパクト」7 拍偏长；韩「핑키팩트」尚可 | 生造词，四国零联想；音节多 |
| A2 | **Koyubi** | 小指（日语读音） | **0** ✅ | **0** ✅ | 高：ko-yu-bi 全开音节，四国都念得出 | 只对日本人有意义；中美韩零联想 |
| A3 | **Genman** | 拳万（げんまん） | **0** ✅ | **0** ✅ | 高：gen-man 极好念 | 同上；且英文里像 "gen man"（无意义） |
| A4 | **Pinkto** | pinky + pact/promise 缩合 | **0** ✅ | **0** ✅ | 高：pin-ku-to 三拍，四国友好 | 生造词；"pink" 强绑定粉色/女性 |
| A5 | **Sealo** | seal（印章）+ o | **0** ✅ | **0** ✅ | 高 | 丢掉小指母题，只剩盖章；"Sealo" 像海豹 |

> **实测方法与边界（重要）**：用 Apple iTunes Search API（`entity=software`）对 jp/kr 逐词实测。**⚠️ 本次美区（us）与部分查询返回空 body（代理层对非零结果的大响应体丢包），因此上表 US 列无法给出可信数字——这是本次检索的硬边界，我不猜。** `NAMING_R2_PINKY.md` 此前跑通过美区（41 词），其结论（Pinkypact 美区零同名）可沿用，但**建议正式立项前用干净网络重跑一次全四区。**

**方案 A 的诚实评估**：
- ✅ 收益：一套商标、一套包装、一个域名、一个社媒 handle、一份营销素材，**品牌资产不分叉**。
- ❌ 代价（致命）：**上面 5 个候选，没有一个能在任何一个国家唤起那个仪式。** Koyubi 在美国是乱码，Pinkypact 在日本是外来语，Genman 在中国毫无意义。
  > **你花了两年建立的"一听就懂"，被一个生造词换成了"要花钱教育用户"。而"一听就懂"恰恰是这个符号唯一的、免费的、无法被抄袭的资产。**
- ❌ 且 A 组候选**全部没有解决 §1.4 的判决**：它们保留了图形，却扔掉了词语——**而"我们拉勾了"这句话本身就是产品定义**（`NAMING_R2_PINKY.md` §5）。

### 2.2 方案 B：概念统一 + 名字本地化

| 市场 | 显示名 | 读音 | 内核映射 | 依据 |
|---|---|---|---|---|
| 🇨🇳 中国 | **我们拉勾** | wǒ men lā gōu | 拉勾 = 立约 | 已实测 cn/us `resultCount = 0`，唯一"含拉勾却零结果"的写法（`NAMING_R2_PINKY.md` §0.2） |
| 🇯🇵 日本 | **ゆびきりげんまん**（平假名全句，**不用单独的「ゆびきり」，更不用汉字「指切り」**） | yubikiri genman | 童谣原句 | ⚠️ **重大修正**：单独「ゆびきり」在日本既有 App Store 同名占用（nao nakajo「Yubikiri.ゆびきり」，主打"约定/同意"，与情侣场景高度接近），**又有 live 日本商标**（持有人トレードログ株式会社/Tradelog，覆盖 SNS/交友类目）→ **单用ゆびきり作商标主词=高风险**。而**「ゆびきりげんまん」全句 App Store 实测 `resultCount=0`（干净），且作为完整童谣句显著性更强。** 见 §2.4 |
| 🇰🇷 韩国 | **손가락약속**（songarak-yaksok）或 **꼭꼭약속** | songarak-yaksok / kkokkkok-yaksok | 「勾手指约定」/ 童谣「꼭꼭 약속해」原句 | 「약속」单用过泛且 App Store 全占；**「손가락약속」与「새끼손가락」实测 kr App Store =0 且 9/14/42 类相对干净（§2.4 已复核），是比纯약속强得多的选择** |
| 🇺🇸 美国 | **Pinky Pact / Pinkie Pact**（**不用** Pinky Promise / Pinky Swear） | — | pinky + pact | Promise 声誉+App拥挤、Swear 撞慈善机构声誉（§1.1 / §2.4） |

**成本核算（这是决策的关键，此前被高估）**：

| 成本项 | 方案 A | 方案 B | 差额 |
|---|---|---|---|
| App Store / Google Play 上架 | 1 个 App 记录 | **仍是 1 个 App 记录**——两大商店均支持**按 locale 设置不同显示名**（[ApTweak](https://www.apptweak.com/en/aso-blog/guide-to-app-store-localization)、[OneSky](https://www.onesky.ai/blog/how-to-add-localized-store-listings-to-google-play-and-app-store)） | **￥0** |
| 代码 / 后端 | 1 套 | 1 套（文案包已在 `MODE_SPEC.md` 里做成了话术包架构） | **￥0** |
| 商标注册 | 4 国 × 1 个词标 + 1 个图形 | 4 国 × 1 个本地词标 + **同一个图形** + 1 个全球拉丁文字标 | **约 2× 词标费用**。[估算] 中日韩美四国 9/42/45/14 类布防，方案 A 量级 8–15 万人民币，方案 B 量级 15–25 万人民币，**差额约 7–10 万人民币** |
| 硬件包装 | 1 套 SKU | **1 套 SKU**（包装主视觉 = 图形 + 全球拉丁文字标；本地名做贴纸/腰封，或直接不印） | **≈￥0** |
| 域名 / 社媒 | 1 组 | 1 组全球主域名 + 3 个本地跳转（可选） | **[估算] < ￥5,000/年** |
| 营销素材 | 1 套 | **本来就要各国重做**（日文/韩文/英文文案、本地 KOL、本地节庆） | **￥0 增量** |

> **结论：方案 B 的真实增量成本 ≈ 7–10 万人民币的商标费 + 几千块域名。** 不是"品牌资产分叉"那种战略级代价。
> **而方案 A 的代价是：在四个市场里，每一个用户都需要你花钱去解释"我们是谁"。**

### 2.3 我的明确推荐

## ✅ 选方案 B —— 但必须加一条方案 A 没提的约束：**配一个全球统一的拉丁文字标 + 一个全球统一的图形标。**

**决策依据（四条，按权重排序）：**

**1. 方案 B 的成本被高估了一个数量级，因为商店支持 per-locale 显示名。**
这是一个**技术事实**，不是观点。一个 App 记录、一套代码、四个名字。**方案 B 的实际成本是 7–10 万人民币的额外商标费——对一个要做硬件、要跑三国众筹的项目，这是零头。**

**2. 方案 A 要求你扔掉的东西，是这个项目唯一不可复制的护城河。**
`AI_NATIVE_VALUE.md` 的红队反例 2 说得很清楚：能力上微信/豆包全能做，**差异化只在协议和心智**。而"我们拉勾了"这句话——
> **是一句不需要 App 存在也成立的话。**（`NAMING_R2_PINKY.md` §5）
四个国家各有一句这样的话（"我们拉勾了" / 「ゆびきりげんまんした」/ 「약속했잖아」/ "we pinky promised"）。**方案 A 让你在四个国家都说不出这句话。**

**3. 品牌资产不会分叉，因为资产不在词里，在图形和产品语法里。**
- 全球统一：**图形**（两拳小指相扣，负空间是心，缩到 16px 是 ✓）+ **产品语法**（勾 = 立约，章 = 兑现）+ **硬件形态**（一对不对称、可磁吸相扣的挂坠）。
- 用户在四国看到的是**同一个东西**，只是用母语叫它。**这正是"符号型品牌"的标准打法**（人认得图，念不念得出名字是次要的）。

**4. 有一个反向的、方案 A 无法回答的问题：如果你必须选一个全球名，你选哪个？**
Pinkypact？——它在日本不如「ゆびきり」，在韩国不如「약속」，在中国不如「我们拉勾」，在美国也就一般。
> **一个在四个市场都排第二的名字，不如四个在各自市场排第一的名字。** 这就是骑墙的代价，而我不骑墙：**B。**

**配套的全球拉丁文字标（用于公司/硬件/域名/社媒/包装）**：推荐 **`Pinkypact`**（jp/kr App Store 实测零占用；美区据 `NAMING_R2_PINKY.md` 实测零同名，**建议重跑复核**）。它不当 App 显示名用，**只当"这家公司/这个硬件品牌"的签名**——就像 Pokémon 的 App 叫「ポケモン GO」但公司叫 The Pokémon Company。

> **⚠️ 域名现实（本次 whois 实测 2026-07-13）**：**`pinkypact.com` 已被注册（2023-08）**、`wepinky.com`（2024）、`yubikiri.com`（2001）、`yaksok.com`（1999）、`notakebacks.com`（2025-07，刚被人抢注）**均已被占**。
> **可用的：`pinkypact.io` ✅、`pinkypact.co` ✅、`getpinkypact.com` ✅。**
> **→ 这不推翻 Pinkypact 作为文字标（.com 被占 ≠ 商标被占，且对方是 2023 年的闲置域名），但意味着主域名要用 `.io` 或去和 `.com` 持有者谈收购。这也是"生造词 + .com 早被抢"的通病，需在最终定名前把域名和商标一起过一遍。**

### 2.4 商标与 App Store 占用初查（含明确的检索边界）

**⚠️ 检索边界声明（先说清楚我做到了什么、没做到什么）—— 已用专项子代理复核：**
- **App Store（iTunes Search API）**：jp/kr/us 三区**已全部跑通并逐词核验**（下表 App Store 列均为一手数据）。
- **美国商标**：**用官方 USPTO TSDR（`tsdr.uspto.gov/statusview/sn{serial}`）对已知序列号逐一核验**（一手可信），但**不是全文穷举**——序列号来自 TMview / Justia 索引。USPTO 前端全文检索有 AWS WAF JS 挑战，无法程序化穷举。
- **日本 J-PlatPat / 韩国 KIPRIS 官方站**：JS 重 + 反爬，**未直接查通**；日韩商标结论经 **TMview / WIPO Global Brand Database 镜像**取得，**确切注册号本次未全部取回（坚守"不臆造注册号"红线）**。
- **中国 CNIPA**：**未程序化检索**——「拉勾/我们拉勾」在中国的商标全类占用**必须另做专门检索**。
- **一句话**：本表是**排雷 + 已知序列号核验**，不是**全类穷举放行**。正式定名前仍须委托四国代理所正式检索。

| 名字 | App Store（jp/kr/us 一手实测） | 商标（已核验部分） | 结论 |
|---|---|---|---|
| **我们拉勾**（CN） | cn **0**（干净）；「拉勾/拉钩」= 招聘品牌全占 | CNIPA 未查（须专门检索）；TMview 见 CN 注册号 74988473（PINKY PROMISE, 37类, 广西拉钩机械租赁，**不同领域**） | 🟢 主推。**组合注册"我们拉勾"四字 + 拳头图形；绝不单注"拉勾"** |
| **ゆびきりげんまん**（JP） | 「ゆびきりげんまん」jp **0**（干净）；⚠️ 但单独「ゆびきり」jp **7**（被 nao nakajo「Yubikiri.ゆびきり」占，主题=约定/同意，**与情侣高度接近**） | 🔴 **YUBIKIRI 有 live 日本商标**（持有人 トレードログ株式会社/Tradelog，覆盖 SNS/交友类目）→ **单用ゆびきり=硬冲突** | 🟡 **改用全句「ゆびきりげんまん」**（App Store 干净、显著性强）+ 图形组合。**汉字「指切り」禁用** |
| **약속 → 손가락약속 / 꼭꼭약속**（KR） | 「약속」kr **8**（通用词全占：모킷/TimeTree 等）；**「새끼손가락」kr 0、「손가락약속」kr 0（均干净）** | 「약속」通用难独占；「새끼손가락」「손가락약속」在 9/14/42 类**基本无占用（相对干净）**；⚠️ **「콩닥」有 live 韩国商标（9类软件+42类）→ 放弃** | 🔴 纯약속不可行 → 🟢 **改用「손가락약속」或「꼭꼭약속」**（均实测干净、显著性强） |
| **Pinky Promise**（US） | us **7**（Health/Me/App 等占用） | ✅ **cls9 软件（Reg 4103227）状态=ENDED/已清空**（利好）；但 **cls35（Reg 8232596, Imagination Holdings, 2026-04）= LIVE** | 🟡 软件类空了但**声誉风险仍在**（见下）；App Store 太挤，仍不推 |
| **Pinky Swear**（US） | us **7**（含 Swear Jar 等模糊，无同名情侣 App）；jp/kr **0** | 「PINKY SWEAR PROJECT」cls35 Reg 4891944 = **CANCELLED（2022）**；⚠️ **Pinky Swear Foundation 是否持 live 美国 TM 未能确认**（org 确存在 pinkyswear.org） | 🟡 **风险从"撞注册商标"下修为"撞知名慈善机构声誉"**——名字或可注册，但**用"儿童癌症慈善"同名词卖情侣 App 的公关风险不变，仍不推** |
| **Pinky Pact / Pinkie Pact**（US） | Pinky Pact 待复核；**Pinkie Pact us 2（干净）** | 需 USPTO 正式检索 | 🟡 候选 |
| **Pinkypact**（全球文字标） | **jp 0 / kr 0 / us 7 全 Pinkfong 模糊、无同名（干净）** | 需 USPTO 正式检索 | 🟢 推荐作全球拉丁文字标（注意 .com 已被占，见 §2.3） |
| **WePinky**（备选全球文字标） | **jp 0 / kr 0 / us 0（全案唯一三区全零）** | 需 USPTO 正式检索 | 🟢 **最干净的全球文字标候选**（三区 App Store 全零）；`wepinky.com` 已被占 |

> **本表由专项 name/TM 子代理用 iTunes API + USPTO TSDR + RDAP 实测复核。** 关键增量：① **YUBIKIRI 单用在日本有硬冲突（App + live 商标），已改推「ゆびきりげんまん」**；② **美国 PINKY PROMISE 软件类商标已"死号"，但声誉风险不变，仍不推**；③ **韩国「손가락약속」实测干净，是比纯「약속」强得多的选择**；④ **WePinky 是三区 App Store 全零的最干净全球文字标**。

**商标布防建议（[推理]，需律师确认）**：
- **必注类别**：第 **9** 类（可下载软件）、**42** 类（软件开发/SaaS）、**45** 类（社交/交友服务）
- **硬件必注**：第 **14** 类（首饰/挂坠）——**这一条常被软件团队漏掉，而我们要做挂坠**
- **建议布防**：第 **35** 类（电商/广告）、第 **28** 类（玩具，防御）
- **四国节奏**：中国先注（本土在售）→ **日本同步注（首发市场）** → 韩国 → 美国。**日本商标从申请到注册约需 6–12 个月 [估算，需日本代理所确认]，必须在众筹前启动。**

---

## 3. 三个市场逐一深挖

### 3.1 🇯🇵 日本

#### 3.1.1 竞品现状：**这是一个刚刚空出来的市场**

**死亡名单：**

| App | 运营方 | 状态 | 来源 |
|---|---|---|---|
| **Pairy（ペアリー）** | TIMERS → 2019 转让 LINKBAL | **2026-04-08 停新注册 → 2026-06-30 正式关服** | [pairy.com 官方公告](https://pairy.com/)、[LINKBAL 受让公告](https://prtimes.jp/main/html/rd/p/000000491.000004786.html) |
| **Couples（カップルズ）** | **Eureka（エウレカ，Pairs 母公司，Match Group 系）** | **2020-08-12 关服**（累计下载曾超 400 万） | [deai.co](https://deai.co/couples/) |

> **这两条是本节最重要的事实。** Couples 有 400 万下载、背后是 Match Group，**照样被关掉**。Pairy 后期把付费 Premium 都砍了、全功能免费，**然后死了**。
> **判断：日本情侣 App 不是没量，是没有 LTV。这不是"竞品弱"，这是"品类在日本被证伪过一次"。**
> **→ 这直接决定了日本的商业模式：钱必须在硬件上赚，App 订阅在日本是死路。**（详见 §4.4 / §6）

**现存玩家（2026-07，[マイベスト 2026年7月版排名](https://my-best.com/6082)）：**

| 排名 | App | 国别 | 定价 | 短板 |
|---|---|---|---|---|
| 1 | **Between** | 🇰🇷 韩国 | 免费 / Between Plus 约 **¥378/月** | 10 年老产品、无 AI、无任务闭环；**MAU 已从 120 万崩到 23 万、母公司刚出重大数据事故（见 §3.2）** |
| 2 | **SumOne（サムワン）** | 🇰🇷 韩国 | 免费 | 纯"每日一问"，**零任务概念** |
| 3 | **TheDayBefore / THE COUPLE** | 🇰🇷 韩国 | 免费 | 纯纪念日倒数 |
| — | **COUPPLY（カップリー）** ⚠️ | 🇯🇵 日本 | PRO **¥500/月** | **唯一的正面威胁**，见下 |
| — | **TimeTree** | 🇯🇵 日本 | 免费 | 共享日历，日本注册用户约 **3,100 万**（[日经](https://www.nikkei.com/article/DGXZQOUC090ZI0Z00C25A1000000/)）；是"日历"不是"任务"，无状态回执、无 AI 方案 |

> **日本情侣 App 前三名全是韩国货。这是一个 1.2 亿人口的市场，本土玩家全线退场。**

**COUPPLY 深拆（唯一需要盯的对手）：**
- COUPPLY 合同会社（大阪府堺市），**2025-06-17 上线**（[PR TIMES](https://prtimes.jp/main/html/rd/p/000000002.000158394.html)）
- 功能与我们高度重叠：**TODO/任务清单** + 共享日历 + 备忘 + 纪念日 + **AI 情侣咨询师「ペンリーちゃん」** + **E2EE 端到端加密**
- **2026-07-08 发布 2.0**：AI 咨询师可分析关系、主动发消息、**调解吵架**（[coupply.co.jp/news](https://coupply.co.jp/news/)）
- **规模：上线约半年累计注册约 1 万人 / 约 4,000 对情侣**（[PR TIMES](https://news.infoseek.co.jp/article/prtimes_000000007_000158394/)）

> **判断**：COUPPLY 是"日本版的我们"，但**小、慢、没硬件**，而且它押的是**AI 情感陪伴**（`AI_NATIVE_VALUE.md` §1 判定的 **L3c 高危区**——AI 调解吵架），不是**AI 执行闭环（L1+L2）**。
> **我们的切入点：语音 → 任务卡 → 三态回执 → AI 出方案，这条 execution loop + 硬件把它拽出屏幕。**
> **但必须抄他们一件事：E2EE。** 日本用户 + 情侣私密对话 + 中国团队 = 隐私是第一道生死线（见 §3.1.3）。

#### 3.1.2 文化适配：**「察する」不是障碍，「管理」才是**

**创始人的担心（"直白的任务指派会不会冒犯日本人"）——答案是：不冒犯，但会踩到另一颗雷。**

**证据链一：日本社会自己正在劝女性"别指望被察觉，直接说出来"。**
- PRESIDENT：《「俺だって家事やってる」「全然やってくれない」…**指示待ちマインドが妻の地雷を踏む**》（[president.jp](https://president.jp/articles/-/46223)）
- 女の転職 type 专题：《**察してほしい妻に指示待ち夫**…パートナーとのすれ違い、どう解消する？》（[woman-type.jp](https://woman-type.jp/wt/feature/23214/)）
- 主流建议高度一致：**「言わないでもやってほしい」ではなく、きちんと言葉で伝える** / **曖昧な言い方をやめ、具体的なミッションを伝える**（[ESSE online](https://esse-online.jp/articles/-/9113)）

> **判断：我们不是在挑战日本文化，我们是在给日本社会已经开出的药方提供剂型。** 这必须成为日本 PR 的核心口径。

**证据链二：真正的雷是「名もなき家事」——而它排第一的类别是「管理」。**
- **「名もなき家事」由大和ハウス工業 2017 年提出**，并拿下 **2018 日本 PR 协会 PR Award Grand Prix 大奖**（[日本パブリックリレーションズ協会](https://prsj.or.jp/pr-award/list/list2018/prag2018_grandprix/)）——这个词已进入日本大众语汇。
- **大和ハウス 2017 调查**（[SUUMO ジャーナル](https://suumo.jp/journal/2017/05/24/133796/)）：
  - 这类"无名家务"**约 9 成由妻子承担**
  - **认知落差**：妻子回答最多的是「**夫1割：妻9割**」（**37.3%**）；丈夫回答最多的是「**夫3割：妻7割**」（**27.0%**）
- **Rinnai 2024-08-30 调查**（n=1,000，20–50 代已婚双职工）（[リンナイ官方](https://www.rinnai.co.jp/releases/2024/0830/index_2.html)）：
  - **整体 59% 对伴侣的家务不满；女性 72% 不满**
  - **女性最大不满 = 「家事を『手伝うもの』と思っていること」43%**（"他觉得家务是'帮忙'"）

> **🔴 致命风险（红队）**：一个"她说话 → 生成任务卡 → 她盯他的完成状态"的产品，在日本女性眼里可能被读成 **"又给我加了一份管理工作，还得盯进度"**。
> 日本已有的家务分担 App（**Yieto**——主打"家事分担マップ"可视化谁干得多，[yieto.jp](https://yieto.jp/)）就是这个逻辑，**它没做大**。
> **可视化 ≠ 减负。**

> **🔵 蓝队解法（这是日本的产品宪法）**：
> **AI 当 manager，不是她当 manager。**
> - 任务卡的视觉发起者必须是 **AI/系统**，不是"她"
> - 完成回执是**双向仪式感**（"你们一起完成了 12 件事"），不是**单向验收**
> - **绝不做贡献度对比/谁干得多的排行** —— 这正是 `PRD.md` §4 的三红线（不做监工/不做证据本/不做 KPI）**在日本市场的再次独立验证**
> - **日本市场核心文案**（SoftBank 官媒自己就是这么写的，[softbank.jp](https://www.softbank.jp/sbnews/entry/20241206_02)）：
>   > **「"考える・覚えておく" をAIに任せる」**——把"想着、记着、开口催"这三件最重的无名家务交给 AI。
>   **她不用再当那个唠叨的人。** 这句话在日本的说服力，是"提高协作效率"的十倍。

**证据链三：市场规模锚点** —— 日本双职工家庭 **1,300 万户（2024）**，占有配偶家庭 **约 71.9%**（[JILPT / 总务省劳动力调查](https://www.jil.go.jp/kokunai/blt/backnumber/2025/04/c_01.html)）

#### 3.1.3 日本本地化改动清单

| 维度 | 必须改什么 | 依据 |
|---|---|---|
| **数据落地** 🔴 | **日本用户数据必须落在日本（或至少不落中国）。** APPI 第 28 条向境外第三方提供个人数据只有三条路：白名单国（**仅 EU/UK**，中美均不在）、合同体制、或**取得本人同意——而同意前必须明确告知"移转目的地国家名称"**。**你必须在弹窗里写"中国"两个字。** | [PPC 外国第三者提供 GL](https://www.ppc.go.jp/personalinfo/legal/guidelines_offshore/)、[Ushijima & Partners](https://www.ushijima-law.gr.jp/topics/appi_crossborder_transfer/) |
| **语音数据** | 只做 ASR（转写），**不做声纹认证**。用于认证的「声紋」属于**個人識別符号**；普通录音不属于。但情侣对话里会出现健康信息（"帮我买药"）→ 可能构成**要配慮個人情報**，需**事前同意**。 | [BUSINESS LAWYERS 个人识别码解说](https://www.businesslawyers.jp/practices/274)、[政府広報オンライン](https://www.gov-online.go.jp/article/201703/entry-7660.html) |
| **境内代表** | APPI **不像 GDPR 那样强制设境内代表人**。但**强烈建议设日本法人或日本联络窗口**——COUPPLY 把"日本企業運営"当卖点。 | [BUSINESS LAWYERS](https://www.businesslawyers.jp/practices/615) |
| **支付** 💰 | **重大利好：「スマホソフトウェア競争促進法」2025-12-18 全面施行**，App Store / Google Play 上**可以合法引导用户走外部支付**。→ **可绕开 30% IAP 抽成。** | [公正取引委員会](https://www.jftc.go.jp/msca/)、[BUSINESS LAWYERS](https://www.businesslawyers.jp/articles/1422) |
| **支付方式** | 订阅走 IAP（信任度）+ Web 端信用卡/**PayPay**（注册用户 **7,000 万+**，码支付份额约 7 成，[PayPay 官方](https://about.paypay.ne.jp/en/pr/20250715/01/)）；硬件电商必须支持信用卡 + PayPay + コンビニ後払い | 同上 |
| **纪念日体系** 🎄 | **主战场是圣诞（12 月）+ 交往纪念日（付き合った記念日），不是情人节。** 圣诞在日本是**情侣的节日**（[CNN.co.jp](https://www.cnn.co.jp/travel/35227681.html)）；而バレンタイン/ホワイトデー 正在衰退（1–3 月销售构成比 2023 年 55.5% → **2025 年 46.7%**，[Nint](https://www.nint.jp/blog/valentine-market-trends-2025-2026/)）。**日本情侣极度重视"付き合って○日目"**——这是 TheDayBefore 能进前三的原因。 | 同上 |
| **AI 语气** | 敬语但不生硬（です・ます体）；**AI 绝不使用命令形**；三态话术去掉任何"指令/验收"味 | [推理] |
| **文案禁区** | ❌ 任何"让老公动起来""管住他"式表述 ❌ 汉字「指切り」 ❌ 刀/血/断指视觉 | §1.1 |

---

### 3.2 🇰🇷 韩国

#### 3.2.1 Between / 비트윈 深拆 —— **韩国国民情侣 App 刚刚自毁了信任**

**时间线（这是本节的核心，也是韩国最大的机会窗口）：**

| 时间 | 事件 | 来源 |
|---|---|---|
| 2011 | VCNC（창업자 박재욱）推出 Between | [머니투데이](https://news.mt.co.kr/mtview.php?no=2021051116033158059) |
| 2014 | 全球 1,000 万下载；曾与 DeNA 合作进日本 | [TechNode](https://technode.com/2015/02/11/private-couple-app-commits-10-mil-couples-around-world/) |
| 2017 | 累计下载 **2,200–2,300 万**；全球 MAU 约 **220 万**（其中韩国国内约 **120 万**） | [the bell](https://www.thebell.co.kr/free/content/ArticleView.asp?key=201707180100034150002025&lcode=00) |
| 2025 | **MAU 从峰值约 120 万崩到 233,350** | [한국경제](https://www.hankyung.com/article/2025092951317) |
| 2018 | **日均活跃用户突破 100 万**；VCNC 成为 SOCAR 子公司，创始人转做网约车 Tada | 同上 / `AI_NATIVE_VALUE.md` §3 |
| **2021-05** | **Krafton（《绝地求生》母公司）收购 Between 业务**（上市前"抬身价"） | [머니투데이](https://news.mt.co.kr/mtview.php?no=2021051116033158059)、[SBS Biz](https://biz.sbs.co.kr/article/20000015079) |
| 2022 | Krafton 的 AI 内容子公司 띵스플로우 吸收合并 비트윈어스 | [Daum/경향](https://v.daum.net/v/20250115141500919) |
| **2025-01/02** | **Krafton 把 Between 卖给 딜라이트룸（Alarmy 알라미 的开发商）旗下 DLT Partners，2025-02-05 完成移交** | [Daum 단독](https://v.daum.net/v/20250115141500919)、[매일경제TV](https://company.mbnmoney.co.kr/news/view?news_no=MM1005445098) |
| **2025-09** 🔴 | **数据灭失大事故**：DLT Partners 于 9/13 做服务器整理、删除"长期未使用者"数据，**误删了大量在用用户的相册照片/影片/头像**。9/23 紧急公告，**动员全部内部人力仍无法恢复（无备份）**。 | [아시아경제](https://www.asiae.co.kr/article/2025100214252264863)、[한국경제](https://www.hankyung.com/article/2025092951317)、[머니S](https://www.moneys.co.kr/article/2025100209162274911) |
| 2025-10 | 用户原话：「**10년 가까이 사진을 올리며 잘 썼는데… 멤버십 미이용자들의 사진만 다 삭제되었다**」（用了快十年，非会员的照片全被删了）。公司补偿：价值约 **100 万韩元**的 Between Plus 情侣**终身券** + 280 余种付费贴纸 + 全额退款。用户评价为「**반쪽짜리 사과**」（半吊子道歉）。 | [아시아경제](https://www.asiae.co.kr/article/2025100214252264863) |

> **🔥 这是本次调研发现的、最锋利的一个战略机会。**
>
> **Between 的护城河从来只有一样东西：十年的共同回忆（照片、纪念日、聊天）。** `MARKET.md` §6.2 早就写过："Between 靠'相册资产沉淀'续命"、"删 App = 删掉共同历史"。
> **2025 年 9 月，它亲手把这条护城河炸了。** 而且是在 7 年里被转手 3 次（VCNC → SOCAR → Krafton → 딜라이트룸）之后，被一个做闹钟 App 的公司弄丢的。
>
> **数字佐证这个判断**：Between 的 **MAU 已从峰值约 120 万崩到 233,350**（[한국경제](https://www.hankyung.com/article/2025092951317)）。它现在是一个被转手 4 次的僵尸资产——**用户还在，但心已经走了。**
>
> **韩国市场此刻存在一个真实的、有情绪的、可被叙事化的信任真空。**
> **韩国的入场文案已经写好了：「우리는 당신의 기억을 지우지 않습니다」（我们不会删掉你的回忆）+ 一键从 Between 导入 + 数据可随时完整导出。**
> 这直接呼应 `MARKET.md` 付费点 #10（数据永久保管/导出）和 `PRD.md` §4 红线 2（不做证据本、单方可导出）——**我们本来就打算做的事，在韩国突然变成了最锋利的营销武器。**

**为什么 Between 能在韩国起来，却没成为一门大生意？**
- **起来的原因**：韩国情侣文化极度制度化（100 日/200 日/1000 日纪念日必须过），"两个人的私密空间"是刚需；且 Between 2011 年上线时 KakaoTalk 尚未完全吞噬一切。
- **没成生意的原因**：变现只能靠贴纸/周边/Between Box 电商（[The Investor](https://www.theinvestor.co.kr/article/1420868)）——**和恋爱记一模一样的死法：情绪共鸣带来下载，带不来付费。** 最后创始人自己弃赛去做 Tada。
- **这条和 `MARKET.md` §1.3 的结论完全一致，跨国二次验证：情侣 App 的用户获取被验证过，付费模式没被验证过。**

#### 3.2.2 韩国文化适配：**四国里最贴合的一个**

- **纪念日文化极度制度化**：100일 / 200일 / 300일 / 1주년 是**必须过的**，不过就是关系事故。外国人对此感到震惊（[르데스크](https://v.daum.net/v/KcDHES9HGU)）。国民童谣「꼭꼭 약속해」人人会唱。
- **"男朋友必须记住纪念日"是韩国社会的默认期待** —— 这意味着我们的核心痛点（"说了→忘了→吵架"）在韩国**不需要教育市场，它就是日常**。
- **拇指盖章（도장）** = 我们"办妥"状态的现成手势（§1.1）。**没有任何一个市场能给我们这个。**

> **判断：韩国是文化贴合度第一的市场。** 唯一的问题是市场规模与人口趋势（见风险）。

**⚠️ 风险（必须正面说）：**
1. **젠더갈등（性别对立）是韩国最敏感的公共议题之一——而且有血淋淋的商业先例。** 一个被解读为"여자가 시키고 남자가 한다"（女人指使、男人执行）的产品，会被男性社区（DC Inside / 에펨코리아 一类）作为攻击靶子。
   > **实锤先例：GS25 便利店 2021 年一张海报里一个"捏小指"的手势，被男性社区解读为厌男符号，引发抵制，导致母公司 GS리테일 股价单日跌约 2.37%、营销负责人去职。**（Korea 调研组核实）
   > **⚠️ 这对我们是双重警告——不仅"指派任务"的框架危险，连"小指"这个视觉母题在韩国都带电。** 韩国版的手势视觉必须**明确画成"两根小指相扣（两个人）"，绝不能出现"单手捏小指"的构图**（后者正是 GS25 事件的爆点）。**框架统一：AI 当 manager，不是她当 manager；视觉统一：永远成对，永不单手。**
2. **人口结构反而是利好，此前的"TAM 收缩"判断被证伪**：Korea 调研组核实 **2025 年韩国结婚数同比 +8.1%、珠宝市场同比 +13.5%** —— 情侣消费在**反弹**，不是萎缩。（此前 §3.2.2 的"TAM 长期收缩"结论**撤回**）
3. **KakaoTalk 的平台引力**：和微信在中国一样，KakaoTalk 可以随时原生化任何轻功能。（同 `MARKET.md` §6.3 的平台性替代风险）
4. 🔴 **"语音优先"在韩国不是差异点，而且是最大的未验证假设**：Between 早就有语音消息 + 对讲机功能。**"韩国人到底愿不愿意对着手机说话来建任务"——这个问题零调研数据支撑，是韩国市场最该先验证的一件事**（Korea 调研组标注为最高优先级 未查证项）。**别把"语音优先"当成韩国的卖点去打，先当成一个待验证假设去测。**

#### 3.2.3 韩国本地化改动清单

| 维度 | 改动 | 依据 |
|---|---|---|
| **纪念日体系** 🔴 | **必须内置 D-Day 引擎**：100일/200일/300일/1주년/2주년 自动生成 + 提前提醒 + AI 出方案。**这不是加分项，是入场券**——TheDayBefore / THE COUPLE 靠这一个功能就能排进日本前三。 | §3.2.2 |
| **命名** | 用「손가락약속」或「꼭꼭약속」，**不用纯「약속」**（通用词、App Store 全占）；避开「콩닥」（有 live 韩国 9/42 类商标） | §2.4 已复核 |
| **三态话术** | 收到 = **약속!**（约定！）｜ 在办 = 진행 중 ｜ 办妥 = **도장 쾅!**（盖章！）—— **直接复用童年动作，零教育成本** | §1.1 |
| **数据信任** 🔴 | **主打"我们不会删掉你的回忆"**：一键从 Between 迁移、随时完整导出、明确的数据保留政策。**这是当下韩国最锋利的差异点。** | §3.2.1 |
| **PIPA 合规** | **国内대리인（境内代表）门槛**：前年度**总营收 ≥ 1 兆韩元** 或 **过去 3 个月日均存储用户数 ≥ 100 万人**。→ **创业初期不触发，无需设立。** 违反罚款 ≤ 2,000 万韩元。 | [privacy.go.kr 国内代理人制度](https://www.privacy.go.kr/front/contents/cntntsView.do?contsNo=92)、[김·장 법률사무소](https://www.kimchang.com/ko/insights/detail.kc?sch_section=4&idx=33813) |
| **跨境传输** 🔴 | PIPA 要求**跨境提供须获本人同意并告知移转国**（与 APPI 同构）。**"数据传中国"在韩国是已被执法盯上的高危项**：Korea 调研组核实，**阿里巴巴（约 ₩19.78 亿）、Temu（约 ₩13.69 亿）已因个人信息跨境/违规被 PIPC 处罚**。**→ 韩国用户数据必须不落中国，且跨境同意条款要写明目的地国名。** | [推理，需韩国律师确认] |
| **支付** | Kakao Pay / Naver Pay / Toss 为主流；App 内订阅走 IAP | [未查证具体份额] |
| **AI 语气** | 존댓말（敬语）为默认；可提供 반말（半语）模式作为情侣间的亲密选项 | [推理] |

---

### 3.3 🇺🇸 美国

#### 3.3.1 竞品现状

| 产品 | 定位 | 定价（2026 实测） | 规模 | 短板 |
|---|---|---|---|---|
| **Paired** | 品类第一，每日问题 + 关系测验 | **$14.99/月，$74.99/年** | **800 万下载**；2024-11 时 **100 万+ MAU**；App Store 20.4 万评分 4.7 星；Apple App of the Day (2024-01) | **纯内容订阅，无工具属性**；不解决任何具体的"事" |
| **Lovewick** | 轻松浪漫向 | Plus **$29.99/年** | [未查证] | 极轻 |
| **Agapé** | 每日一题 | 免费为主 | [未查证] | 与 Paired 同质 |
| **Cupla** | 情侣共享日历 | 免费 / **$4.99 月 / $34.99 年** | 官网自称 **50 万+ 情侣** | 日历工具 + 情侣皮肤，无方向性协议、无回执 |
| **Cozi**（家庭日历） | 家庭组织 | 免费 + 广告 | **2,000 万+ 注册用户**（2022 被 OurFamilyWizard 收购时数字） | **90% 用户是有孩子的女性** —— 这本身就是"数字化心智负担"的实锤 |
| **Milo (joinmilo.com)** | YC + **OpenAI 直投**，GPT-4 驱动，主打 "invisible load"，语音/截图丢进去自动变日程 | [未查证] | [未查证] | **功能上与我们最像的美国产品，必须持续盯** |
| **Ohai.ai** | Care.com 创始人创办的家庭 AI 助理 | — | 2024-01 种子 **$6M**；2025-08 战略轮 | 家庭向，非情侣 |
| **Yohana**（松下） | 家庭 AI 助理 | — | ☠️ **已关停** | 重投入模式被证伪 |

> 来源：[Paired App Store](https://apps.apple.com/us/app/paired-couples-relationship/id1469609343)、[Paired MAU 学术引用 PMC12001865](https://pmc.ncbi.nlm.nih.gov/articles/PMC12001865/)、[Cupla](https://cupla.app/)、[Cozi/Wikipedia](https://en.wikipedia.org/wiki/Cozi)、[Milo YC](https://www.ycombinator.com/companies/milo)、[Yohana 关停](https://www.channelnews.com.au/panasonics-ai-ambitions-stumble-as-consumer-apps-hit-delays-and-closures/)

**美国的钱在哪**：情侣类真正赚钱的只有 **Paired 一家**（$14.99/月 × 百万级 MAU）。**家庭任务类没有一家做出高 ARPU，重投入的 Yohana 直接死了。**

#### 3.3.2 🔴 情感劳动地雷（创始人要求正面回答，这里正面回答）

**问题：在美国，"她给他派任务 + 追踪 received/doing/done"会不会被当作 emotional labor 的量化而挨打？**

## **会。而且会被打得很惨。原样上线必翻车。**

**证据（全部是真实的、可查的、高热度的）：**

1. **MIT Technology Review 专题**《Chore apps were meant to make mothers' lives easier. They often don't.》（[链接](https://www.technologyreview.com/2022/05/10/1051954/chore-apps/)）
   - 哈佛社会学学者 **Allison Daminger** 原话：「**我在研究里想不起任何一次是男人给妻子列清单，但我能想起好几次是妻子给丈夫列清单。**」
   - 一位试用 Cozi 的用户原话：「**它没解决问题：你还是在唠叨别人、在当伴侣的家长。**」

2. **Reddit r/TwoXChromosomes**，"Your best responses to weaponized incompetence?"（**5,496 赞 / 527 评论**，[链接](https://www.reddit.com/r/TwoXChromosomes/comments/1owz9bn/your_best_responses_to_weaponized_incompetence/)）
   - **最高赞回复（4,161 赞）**：「You can do hard things. You can figure shit out **without your manager or boss holding your hand.**」
   - ⚠️ **注意："manager / boss" 在这个语境里是骂人的词。** 如果我们的产品长得像 Jira，我们就是在把美国女性最恨的那个角色（无偿的项目经理）**产品化**。

3. **"weaponized incompetence" 是主流女性网络文化的常备弹药**（TikTok 成体系的内容赛道，[Motherly 报道](https://www.mother.ly/news/viral-trending/weaponized-incompetence-tiktok/)）。**风险不是"没人知道"，是"负向病毒传播"——我们的 App 会成为"她需要一个 App 才能让他做家务"的证据，被剪进吐槽视频。**

**但是——反证同样确凿，而且反证里藏着正确答案：**

4. **Fair Play（Eve Rodsky）是美国主流的、被 Reese Witherspoon 背书的、有纪录片的方法论**（[fairplaylife.com](https://www.fairplaylife.com/documentary)、[Fast Company](https://www.fastcompany.com/90280631/reese-witherspoons-hello-sunshine-is-betting-that-eve-rodsky-is-the-next-marie-kondo)）。
   - 它的机制是：**100 张家务卡，谁拿卡谁负责 CPE = Conception（想到）+ Planning（计划）+ Execution（执行）全包。**（[GMA](https://www.goodmorningamerica.com/family/story/mom-author-creates-rules-card-game-divide-household-66107574)）
   - **"weaponized incompetence" 这个词本身就是 Rodsky 用的。** 所以**"指派任务"不是原罪。**
   - **它能被接受的唯一原因是 CPE 三包：女人交出去的不是"活儿"，是"操心"。**
   - **而所有失败的家务 App，都是让她保留了 C 和 P，只把 E 派出去，还多了一个 App 要维护。**
   - **Fair Play 自己的最大批评也在这**：Reddit r/workingmoms 有回复直言「**Waste of time and money… It is one more thing on your plate that does not make it any easier for you.**」（[链接](https://www.reddit.com/r/workingmoms/comments/1tpfs9t/anyone_use_fair_play/)）；甚至有长文《**Our Fair Play Discussion Signaled the End of My Marriage**》（[链接](https://cindyditiberio.substack.com/p/our-fair-play-discussion-signaled/comments)）。

> ## 🎯 美国的战略判决
>
> **我们的 AI 自动出方案（L2），在美国不是"锦上添花"，它是整个产品的法理基础。**
> **因为它是唯一一个能替女人承担 Conception + Planning 的东西。**
>
> - Cozi / Cupla / Maple 都还是**清单思维**（她想、她录、他做）。
> - **我们是唯一能说"她说一句，AI 负责想清楚、拆成计划、盯进度"的产品。**
> - **翻译成美国话：**
>   > **"Fair Play, without the homework."**（Fair Play 的效果，但不用你自己发牌）
>   > 或：**"Say it once. Never think about it again."**
>
> **这不是文案技巧。这是把 `AI_NATIVE_VALUE.md` §2.1 的 C1/C2/C3 成本模型，翻译成了美国用户唯一能接受的语言。**

**美国产品必须做的五个改造（可执行指令，不是措辞建议）：**

| # | 改造 | 说明 |
|---|---|---|
| 1 | **AI 当 manager，不是她当 manager** | 任务卡的发起者视觉上是 AI，不是她。AI 承担 C + P。 |
| 2 | **杀掉 "assign"，改成 "claim / own"** | ❌ "assigned to you" / "status: received" ❌ "mark as done"<br>✅ **"I've got this"**（他主动认领）✅ **"Off your plate"**（她视角：这事已经不在你脑子里了）✅ **"Owned by"** |
| 3 | **语音落地后默认进"共享池"（unclaimed），任何一方可认领**——而不是默认落到男方头上 | 这一条把"指派"从产品里物理删除了 |
| 4 | **删除一切"已读了但没做"的可见性** | 她能看到"已处理/未处理"，**不能看到"他看了但没动"**。前者是安心，后者是审讯。**这条与 `PRD.md` §4 红线 1 完全一致——我们本来就不做。** |
| 5 | **绝不做性别化投放** | 任何 "get your husband to actually do things" 的广告词都会被剪进 TikTok 吐槽视频。统一叙事：**"No one should be the household's project manager."** |

**🔴 硬件的美国红线（本报告第二重要的判断）：**
> **挂坠如果因为"任务超时"而在她那边震动，这是全美国最容易导致离婚的产品——那是可穿戴的唠叨。**
> BLE 挂坠只能是**情感物件**：震动只代表"我在想你" / "我搞定了，你别惦记了"。
> **「办妥」的震动可以从他那边发出——那是一份礼物；「你还没做」的提醒绝不能出现在她那边——那是一次审讯。**

#### 3.3.3 美国合规（BIPA 是真雷）

| 法规 | 是否触发 | 关键点 |
|---|---|---|
| **CCPA/CPRA** | **初期大概率不触发** | 门槛（任一）：全球年营收 > **$26,625,000**（2026 通胀调整后）／ 买卖/**共享** ≥ **10 万** 加州消费者／≥50% 营收来自卖数据。<br>⚠️ **坑一**：接了 Meta/TikTok 广告 SDK 跑量 = 可能被算作"共享"，10 万加州用户不难达到。<br>⚠️ **坑二**：营收门槛按**全球营收**算，中国主体的收入会并进来。<br>来源：[Clym](https://www.clym.io/blog/ccpa-applicability-guide)、[Jackson Lewis](https://www.jacksonlewis.com/insights/navigating-california-consumer-privacy-act-30-essential-faqs-covered-businesses-including-clarifying-regulations-effective-1126) |
| **COPPA** | 需做年龄门 | 2025 修订版 **2025-06-23 生效，2026-04-22 前完成合规**；**生物识别标识符现在明确属于"个人信息"**——语音直接踩线。App 分级 17+，注册年龄门。（[FTC](https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-finalizes-changes-childrens-privacy-rule-limiting-companies-ability-monetize-kids-data)） |
| **BIPA（伊利诺伊）** 🔴 | **必须专门设计规避** | **BIPA 明文把 "voiceprint"（声纹）列为受保护的生物识别标识符**。赔偿：过失 **$1,000/次**，故意/轻率 **$5,000/次** + 律师费，**允许个人直接起诉**。<br>**2025 年 Otter.ai、微软 Teams 转写功能均因"从语音提取声纹以区分说话人"被集体诉讼。**（[ABA](https://www.americanbar.org/groups/litigation/resources/newsletters/class-actions-derivative-suits/voiceprints-ai-bipa-new-trends-biometric-privacy-litigation/)、[Lewis Rice](https://www.lewisrice.com/publications/ai-transcription-tools-give-rise-to-bipa-claims)）<br>**分界线：你有没有从语音里提取可识别个人身份的特征模板。** |
| **CIPA（加州窃听法）** 🟡 | 需 DPA 防御 | AI 聊天机器人窃听诉讼 **2021 年 2 起 → 2025 年 30 起**（[Debevoise](https://www.debevoisedatablog.com/2025/06/04/cipa-litigation-trends-regarding-tracking-technology-and-ai/)）。把用户语音发给第三方 LLM/ASR 供应商 = 标准靶子。**缓解：与 AI 供应商签 DPA，约定其为 service provider、不得独立使用数据。** |

**🔴 工程红线（建议直接进 `PRD.md` §5.1 隐私红线）：**
1. ❌ **绝不做 speaker identification / voice enrollment / 声纹登录 / "认出是谁在说话"。** 这一条一旦破，BIPA 直接成立。（我们是 1v1 结对产品，**本来就不需要说话人分离**——这是免费的合规红利）
2. ✅ 音频**转写后即刻删除**，只留文本；写明确的 retention policy。
3. ✅ 首次使用语音前，**电子书面同意 + 明示采集什么/为什么/留多久**（2024 年 BIPA 修正案已确认电子同意有效）。
4. ✅ 优先**端侧 ASR**（iOS Speech / Android on-device），能不上云就不上云。

---

### 3.4 三国文化差异总表（一屏看懂）

| 维度 | 🇯🇵 日本 | 🇰🇷 韩国 | 🇺🇸 美国 |
|---|---|---|---|
| **仪式名** | ゆびきり（**禁用汉字**） | 약속 + **도장（盖章）** | pinky promise（**名字不可用**） |
| **文化贴合度** | 中高 | **最高** | 中 |
| **主要文化风险** | "管理"本身就是妻子最恨的无名家务 | 젠더갈등（性别对立）反噬 | emotional labor 量化 / "她当 manager" |
| **正确叙事** | 「"考える・覚えておく"をAIに任せる」 | 「우리는 당신의 기억을 지우지 않습니다」+ 纪念日不再靠他记 | "Fair Play, without the homework." |
| **核心节庆** | **圣诞节 12/24**、交往纪念日 | **100일/1주년**、빼빼로데이 11/11 | 情人节 2/14、纪念日 |
| **竞品密度** | **极低（本土全灭）** | 中（Between 衰落但仍在） | **高（Paired 强、Milo 在追）** |
| **App 付费意愿** | **低（品类被证伪过）** | 低 | **高（Paired $74.99/年跑通）** |
| **隐私敏感度** | **极高** | 高 | **高（BIPA 有法律牙齿）** |
| **数据必须落地** | **日本（强烈建议）** | 韩国/非中国（建议） | 美国（建议） |

---

## 4. 硬件出海（实操级）

### 4.1 认证：**用"预认证模组"把三国认证一次性打包，这是本节唯一重要的结论**

**🔑 核心策略**：FCC（美）、TELEC/技適（日）、KC（韩）、IC（加）、NCC（台）、SRRC（中）**全部支持"模块化认证（modular approval）"**（[Raytac](https://raytac.blog/2023/06/14/understanding-wireless-certification-and-compliancea-guide-to-module-and-non-module-approval-processes/)、[Silicon Labs AN1048](https://www.silabs.com/documents/public/application-notes/an1048-regulatory-certifications.pdf)）。
> **→ 选一颗已经同时持有 FCC + TELEC + KC 的 BLE 预认证模组（如 Raytac 的 nRF52 系列、Espressif ESP32 系列的对应型号），射频部分的认证直接继承，我们只需做整机的"非有意辐射"测试。**
> **认证成本从"每国 $8,000+ 的 chip-down 定制射频认证"降到"一次性 $3,000–$10,000 的模组方案"**（[markready.io](https://markready.io/learn/fcc-certification-cost)、[Sunfire Testing](https://www.sunfiretesting.com/FCC-Certification-Costs-Guide/)）。
> **这一条能省下的钱和时间，比这份报告里其他所有建议加起来都多。**

| 市场 | 项目 | 要求 | 费用 | 周期 |
|---|---|---|---|---|
| 🇯🇵 **日本** | **技適（工事設計認証）** 🔴硬门槛 | 2.4GHz BLE 必须过。**无技適在日"使用"即违电波法第4条（1 年以下拘禁或 100 万日元以下罚金）**——销售本身不直接违法，但买家一用即违法、平台会因此下架 | **官方费率：约 ¥240,000 起**（认证基本料 ¥150,000 + 试验料 ¥90,000）；**工厂无 ISO9001 +¥60,000**；含代理市场价约 ¥30 万级<br>（[TELEC 工事設計認証手数料 PDF](https://www.telec.or.jp/services/tech/files/ninsho_charge6.pdf)、[総務省技適Q&A](https://www.tele.soumu.go.jp/j/adm/monitoring/summary/qa/giteki_mark/)） | **最短 1 个月**（官方口径认证 15 营业日内，不含准备/排队） |
| 🇯🇵 **日本** | **技適 180 天特例** | ⚠️ 持 FCC/CE 等效认证的设备，向総務大臣**网上届出后 180 天内**可在日合法使用，**无手续费**——**但仅限开发/展会/媒体样机，不得用于量产销售或交付众筹 backer** | ¥0 | 即时 |
| 🇯🇵 **日本** | **PSE** | ✅ **已用法条确认不需要**：METI《電気用品の範囲等の解釈について》明文——「锂电池装在机器内进口/销售，**按'当该机器'处理**」，且**焊死/不可轻易取下的内置电池被排除**。我们的挂坠 = 内置焊死电池成品，**不是 PSE 对象品目**（[METI 解释通达 PDF](https://www.meti.go.jp/policy/consumer/seian/denan/topics/mlb/scope_of_lib.pdf)、[e-Gov 施行令别表第二]）<br>🔴 **唯一的雷：若附送 AC 充电头（直流电源装置）→ 那是菱形◇特定电气用品，需登録检查机関立入检查，费用高（JET 报价 ¥49 万+）。→ 只卖 USB-C 线，不附 AC 头。** | 挂坠本体 ¥0 | — |
| 🇰🇷 **韩国** | **KC 适合性评价（적합등록）** 🔴 | BLE 走**适合登录**（指定试验机构测试 → RRA 登录）。**外国厂商须由"韩国本地代表(대리인)"或"韩国进口商"持证**；若进口商持证，则**只有该进口商能进口**（更换需原持证人书面同意——这是坑，选代理模式更灵活）。**外国 CE/FCC 报告不被接受，须在韩国境内实验室测试** | **约 $4,200/型号**（含测试+代理）；政府规费 적합인증约 ₩165,000（적합등록更低）（[blueasialabs](https://www.blueasialabs.com/shouyehuandeng/south-korea-kcc-mandatory-certification)、[ib-lenhardt](https://ib-lenhardt.com/kb/rra-requirements)、[RRA](https://www.rra.go.kr/ko/license/A_a_about.do)） | **4–8 周** |
| 🇰🇷 **韩国** | **KC 电池安全（안전확인）** 🔴 | 阈值同日本（**≥400Wh/L**，纽扣/车用/医用排除）。实务口径：**成品本身不单独要电池 KC，但内置电芯最好用已取得 KC 的电池**（海关可查验）。**→ 采购已带 KC 的电芯，成品端零电池负担** | 若需自做：**数百万韩元/型号，7–12 周**（有 IEC62133-2 报告可缩短）（[kcrlab](https://www.kcrlab.co.kr/18230-2/)、[safetykorea](https://www.safetykorea.kr/policy/targetsSafetyCert)） | 7–12 周 |
| 🇺🇸 **美国** | **FCC Part 15.247（有意辐射体）** | BLE 走 15.247（非 15.249），需 FCC ID 经 TCB 认证。**用预认证模组继承 → 整机只做 Part 15B 非故意辐射 SDoC + 标注"Contains FCC ID"** | 用模组：**Part 15B ≈ $1–3k**；自建 FCC ID：Grantee Code **$60** + 整机测试<br>（[markready.io](https://markready.io/learn/fcc-certification-cost)、FCC Part 15 一手规则） | [估算] 2–4 周 |
| 🇺🇸 **美国** | **Bluetooth SIG** ⚠️**此前漏项** | **只要用 Bluetooth 名称/logo 就必须做 SIG 资格认证**（独立于 FCC）。用预认证模组 → 只买 Declaration ID 引用其 QDID，**无需新增 RF-PHY 测试** | Adopter 会员 **$0/年**；完整 qualification **$8,000**（首个含 33% 折）；**初创激励（年营收 <$100 万）前 2 个 listing 各 $2,500**（[Bluetooth 2026 费率](https://www.bluetooth.com/fee-schedule/)） | — |
| 🇺🇸 **美国** | 电池 / Amazon | UL2054/UL1642 **非联邦强制**，但 **Amazon.com 2026 起把 UL2054/1642 + IEC62133 + UN38.3 + hazmat review 列为上架门槛**；软包 LiPo **不适用 Reese's Law**（那是纽扣电池法） | [未查证具体报价] | — |

> **🔴 认证总判断**：
> - **韩国的认证负担最重**（KC 射频 적합등록 + 需本地持证人；电池端靠采购带 KC 的电芯化解），**日本次之**（技適是硬门槛，**PSE 已用法条确认不需要**），**美国最轻**（预认证模组 + Bluetooth SIG 初创价 $2,500）。
> - **强烈建议：BOM 阶段就锁定一颗"FCC + TELEC(技適) + KC 三证齐全 + 已完成 Bluetooth SIG qualification"的 BLE 模组（Nordic nRF52 / Telink / Espressif 系，Raytac 一类模组厂）。** 这会让 BOM 贵 $1–2/片，但把每国无线测试费从几十万砍到接近零。**这一条是本项目成本结构的核心杠杆，必须写进硬件 RFQ。**
> - **仍需采购前复核 [未查证]**：韩国 적합등록 官方逐项规费、美国 FCC/UN38.3 精确报价、UL 具体要求——**建议直接向深圳认证代理（SGS/华测/贝斯通）一次拿三国全套报价。**

### 4.2 锂电池运输与合规

| 项 | 结论 | 来源 |
|---|---|---|
| **UN38.3 测试报告** | **必做，无例外。** 任何锂电池出口（含内置在设备里的）都需要 UN38.3 报告，由认可实验室（SGS / CMA / UL / TÜV）出具。 | [JJR Lab](https://www.jjrlab.com/news/what-is-a-un383-test-report-how-much-does-it-cost.html) |
| **UN38.3 费用/周期** | 深圳测试 **¥3,000–8,900/型号**，周期 **2–4 周**；**UN38.3 Test Summary 自 2020-01-01 起强制**（可用网址/QR 提供，不必每票附纸质） | [Intertek](https://www.intertek.com/batteries/un-38-3-testing/)、[IATA 2026 锂电指南](https://www.iata.org/contentassets/05e6d8742b0047259bf3a700bc9d42b9/lithium-battery-guidance-document.pdf) |
| **运输分类** | 我们的挂坠 ≈ 1Wh，电池内置于设备 → **UN3481 / PI967 / Section II**（电芯 ≤20Wh、电池 ≤100Wh 稳在 Section II） | 同上 |
| **空运（关键豁免）** | **Section II 且"每包 ≤4 芯/≤2 电池、一票 ≤2 包裹"→ 免锂电池标记、免 DG 申报单**；>2.7Wh 才强制 SOC≤30%（我们 ~1Wh，无强制，仍建议低电量出货）。**DHL Express 接受 PI967 SII 无需 DG 账户。** | IATA 2026 指南、[DHL 锂电指南](https://mydhl.express.dhl/content/dam/downloads/global/en/lithium-batteries/dhl_express_lithium_battery_guide.pdf.coredownload.pdf) |
| **众筹履约** | 深圳直发**物流上可行**（PI967 SII 走 DHL），但见 §4.5——**三国的关税/通关摩擦让"直发"商业上不划算，主流做法是整批进本地能运锂电的 3PL 仓再本地派送。** | [3plguys 2026](https://3plguys.com/articles/crowdfunding-fulfillment-guide-2026) |

### 4.3 众筹渠道

| 平台 | 国家 | 抽成 | 成功率 | 判断 |
|---|---|---|---|---|
| **Makuake** | 🇯🇵 | **20%（税抜，含支付手续费）≈ 税込 22%**（[Makuake 官方](https://lp-mk-2.makuake.com/system-commission)） | **约 86%**（严审筛选后的口径，[FUNDBOOST 比较](https://fundboost.jp/column/crowdfunding/campfire-vs-makuake/)）<br>**注：Makuake 官方从不公布整体成功率 —— [未查证]** | 🟢 **首选。** 2026 年 1–5 月支援总额 **78.7 亿日元，金额份额 44.2%**（[craco 调查 / PR TIMES](https://prtimes.jp/main/html/rd/p/000000053.000116374.html)）。gadget 品类强项，媒体曝光最好 |
| **CAMPFIRE** | 🇯🇵 | **17%（税抜）= 系统费 12% + 支付 5%**（[CAMPFIRE 官方](https://help.camp-fire.jp/hc/ja/articles/115013873328)） | **约 43%**（[同上比较](https://fundboost.jp/column/crowdfunding/campfire-vs-makuake/)） | 🟡 项目数第一（65.5%）但金额份额低。**筛选松 = 声量弱** |
| **GREEN FUNDING** | 🇯🇵 | STANDARD 20% / PARTNER 13% + 初期费 130 万日元 | — | 🟡 **隐藏优选**：仅 107 个项目但**单项目平均 1,369 万日元**（市场平均 182 万的 **7.5 倍**）（[craco/PR TIMES](https://prtimes.jp/main/html/rd/p/000000053.000116374.html)）。流量精准 |
| **Wadiz（와디즈）** | 🇰🇷 | **最低 5% 起**（Light 요금제）（[Wadiz 공지](https://www.wadiz.kr/web/wboard/newsBoardDetail/8310)） | [未查证] | 🟢 **韩国首选**：制造/功能型商品的主场 |
| **Tumblbug（텀블벅）** | 🇰🇷 | **5%（平台）+ 3%（支付）= 8%**（VAT 另计）（[Tumblbug 官方](https://help.tumblbug.com/hc/ko/articles/115006479268)） | [未查证] | 🟡 偏创作/内容型，硬件不是主场 |
| **Kickstarter** | 🇺🇸 | **5% + 支付 3%+$0.20 ≈ 总 8–10%**（[KS 官方](https://help.kickstarter.com/hc/en-us/articles/115005028634-What-are-the-fees)） | 整体 **约 40%**（Statista 2025：**41.98%**）；**科技类仅约 20%** | 🟡 **别抱幻想**：科技类成功率最低 |

**情感类硬件的真实对标（这是定价的锚）：**

| 项目 | 平台 | 募资 | 支持者 | 现价 |
|---|---|---|---|---|
| **Lovebox**（木盒情书机） | Kickstarter 2017 | **€270,931**（目标 €50,000，**542%**） | **2,881** | 单台 **$105** / 双台 **$209.98**；累计售出 **25 万+ 台** |
| **Pillow Talk**（心跳枕） | Kickstarter 2015 | **£82,019 ≈ $124,250** | 约 **2,000 件**售出 | — |
| **Bond Touch** | **❗️不是 Kickstarter 成功案例**——**原始众筹目标未达成**，改走自有预售（2017 情人节预售、2018 病毒爆发） | — | — | 早期 **$98/对** |
| **Filimin / Friendship Lamps** | 无众筹 | — | — | 6 年做到**年营收 $300 万+、售出 25 万+ 台**，2021 被出售 |
| **Between 麻糬周边**（韩国情侣 IP 实体化对标） | Wadiz | **₩59,160,000** | **1,178** | Korea 调研组核实——证明韩国情侣 IP 周边众筹跑得通 |
| **Chipolo**（BLE 防丢器，韩国零售锚） | 零售 | — | — | 单件 **₩39,900** —— **纯 BLE 配件在韩国的"工具价"天花板，我们必须用情感叙事抬离它** |
| **Tomoru**（BLE 发光通知器，**机制与我们几乎一致**） | **Makuake** | **¥2,000,000**（目标 50 万，**400%**） | **600+** | **¥1,000–1,500** |

> **🔴 三个必须内化的残酷事实**：
> 1. **Bond Touch 的 Kickstarter 失败了。** 情侣硬件不是 Kickstarter 的甜区。**Kickstarter 科技类成功率约 20%。**
> 2. **Tomoru 证明"BLE + 发光 + 通知"在日本有需求，但天花板只有 200 万日元**——因为它把自己卖成了"配件"（¥1,000–1,500）。**我们必须用情感叙事把它抬到 ¥8,000–12,000 的"信物"价格带。**
> 3. **Lovebox 25 万台 / Filimin 25 万台 —— 这个品类的天花板大约就是"几十万台 + 年营收几百万美元"。**
>    **→ 硬件是 App 的营销物料和获客引擎，不是撑估值的业务。众筹是发布会，不是生意。**（这与 `MARKET.md` 建议 #3 完全一致，**跨市场二次验证**）

**众筹节奏建议**：
- **第一发：Makuake（日本），2026 年 11 月开跑，锁 12/24 圣诞档。** 目标 **¥5,000,000–15,000,000** [估算，锚定 Makuake 单项目均值 182 万日元 × 3–8 倍]
- **第二发：Wadiz（韩国），2027 Q1，锁 100일 / 화이트데이 档**
- **第三发：Kickstarter（美国），2027 Q2**——**且只在日韩验证成功后才做**（科技类 20% 成功率，不打无准备之仗）

### 4.4 渠道与定价

| 市场 | 渠道路径 | 关键事实 |
|---|---|---|
| 🇯🇵 **日本** | **① Makuake 打战绩 → ② 東京インターナショナル・ギフト・ショー 参展（一次接触几十个 buyer，下届 2026-02-04~06）→ ③ 通过杂货批发商（アントレックス 一类）铺 Village Vanguard/中小杂货店 → ④ 拿销售数据敲 LOFT / HANDS** | **LOFT**：官网在线表单 → 邮寄资料 → 一次/二次审查，**全程 1–2 个月，只收"已商品化"的成品**（[loft.co.jp/suggestion](https://www.loft.co.jp/suggestion/)）<br>**HANDS**：在线提案表单，**只接受法人，不接受个人**（[info.hands.net](https://info.hands.net/company/sinsyohin-01.html)）<br>❌ **3COINS 不是我们的渠道**：传闻 **4 掛け买断**（供货价 = 零售价 40%）——BLE 硬件在这个价位不可能有毛利<br>**电商：Amazon.co.jp（FBA，必做）+ Qoo10（零固定成本，年轻女性画像匹配），跳过楽天**（初期登录费 6 万日元 + 月费 1.95–10 万日元） |
| 🇰🇷 **韩国** | **Wadiz → Naver Smart Store / 29CM / Coupang** | **Coupang 上架电子/电池品类需 KC 认证编号**（[Coupang 安全公告](https://www.coupang.com/np/safety/notice/detail?id=1007297)）<br>**Kakao Friends 联名**是韩国"情侣信物"的最强渠道假设——官方有商务合作入口（[with.kakaofriends.com](https://with.kakaofriends.com/ko/index)）。**[推理] 但需要先有品牌力，是 Phase 2 的事。**<br>Olive Young 主营美妆，**不是 gadget 渠道 —— [未查证是否有 gadget 品类]** |
| 🇺🇸 **美国** | **Uncommon Goods（第一优先级）→ Amazon → Urban Outfitters MRKT → 有数据后谈 Target/Nordstrom** | 🔑 **Uncommon Goods 已经在卖 Bond Touch**（[产品页](https://www.uncommongoods.com/product/long-distance-touch-bracelet-set)）——**这是最强信号：品类已被买手验证。** 提交路径：官网在线 Submit your product → 买手感兴趣才联系 → 通常要求寄样（[Craft Industry Alliance 详解](https://craftindustryalliance.org/the-ins-and-outs-of-selling-your-handmade-product-on-uncommon-goods/)）<br>**Urban Outfitters**：**UO MRKT 卖家表单**是小品牌的正门（[urbanoutfitters.com/help/mrkt-seller-form](https://www.urbanoutfitters.com/help/mrkt-seller-form)）<br>**Amazon US**：消费电子 referral fee **8%**；电子配件 **前 $100 收 15%**（[Amazon Pricing](https://sell.amazon.com/pricing)）<br>⚫ **Brookstone 已不存在**——2018 破产，现在是纯品牌授权生意。**从渠道清单里删掉。** |

**定价（跨市场统一逻辑）：**

| 市场 | 众筹早鸟（对装） | 零售（对装） | 锚点 |
|---|---|---|---|
| 🇨🇳 中国 | ¥249 | ¥299–349 | `HARDWARE_LANDSCAPE.md` §5 已定 |
| 🇯🇵 日本 | **¥8,000–10,000** | **¥12,000–15,000** | 20 代圣诞礼物预算 **¥5,000–10,000**、30 代 **¥10,000–30,000**（[マネコミ](https://manekomi.tmn-anshin.co.jp/kakei/17808497)、[三越伊勢丹 MOOD MARK](https://isetan.mistore.jp/moodmarkgift/11120)）；**totwoo 在 Amazon.co.jp 卖 ¥21,850 偏高 → 我们在 ¥8,000–15,000 有明确空间** |
| 🇰🇷 韩国 | **₩89,000–99,000** | **₩119,000–139,000** | [估算，按日美价格带换算 + 韩国情侣礼物消费力] |
| 🇺🇸 美国 | **$99–129** | **$149–199** | **Lovebox（$105 单/$210 对）、Filimin（$85 单/$170 对）、Bond Touch（$98 对）三家全部落在这个区间。**<br>⚠️ **反面教材：Pillow Talk 定价高（TechCrunch 标题直接是 "Pillow Talk is not cheap"），结果只卖了约 2,000 件。** |

> **定价铁律**：**情侣硬件必须成对卖**（送礼场景 + `NAMING_R2_PINKY.md` 的"我们"名字自带双份客单价）。**单卖没有意义。**

### 4.5 供应链、关税与税务

| 市场 | de minimis / 关税现状（**2026-07 核实**） | 结论 |
|---|---|---|
| 🇺🇸 **美国** 🔴 | **de minimis（$800 免税额）已全面取消**（中国 2025-05-02、所有国家 2025-08-29；2026-02 白宫公告延续暂停、已入 H.R.1 法）。**邮政小包 flat fee（$80/160/200/件）已到期失效。**<br>⚠️ **关税体制 2026-02-24 又变了一次（我此前"54%/$100"是已废止的 IEEPA 旧制）**：**IEEPA 对等关税/芬太尼关税已终止**，代之以 **Section 122 临时进口附加费 = 全球统一 10%（2026-02-24 至 07-24，可升至 15%）**；**Section 301（消费电子 7.5%）+ 232 继续照付。**<br>**当前对华 BLE 设备（HTS 大概率 8517.62）粗略税负 ≈ Section 301 的 7.5% +（可能）Section 122 的 10% = 约 7.5%–17.5%**，取决于 8517.62 是否落入 **Section 122 Annex II 豁免细目（须逐 HTS 码核对）**。<br>（[白宫 2026-02 de minimis 延续公告](https://www.whitehouse.gov/presidential-actions/2026/02/continuing-the-suspension-of-duty-free-de-minimis-treatment-for-all-countries/)、[白宫 Section 122 公告](https://www.whitehouse.gov/presidential-actions/2026/02/imposing-a-temporary-import-surcharge-to-address-fundamental-international-payments-problems/)、[C.H. Robinson 通告](https://www.chrobinson.com/en-us/resources/insights-and-advisories/client-advisories/2026q1/02-23-2026-client-advisory-new-import-surcharge-and-end-of-ieepa-tariffs-effective-feb-24-26/)） | **🔴 从深圳直发美国 backer 已在商业上不可行。**<br>**必须：整批报关进美国 → 能运锂电的美国 3PL 仓 → 本土配送。** 需众筹前备货、垫资、报关。**这是美国最大的现金流风险。**<br>⚠️ **税负比我上一版乐观（不是 54%，是约 7.5–17.5%）——但仍必须让报关行按实际 HTS + Annex II 出税单。** |
| 🇯🇵 **日本** | 进口消费税 10%；**少额输入 ≤¥10,000 免关税+消费税**（已用官方源确认）；8517 无线设备关税多为 0%。<br>⚠️ **令和8年度（2026）税改已定方向：0.6 掛け特例废止 + "税抜≤1万円进口品"纳入消费税 + 平台课税，登录制 2027-10 受理、2028-04 适用——日本正在关掉"1 万円以下免税"的越境 EC 漏洞。**（[税関 1006](https://www.customs.go.jp/tetsuzuki/c-answer/imtsukan/1006_jr.htm)、[財務省令和8年度大纲](https://www.mof.go.jp/tax_policy/tax_reform/outline/fy2026/08taikou_04.htm)） | **建议：整批进口 → 日本 3PL / Amazon FBA。** 当前 ¥10,000 免税仍有效，但 2027–2028 收紧，别把 D2C 直邮当长期方案 |
| 🇰🇷 **韩国** 🔴 | 一般 **USD 150** 免税额（美国原产 USD 200，已确认）；超门槛关税约 8% + VAT 10%。<br>🔴 **两重硬摩擦**：① **个人直邮每个 backer 都须先申请 개인통관고유부호（PCCC）**并提供给你（2020-12 起强制）；② **电子产品被排除于목록통관（清单通关），即使低价也须一般进口申报**。（[easylaw PCCC](https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1504)、[Coupang KC 公告](https://www.coupang.com/np/safety/notice/detail?id=1007297)） | **🔴 韩国 D2C 直邮摩擦全案最大。** **必须走本地仓 / 本地进口商。** 且 KC 证书通常需韩国境内进口商/代理持有 → **韩国需要一个本地合作伙伴，这是硬需求。** |

> **供应链总判断：**
> **"深圳直发全球"这条路，对美国和韩国都走不通（关税/PCCC/电子品强制报关），只有日本当前勉强可行且也在收紧。**
> **→ 三国都必须走"整批进口 + 本地仓"模式。这意味着：众筹的钱到账前，你要先垫付一批货的生产 + 海运 + 关税 + 认证。**
> **→ 这直接决定了首发只能选一个国家**（现金流不允许同时铺三国仓）。**又一条支持"日本先行"的理由**（日本清关最简单、Amazon FBA 最成熟）。

---

## 5. GTM 打法

### 5.1 冷启动的共性难题：双边问题（必须两个人都装）

**这是所有情侣 App 的死穴**（`MARKET.md` §6.3）。三国通用的解法：

1. **单人可用先行**：她一个人就能记录 + 用 AI 出方案。**邀请 TA 是第二步，不是第一步。**
2. **硬件本身就是邀请函**（这是我们相对所有软件竞品的结构性优势）：
   > **挂坠是成对卖的。买了就必须给对方一只。给对方戴上的那一刻，安装就发生了。**
   > **硬件把"双边冷启动"这个软件难题，转化成了一个"送礼"动作——而送礼是自然发生的。**
   > **→ 众筹的每一个支持者 = 两个 App 用户。硬件的支援者就是 App 的种子情侣。**
3. **给男方的 Aha 必须先于给女方的 Aha**（`MARKET.md` 建议 #5）：7 天内办妥 2 件并收到回响。

### 5.2 🇯🇵 日本

| 项 | 打法 |
|---|---|
| **首发节奏** | 2026-09 App 上线（日文版）→ 10 月内容预热 → **11 月中 Makuake 开跑** → **12/24 圣诞档冲刺** → 2027-02 ギフト・ショー |
| **平台优先级** | **① Instagram（Reels + 情侣日常 KOL）= 主战场**（20 代女性利用率最高）<br>**② X（Twitter）= 口碑引爆场**——日本是 X 全球第二大市场，「言ったのに忘れる夫」这类共感系文案在 X 上传播力最强，**「名もなき家事」这个词本身就是靠日本社媒炸开的**<br>③ TikTok = 12 月硬件开箱冲量<br>④ LINE = 留存/CRM，**不是获客**。⚠️ **70% 日本人有过屏蔽公式账号的经历，最大理由是"推送太频繁"**（[モビルス 2025 调查](https://prtimes.jp/main/html/rd/p/000000320.000031387.html)）→ **我们的 AI 推送必须极度克制** |
| **内容母题** | **「"考える・覚えておく"をAIに任せる」**——不是"让他干活"，是"你不用再当那个记着一切的人" |
| **KOL 成本** | Instagram **2–3 円/follower**；TikTok **1–5 円/follower**；5 万粉 Instagram KOL ≈ **10–15 万日元/条**（[mochainc 2026 版](https://mochainc.co.jp/influencer-pricing-by-followers/)、[Rakubo](https://www.rakubo.co.jp/2026/04/30/influencer-marketing-cost-2026/)） |
| **预算量级** [估算] | Makuake 前的预热（KOL 20–30 条 micro + PR）：**¥300 万–500 万**<br>Makuake 抽成 22% + 平台内广告：**按募资额计**<br>圣诞档 TikTok/IG 投放：**¥200 万–400 万**<br>**日本首年营销预算量级：¥800 万–1,500 万（约 40–75 万人民币）**<br>**假设**：不投效果广告买 CPI（见下），全部押内容与 KOL |

### 5.3 🇰🇷 韩国

| 项 | 打法 |
|---|---|
| **首发节奏** | 2027-Q1 App 上线 → **Wadiz 众筹锁 화이트데이（3/14）/ 100일 档** |
| **核心叙事** 🔥 | **「우리는 당신의 기억을 지우지 않습니다」（我们不会删掉你的回忆）** —— 直接打 Between 2025-09 的数据事故。配套：**一键从 Between 迁移 + 随时完整导出**。<br>**这是三个市场里唯一一个"竞品自己递上来的枪"。** |
| **平台优先级** | ① **Instagram**（韩国情侣内容主阵地）<br>② **NAVER 블로그/카페**（韩国搜索 = NAVER，长文口碑）<br>③ **KakaoTalk 채널**（留存）<br>④ YouTube Shorts / TikTok |
| **内容母题** | 「기념일, 이제 그가 먼저 챙깁니다」（纪念日，现在换他先记得了）—— **但必须小心 젠더갈등**：叙事主语是 **AI**，不是"她" |
| **渠道** | Wadiz → Naver Smart Store / 29CM → （Phase 2）Kakao Friends 联名 |
| **预算量级** [估算] | **₩50,000,000–100,000,000（约 25–50 万人民币）**，其中一半押"Between 难民迁移"的内容战役 |

### 5.4 🇺🇸 美国

| 项 | 打法 |
|---|---|
| **首发节奏** | 2027-Q2，**且必须在日韩验证成功后才做**（美国竞品最强、法律风险最高、获客最贵） |
| **🔴 买量算不过账（这是最重要的数字）** | 美国 iOS CPI **约 $4.7**（[Business of Apps CPI 基准](https://www.businessofapps.com/ads/cpi/research/cost-per-install/)，二手聚合源，**[方向性参考，非一手]**）<br>**推算**：$4.7 CPI × （1 / 5% 付费转化）= **每付费用户获客成本约 $94**<br>**vs Paired 式 $74.99/年 首年 ARPU**<br>👉 **纯买量必亏。美国只能靠病毒传播。** |
| **必须抄的病毒案例** 🔑 | **Locket**（把照片推到对方主屏 widget）：2022-01-01 上线，**30 国 App Store 榜首**，累计 **8,000 万下载**，2024 年已盈利，融资 **$12.5M（Sam Altman 领投 $10M 种子）**（[TechCrunch](https://techcrunch.com/2022/08/02/locket-app-that-lets-yor-post-photos-to-your-loved-ones-homescreens-raises-12-5m/)）<br>**NoteIt**：#NoteIt 标签 **3,450 万+ 播放**（[BuzzFeed News](https://buzzfeednews.com/amphtml/stefficao/viral-tiktok-couples-apps)）<br>**🔥 机制洞察（比数字重要）**：<br>**Locket/NoteIt 的病毒环不是"功能"，是"我男朋友在我手机上留了个东西"这个可截图的物证。传播动作发生在【接收方】，内容是【被爱的证据】。**<br>👉 **我们要设计的病毒资产不是"任务卡"，是"他办完之后，她手机上出现的那个东西"**——挂坠的一次震动、一张 AI 生成的"他今天替你搞定了这 3 件事"的卡片。<br>**"我给他派了个活儿"发不出去 TikTok；"他默默替我把这 3 件事办了"能发。**<br>**→ 定位问题和增长问题是同一个问题：只有非监控框架才生得出能传播的内容。** |
| **Reddit** ⚠️ | **Reddit 是高风险区，不是流量区。** r/TwoXChromosomes、r/workingmoms 会把"任务指派 App"的广告直接撕烂。<br>**Reddit 用来做 listening（本报告 §3.3.2 的证据全从这来），不投放。** |
| **TikTok KOL 成本** | nano（1K–10K）**$25–$200/条**；micro（10K–100K）**$200–$1,500/条**（[Meltwater](https://www.meltwater.com/en/blog/influencer-marketing-costs-rates-pricing)、[Influencer Marketing Hub](https://influencermarketinghub.com/tiktok-influencer-rates/)）<br>**策略：堆 100+ 条 nano/micro 情侣真人账号，追求 UGC 观感。**<br>❌ **绝不投 mental-load / mommy 类大 V——她们的评论区就是嘲讽发生地。** |
| **免费的百万曝光** | Paired 拿过 **Apple App of the Day（2024-01）**。**专门为 Apple 编辑做一次设计与发布准备，这是零成本的百万级曝光。** |
| **预算量级** [估算] | **$150,000–300,000（约 110–220 万人民币）**，其中 60% 是 KOL/UGC，0% 是效果广告 |

---

## 6. 结论

### 6.1 优先级排序：**日本 → 韩国 → 美国**

| 维度 | 🇯🇵 日本 | 🇰🇷 韩国 | 🇺🇸 美国 |
|---|---|---|---|
| 文化贴合度 | 🟡 中高 | 🟢 **最高**（盖章 + 纪念日） | 🟡 中（需重构叙事） |
| **竞品密度** | 🟢 **极低（本土全灭）** | 🟡 中（Between 衰落） | 🔴 **高（Paired 强、Milo 追）** |
| 硬件渠道成熟度 | 🟢 **最高**（Makuake 金额份额 44.2% + LOFT/HANDS + ギフト・ショー） | 🟡 中（Wadiz 强，但 KC 适合登录需本地持证人 + PCCC + 电子品强制报关） | 🟡 中（Uncommon Goods 好进，但**de minimis 已取消、需整批报关 + 美国 3PL，现金流最重**） |
| App 付费意愿 | 🔴 **低（品类被证伪过）** | 🔴 低 | 🟢 **高（$74.99/年跑通）** |
| 法律风险 | 🟡 APPI 跨境 | 🟡 PIPA | 🔴 **BIPA / CIPA 有法律牙齿** |
| 供应链摩擦 | 🟢 **最低**（¥10,000 免税尚存 + FBA 成熟） | 🔴 高（PCCC + 电子品强制报关 + 本地进口商） | 🔴 **最高（de minimis 已死，需整批报关 + 美国 3PL）** |
| 创始人资源匹配 | 🟢 中日供应链在深圳，日本 Amazon FBA 成熟 | 🟡 需韩国本地伙伴 | 🔴 需美国实体 + 律师 + 3PL |

## **首发：日本。**

**三条决策依据（按权重）：**

1. **这是一个刚刚空出来的市场，而且窗口是有时限的。** Pairy 2026-06-30 才关服（**一个月前**）。日本情侣 App 前三名全是韩国货，唯一的日本本土 AI 情侣产品 COUPPLY 只有 4,000 对情侣。**1.2 亿人口、全球第三大 App 消费市场、本土玩家全线退场——这种真空不会持续两年。**

2. **硬件渠道成熟度日本是碾压级的，而我们的商业模式必须靠硬件。**
   - 日本情侣 App 的品类被证伪过（Couples 有 400 万下载被 Match Group 关掉；Pairy 砍掉付费后死掉）→ **App 在日本挣不到订阅费**
   - **但日本有全世界最成熟的"情感硬件众筹 → 杂货零售"链路**（Makuake 44.2% 金额份额 → ギフト・ショー → LOFT/HANDS），**ユカイ工学（Qoobo/BOCCO emo/fufuly）是这条链路的活证明**
   - **→ 日本的正确打法本来就是"App 免费做规模，钱在挂坠上赚"——而这恰好是我们的三步走路线（`HARDWARE_LANDSCAPE.md`）**

3. **供应链摩擦最低，现金流最安全。** 美国 de minimis 已死（现税负约 7.5–17.5%，且必须整批报关 + 美国 3PL），韩国个人通关码 PCCC + 电子品强制报关卡死 D2C。**日本是唯一一个"整批进 Amazon FBA 就能跑通、且 ¥10,000 免税尚存"的市场。** 第一战不能死在物流上。

**为什么不是韩国先（尽管文化最贴合）？**
- Between 数据事故的窗口很诱人，**但韩国的 KC 双认证（射频 + 电池）+ 个人通关码 + 需要本地进口商，是三国里硬件落地最麻烦的**。
- **折中方案**：**软件先进韩国，硬件跟日本。** 韩国 App 版可以在日本硬件众筹的同期低成本上线（韩文本地化 + Between 迁移工具），**用"记忆不会被删"的叙事零成本收割 Between 难民**——这不需要硬件，不需要 KC 认证，只需要一个韩文版和一个迁移脚本。**这是本报告性价比最高的一个建议。**

**为什么美国最后？**
竞品最强（Paired 百万 MAU）、法律风险最高（BIPA 每次违规 $1,000–5,000）、获客最贵（CPI $4.7 > 首年 ARPU 的转化经济）、供应链最贵（关税）。**美国是"赢了日韩之后去拿的奖杯"，不是练兵场。**

### 6.2 一页纸出海路线图

```
2026 Q3 ────────────────────────────────────────────────────────
  [软件] 日文版 App 上线（数据落日本 / 无声纹 / E2EE 或等效加密）
  [品牌] 全球图形标定稿（拳头小指 + 负空间心 + 缩小成✓）
        四国显示名确定：我们拉勾 / ゆびきりげんまん / 손가락약속 / Pinky Pact
        全球拉丁文字标：Pinkypact 或 WePinky（三区全零）
  [法务] 中日商标同步申请（9/42/45 + 14 类）
  [硬件] BOM 锁定"FCC+TELEC+KC 三证齐全"的 BLE 预认证模组 ⭐
        UN38.3 送测（$300–930，16 样品）
  ✅ 验证指标：日本 App 双端周留存 ≥ 30%；男方 Aha（7 天办妥 2 件）≥ 25%

2026 Q4 ────────────────────────────────────────────────────────
  [硬件] 技適（工事設計認証，¥30 万，约 1 个月）
  [众筹] 11 月中 Makuake 开跑 · 双件装早鸟 ¥8,000–10,000
        目标 ¥5,000,000–15,000,000 [估算]
  [GTM] Instagram/X 内容战役：「"考える・覚えておく"をAIに任せる」
  [圣诞] 12/24 冲刺
  ✅ 验证指标：Makuake 达成率 ≥ 300%；支援者 ≥ 500 对

2027 Q1 ────────────────────────────────────────────────────────
  [软件] 🇰🇷 韩文版上线（零硬件、零 KC、零关税 —— 纯软件低成本试水）
        核心武器：Between 一键迁移 +「记忆不会被删」
  [日本] ギフト・ショー 参展（2/4–6）→ 杂货批发商 → Village Vanguard
  [日本] Amazon.co.jp FBA + Qoo10 上架
  ✅ 验证指标：韩国自然新增 ≥ 5,000 对（零投放）；日本零售铺货 ≥ 3 个渠道

2027 Q2 ────────────────────────────────────────────────────────
  [韩国] KC 双认证（射频 + 电池）→ Wadiz 众筹（3/14 白色情人节档）
  [日本] LOFT / HANDS 提案（带 Makuake 战绩 + Amazon 销售数据）
  [美国] 产品重构：assign → claim；BIPA 合规改造；FCC（模组继承）
  ✅ 验证指标：日本零售 sell-through ≥ 30%/月

2027 Q3–Q4 ────────────────────────────────────────────────────
  [美国] Uncommon Goods 提案（他们已在卖 Bond Touch）
        Kickstarter（$99–129/对早鸟）· TikTok 100+ nano KOL
        美国 3PL 备货（de minimis 已死，必须整批报关）
  ✅ 验证指标：美国付费转化 ≥ 5%（对标 Paired 经济模型）
```

### 6.3 五条给创始人的战略建议

**1. 「拉勾」是内核，不是名字。把钱花在图形上，不要花在找一个通杀四国的词上。**
这个仪式在四国同源、同构、全民认知——**但它的名字在四国全部被寄生或占用**（拉勾网/货拉拉、日本汉字撞黑道断指、韩语"약속"过泛、Pinky Swear 是儿童癌症慈善）。
**唯一没被占用的是那个图形：两个拳头，各伸一根小指，勾在一起，中间的负空间是一颗心，缩到 16px 是一个 ✓。**
**四个名字（我们拉勾 / ゆびきりげんまん / 손가락약속 / Pinky Pact）+ 一个图形 + 一个全球拉丁文字标（Pinkypact 或 WePinky——后者三区 App Store 全零、最干净）。** App Store 和 Google Play 都支持按地区设置不同显示名——**这个方案的边际成本只有 7–10 万人民币的额外商标费。**
> ⚠️ **专项商标复核修正了两个名字**：日本**不能用单独的「ゆびきり」**（有 live 日本商标 + App Store 同名占用），改用全句「ゆびきりげんまん」；韩国**不用纯「약속」**（通用词全占），改用实测干净的「손가락약속」。详见 §2.4。

**2. 三个市场，三套叙事，但都指向同一句话：AI 当 manager，不是她当 manager。**
这是本次调研最惊人的收敛——**日本、美国的调研各自独立地撞到了同一堵墙**：
- 日本：妻子最恨的"名もなき家事"，排第一的是**「管理」**。做一个让她盯进度的 App，就是给她加班。
- 美国：Reddit 最高赞骂人的词就是 **"manager / boss"**。Fair Play 之所以是主流方法论而不是被嘲笑，唯一原因是它把 **Conception + Planning + Execution 三包给拿卡的人**。
- **我们的 AI 出方案（`AI_NATIVE_VALUE.md` 的 L2）不是"锦上添花"，它是这个产品在日美两国的法理基础——它是唯一能替女人承担"想"和"计划"的东西。**
- 一句话：**"Say it once. Never think about it again."**（她说一次，就再也不用想第二次）

**3. 韩国有一份免费的午餐，去年 9 月刚做好，现在还热着——但它有保质期。**
Between（韩国国民情侣 App，10 年、3,500 万下载）在 7 年里被转手 3 次，2025 年 9 月被一家做闹钟 App 的公司**误删了大量用户的十年相册，且无备份、无法恢复**。补偿是终身会员券，用户骂"半吊子道歉"。
**Between 的唯一护城河就是"十年的共同回忆"，它亲手炸了。**
**→ 韩文版 App + 一键从 Between 迁移 + 「우리는 당신의 기억을 지우지 않습니다」。零硬件、零 KC 认证、零关税、零投放。这是整份报告里 ROI 最高的一个动作，应该在 2027 Q1 之前做完。**

**4. 硬件是获客引擎和商业模式，但它不是一门大生意——别搞错它的角色。**
- Lovebox 卖了 25 万台、Filimin 卖了 25 万台、Bond Touch 的 Kickstarter **失败了**、Kickstarter 科技类成功率只有 **20%**、日本的 Tomoru（BLE 发光通知器，机制和我们一样）只募到 **200 万日元**。
- **这个品类的天花板就是"几十万台 + 年营收几百万美元"。**
- **但硬件解决了软件解决不了的那个问题：双边冷启动。挂坠是成对卖的，买了就必须给对方戴上——那一刻，安装就发生了。每一个众筹支援者 = 两个 App 用户。**
- **→ 众筹是发布会，不是生意。硬件是邀请函，不是产品。**
- **🔴 最重要的一条硬件红线**：**挂坠绝不能因为"他没做"而在她那边震动。** 那是可穿戴的唠叨，在三个国家都会翻车。**震动只能表达"我在想你"和"我搞定了，你别惦记了"。**

**5. BOM 阶段就锁死一颗"FCC + TELEC(技適) + KC"三证齐全的 BLE 预认证模组——这一条能省的钱比这份报告里其他所有建议加起来都多。**
FCC/技適/KC 全部支持**模块化认证**，射频认证可以直接继承。
- 用预认证模组：整机只需做"非有意辐射"测试，**$3,000–10,000 一次搞定**
- chip-down 自己做射频：**每国 $8,000 起，三国分别做**
- 顺带四条：① **别漏了 Bluetooth SIG**——只要用 Bluetooth logo 就要做 SIG 资格认证，但用预认证模组只需买 Declaration ID 引用其 QDID（初创激励价前 2 个 listing 各 $2,500）；② **日本 PSE 已用法条确认不需要**（内置焊死电池按"机器"处理、被明文排除）——**但如果附送 AC 充电头就要菱形◇PSE，所以只卖 USB-C 线、不附充电头**；③ **韩国最麻烦**（KC 射频适合登录需本地持证人 + 电池端要用带 KC 的电芯 + 个人通关码 PCCC + 电子品强制报关）；④ **美国关税 2026-02 又变了**：IEEPA 旧制（54%/$100 件）已终止，现为 Section 301 的 7.5% +（可能）Section 122 的 10% ≈ 7.5–17.5%，**de minimis 仍已死、深圳直发 backer 仍不可行，必须整批报关 + 能运锂电的美国 3PL。**

---

## 7. 未查证清单（诚实交代检索边界）

| 项 | 状态 |
|---|---|
| **App Store 占用（jp/kr/us）** | 🟢 **已由专项子代理用 iTunes API 全三区跑通并逐词核验**（§2.4 表为一手数据）。 |
| **美国商标（USPTO）** | 🟡 **已用官方 TSDR 对已知序列号逐一核验**（一手可信），**非全文穷举**（前端 AWS WAF 挡）。全类穷举建议付费商标检索。 |
| **日本 J-PlatPat / 韩国 KIPRIS 官方站** | 🟡 未直接查通；结论经 TMview/WIPO GBD 镜像。**YUBIKIRI(日,live,SNS/交友)、콩닥(韩,live,9/42类)已确认 live，但确切注册号未全部取回**。正式定名前须委托日韩代理所。 |
| **中国 CNIPA** | 🔴 **未程序化检索**——「我们拉勾」在华全类占用必须另做专门检索。 |
| KC 射频 적합등록 的官方逐项规费 | 🟡 已知含代理约 $4,200/型号（一手），但 RRA 官方逐项规费未全验 |
| KC 电池安全具体费用 | 🟡 已知数百万韩元/型号量级（一手）；实务可用带 KC 的电芯规避 |
| 美国 FCC/UN38.3 精确美元报价 | 🟡 逻辑一手确证，具体报价为估算，采购前复核 |
| UL2054/UL1642 对我们是否强制 | 🟢 已核实：**非联邦强制，但 Amazon 2026 上架要求**；软包 LiPo 不适用 Reese's Law |
| 日本 ¥10,000 免税门槛 | 🟢 已核实（税関官方）；2027–2028 税改将收紧 |
| 韩国 de minimis（USD 150/200） | 🟢 已核实（一手） |
| 美国关税 8517.62 是否在 Section 122 Annex II 豁免 | 🔴 **决定是否 +10%，必须让报关行按确切 HTS + Annex II 出税单** |
| 中国危包证对 PI967 Section II 小件的豁免口径 | 🟡 方向明确（普货处理），"取消"说法未获权威源，须向货代确认 |
| Makuake 整体成功率 | 🔴 官方不公布；§4.3 的 86% 来自第三方比较文，**存疑** |
| Wadiz / Tumblbug 成功率 | 🔴 未查证 |
| Between 当前 MAU | 🟢 已核实：**233,350**（[한국경제](https://www.hankyung.com/article/2025092951317)） |
| 韩国情侣市场 TAM 趋势 | 🟢 已核实**反弹**：2025 结婚数 +8.1%、珠宝市场 +13.5%（此前"收缩"判断已撤回） |
| 🔴 **韩国用户是否愿意"对手机说话建任务"** | 🔴 **未查证，且是韩国市场最高优先级的未验证假设**（Between 已有语音功能，语音在韩国不是差异点）。首发前必须用小样本验证 |
| 韩国 KC 证书是否必须由本地进口商持有 | 🟡 [推理]，需韩国代理确认 |
| 美国 CPI $4.7 / TikTok KOL 报价 / Reddit CPM | 🟡 均来自聚合博客与代理商博客，**非平台一手数据，方向性参考** |
| Kickstarter 科技类 20% 成功率 | 🟡 低权威源（KS 官方 stats 页返回 403），与 Statista 整体 41.98% 交叉后取"科技类显著低于均值"的方向性结论 |
| Olive Young 是否经营 gadget 品类 | 🔴 未查证 |
| Kakao Friends 联名的实际门槛与分成 | 🔴 未查证（仅确认存在商务合作入口） |
| Paired 的实际营收 / ARR | 🔴 未查证（第三方爬虫估算不引用） |

**域名 whois 实测（2026-07-13，已确认）**：`pinkypact.com` 被占(2023) · `wepinky.com` 被占(2024) · `yubikiri.com` 被占(2001) · `yaksok.com` 被占(1999) · `notakebacks.com` 被占(2025-07) · **`pinkypact.io` / `pinkypact.co` / `getpinkypact.com` 可用**。

---

*调研与撰写：Claude Opus 4.8 · 2026-07-13（硬件/商标/韩国专项复核 2026-07-14）· 检索工具：WebSearch / WebFetch / Apple iTunes Search API / USPTO TSDR / RDAP whois*
*所有标 [推理]/[估算]/[未查证] 处均未经一手核实，量产与法务决策前需复核。*
*⚠️ 关税与 de minimis 属高速变动领域（美国 2025-08 取消 de minimis、2026-02 又以 Section 122 替换 IEEPA）——采购前必须让报关行按当日实际税则复核。*
