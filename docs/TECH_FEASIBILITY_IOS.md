# 念念 EchoEcho · iOS 单渠道技术可行性文档 v1.0.0

> 范围:iOS 原生 App(安卓暂缓)的完整技术可行性评估。
> 撰写日期:2026-07-14
> 依据(已全文通读,非抽样):`README.md`、`docs/PRD.md`(v1.0.0 + 2026-07-12 两条拍板)、`docs/MODE_SPEC.md`、`BRAND.md`、`schema.sql`、`wrangler.toml`、`functions/api/[[path]].js`、`docs/HARDWARE_API.md`、`docs/research/MOTION_DESIGN_PATTERNS.md`(动效范式)、`docs/research/GLOBAL_GTM.md`(出海/合规)、`docs/research/KOREA_MARKET_DEEPDIVE.md`(数据不丢失=生死线、声纹刑事红线、跨境合规)。
> 数据纪律:凡有来源的数字/版本/定价均附链接;查不到的标 **[推理/估算]**,不编造。检索边界见文末 §12。
> 版本规则:X.X.X 三位。

---

## 0. 结论前置(先读这 5 句)

1. **iOS 原生(SwiftUI)是本产品的正确选择,而且这次不是"品味偏好"而是"技术事实"**:念念要的六件事(spring 物理动效、Haptics 微震动、录音波纹、办妥仪式、锁屏/灵动岛提醒、Live Activity)里,**灵动岛/Live Activity 这一类,四条技术路线(SwiftUI / React Native / Flutter / Capacitor)全都要求你回到 SwiftUI 写 Widget Extension**——跨端框架在这里省不掉原生工作([Flutter 官方插件明说 UI 必须用 Swift 写](https://pub.dev/packages/live_activities)、[Capacitor ActivityKit 无官方支持](https://medium.com/@kisimedia/ios-live-activities-in-capacitor-a-practical-plugin-to-make-it-work-9c85d40e35e1));而"跨端"唯一的收益(iOS+Android 共享代码)因为**安卓已暂缓**而归零。所以没有理由不用原生。
2. **技术栈**:前端 SwiftUI + ActivityKit(Live Activity/灵动岛)+ WidgetKit(锁屏组件)+ Core Haptics + AVFoundation(录音)+ SwiftData(本地副本,呼应"数据永不丢失");**后端 100% 复用现有 Cloudflare 栈**(REST 已就绪,原生 App 直接调),只需补两块:**APNs 推送**(替换现有 Web 通知+12s 轮询)和**真账号体系**(替换现有免注册本地 token)。
3. **开发方式**:**Claude Code agentic 直接写 SwiftUI 工程为主**,设计工具为辅——`MOTION_DESIGN_PATTERNS.md` 已经把动效沉淀成一套 Motion Tokens(easing/duration/stagger 全定死),这本身就是一份可直接翻译成 SwiftUI 的规格书;高质感的**唯一铺张时刻「办妥→回响仪式」**先用 HTML/Figma 做视觉探索定稿,再由 Claude Code 落 SwiftUI。混合工作流见 §3。
4. **账号体系**:App Store 的 Guideline 4.8 **只有在你提供第三方社交登录(微信/Google 等)时才强制 Sign in with Apple**([Apple 审核指南 4.8](https://developer.apple.com/app-store/review/guidelines/));若首发只做"手机号/邮箱自有登录",可暂不接 SIWA。**推荐:手机号(自有)+ Sign in with Apple 双通道**,现有邀请码结对逻辑完整保留,只是把"匿名 member token"升级为"account 之下的 member"。
5. **最大风险(按严重度)**:① **免注册→账号的迁移**(现有用户全是匿名 token,迁移做砸=丢用户数据=踩中韩国"数据永不丢失"生死线,`KOREA_MARKET_DEEPDIVE.md` §1);② **中国大陆上架需 ICP 备案**([2024 起强制,需大陆法人主体](https://appinchina.co/blog/the-complete-guide-to-chinas-mobile-app-filing/));③ **Cloudflare 单点依赖**(D1 单库硬顶 10GB,[不可提额](https://developers.cloudflare.com/d1/platform/pricing/));④ **声纹识别在韩国是刑事红线**,明确不做(`KOREA_MARKET_DEEPDIVE.md` §4)。

---

## 1. 核心问题一:iOS 原生是不是效果最好?(四路线逐条对比)

### 1.0 先立判据

念念不是营销站,是**每天用 3–10 次的日常工具**(`MOTION_DESIGN_PATTERNS.md` §4.0)。它需要的不是"炫",是"稳、暖、跟手"。而它偏偏又要几个**只有系统级 API 才能给的能力**:灵动岛、Live Activity、锁屏组件、系统级 Haptics。这两点合起来决定了评估维度:**能力上限**(能不能做到)、**质感天花板**(做出来跟不跟手)、**开发速度**、**复用现有 PWA 代码的程度**。

现状:前端是**单文件 HTML/JS PWA**(`public/`),后端是 Cloudflare Pages Functions(`functions/api/[[path]].js`)。所以"复用现有代码"这一维,只有 Capacitor(套壳现有 PWA)能真正吃到红利,其余三条都是重写 UI。

### 1.1 逐能力对比

| 能力(念念需要的) | SwiftUI 原生 | React Native (Expo) | Flutter | Capacitor(套壳现有 PWA) |
|---|---|---|---|---|
| **Spring 物理动效** | ✅ 上限最高。`withAnimation(.spring)` / `.snappy` 系统原生弹簧,60/120fps | 🟡 Reanimated 3 的 `withSpring` 可做,质感接近但跨 JS 桥,复杂场景掉帧风险 | 🟡 `SpringSimulation`/flutter_animate 可做,自绘引擎一致性好 | 🔴 Web CSS/JS 动画,`transition`/spring 库;WKWebView 里长列表 + 动画易掉帧 |
| **Haptics 微震动** | ✅ Core Haptics 全量(自定义波形 AHAP、连续触感) | 🟡 `expo-haptics` 覆盖常用类型,自定义波形需原生模块 | 🟡 `HapticFeedback`/第三方插件,粒度粗于原生 | 🟡 `@capacitor/haptics` 仅 impact/notification 几档,**做不了自定义波形** |
| **录音 + 实时波纹** | ✅ AVAudioEngine 取 PCM 电平实时驱动波纹,延迟最低 | 🟡 需原生录音模块 + 桥接电平数据,可做 | 🟡 record/just_audio + 自绘波形 | 🟡 MediaRecorder Web API 电平采样,精度与延迟受 WKWebView 限制 |
| **办妥仪式(全屏一次性庆祝)** | ✅ 想怎么做怎么做;复杂粒子/双圈波纹用 Canvas/Metal | ✅ RN 层可做 2D;复杂用 Skia | ✅ Flutter 自绘引擎恰好擅长这个 | 🟡 Web Canvas 可做,但这是"唯一值得铺张的时刻",WKWebView 掉一帧就露怯 |
| **锁屏/灵动岛提醒(Live Activity)** | ✅ 原生 ActivityKit + WidgetKit | 🔴 **UI 必须用 SwiftUI 写 Widget Extension**,RN 只能传数据([software-mansion-labs/expo-live-activity](https://github.com/software-mansion-labs/expo-live-activity);老库 expo-live-activity 已 deprecated) | 🔴 **同样 UI 必须 Swift 写**([Flutter 官方:not possible to only use Flutter](https://pub.dev/packages/live_activities)) | 🔴 **同样必须 Swift Widget Extension**,社区插件仅桥接([无官方支持](https://medium.com/@kisimedia/ios-live-activities-in-capacitor-a-practical-plugin-to-make-it-work-9c85d40e35e1)) |
| **Live Activity 远程推送更新** | ✅ 原生 APNs `pushType:token`,iOS 17.2+ 还能 push-to-start([Apple 文档](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications)) | 🟡 数据侧可桥,UI 仍原生 | 🟡 同左 | 🟡 同左 |
| **WidgetKit 桌面/锁屏小组件** | ✅ 原生 | 🔴 必须 SwiftUI 写 | 🔴 必须 SwiftUI 写 | 🔴 必须 SwiftUI 写 |
| **五模式主题切换** | ✅ SwiftUI `@Environment` + Design Token,秒切 | ✅ JS 主题系统,好做 | ✅ Theme 好做 | ✅ **现有 CSS 变量组直接搬**(`MODE_SPEC.md` 已是 CSS token) |
| **复用现有 PWA 代码** | 🔴 ~0%,UI 全重写(逻辑/文案/token 可参考) | 🔴 ~0%(RN 非 Web) | 🔴 ~0%(Dart 重写) | ✅ **~70%+ 直接跑**,PWA 装进 WKWebView |
| **首屏包体 / 内存** | ✅ 最省 | 🟡 JS runtime 开销 | 🟡 引擎 ~4–8MB 起 | 🟡 WebView + 现有 JS |
| **开发速度(iOS 单端)** | 🟡 中(需学 SwiftUI,但 Claude Code 可加速) | 🟡 中 | 🟡 中 | ✅ **最快起步**(套壳当天可跑),但原生能力全是后补的坑 |

### 1.2 关键洞察(为什么原生赢得干净)

**洞察一:念念要的"高级能力"恰好全落在同一个技术边界的另一侧。**
灵动岛、Live Activity、锁屏组件——这三样是念念区别于"网页套壳"的核心卖点(锁屏强提醒是 PRD F-03 的运力基础,灵动岛是纪念日 D-Day 的天然载体,Apple 官方最爱推的用例见 `KOREA_MARKET_DEEPDIVE.md` §7)。而**这三样在 RN / Flutter / Capacitor 里都必须回到 SwiftUI 写 Widget Extension**。也就是说:选跨端框架,你并没有"避开 Swift",你只是"既要维护 JS/Dart 主工程,又要维护一个 Swift 副工程,还要在两者之间桥接数据"——复杂度不降反升。

**洞察二:跨端框架的核心价值(一套代码两端跑)因为安卓暂缓而蒸发。**
RN/Flutter 存在的第一理由是 iOS+Android 复用。**本项目明确"安卓暂缓"**,这个理由不成立。剩下的只有"Web 技能复用",而那正是 Capacitor 的地盘。

**洞察三:Capacitor 能吃到 70% 代码复用,但它复用的恰恰是"该被重做的那部分"。**
`MOTION_DESIGN_PATTERNS.md` §4.3 已经把"深色玻璃拟态用在消息卡片""每帧 canvas.toDataURL 让中端机烫手"列为红线;§4.0 判据是"日常工具动效失败代价=卸载"。念念转原生的**动机本身**就是"网页的跟手感不够"。用 Capacitor 把现有网页装进 WKWebView,等于把想解决的问题原样带进去。**Capacitor 适合"内容型 App 快速上架",不适合"以交互质感为卖点的情感产品"。**

**洞察四:办妥仪式这类一次性全屏庆祝,四条路都能做,不构成区分点。**
真正区分的是**每天 1000 次的微交互**(`:active` 触摸反馈、三态流转锁重复点击、按住说话波纹)——这些"看不见但决定信任感"的细节,原生的确定性最高。

### 1.3 明确推荐 + 代价

> **✅ SwiftUI 原生。** 代价诚实列出:

- **代价一:现有 PWA 代码复用率 ≈ 0**。但要看清——复用的是"逻辑与文案",不是"UI 代码":API 契约(`functions/api/[[path]].js` 的 REST)、话术包(`MODE_SPEC.md`)、视觉 token(`BRAND.md`)、Motion Tokens(`MOTION_DESIGN_PATTERNS.md` §4.5)全部可 1:1 移植成 Swift 常量/枚举。真正重写的只有"把 HTML 换成 SwiftUI View"。
- **代价二:团队需具备 SwiftUI 能力**。缓解:Claude Code agentic 编码(§3)+ 现成的动效规格书,可把学习曲线摊薄。
- **代价三:PWA 与原生 App 会短期并存**(网页版仍在 `rabbitholes.hero1900.com` / pages.dev 跑),需维护两套前端一段时间。缓解:后端同一套,只是多一个客户端;PWA 可降级为"轻量入口 + 落地页"。

> **次优备选(仅在"必须极速上架验证"时):Capacitor**——把现有 PWA 套壳,2–3 天出 TestFlight,先验证"iOS 用户愿不愿装",Live Activity 等原生能力用社区插件 + Swift Widget Extension 逐步补。**但这条路的天花板就是现有网页的天花板**,一旦验证通过要做质感,仍要迁 SwiftUI——等于做两遍。**不推荐作为终局,只可作为"上架占位/A-B 验证"的临时手段。**

---

## 2. 技术选型决策表(总表)

| 决策项 | 方案 | 优点 | 代价 | 推荐度 |
|---|---|---|---|---|
| **客户端框架** | **SwiftUI 原生** | 六大能力上限最高;灵动岛/Live Activity/Haptics 无桥接损耗;质感天花板最高 | PWA 代码复用≈0;需 SwiftUI 能力 | ⭐⭐⭐⭐⭐ |
| | React Native (Expo) | 若将来做安卓可复用;JS 生态 | Live Activity/Widget 仍须 Swift;安卓暂缓→收益归零 | ⭐⭐ |
| | Flutter | 自绘引擎动效一致;将来安卓 | 同上 UI 仍须 Swift;Dart 重写;团队新语言 | ⭐⭐ |
| | Capacitor 套壳 | **复用 70%+ PWA**;起步最快 | 质感=网页天花板;Haptics/LA 受限;做两遍 | ⭐⭐(仅限临时验证) |
| **后端** | **延续 Cloudflare(Pages Functions + D1 + R2 + Workers AI)** | REST 已就绪;零迁移;scale-to-zero 省钱 | D1 单库 10GB 硬顶;单点依赖 | ⭐⭐⭐⭐⭐ |
| **推送** | **APNs(原生)** + Live Activity token push | 锁屏强提醒;灵动岛;免费 | 需自建 APNs JWT 签发(Cloudflare Worker 可做) | ⭐⭐⭐⭐⭐ |
| **账号(首发)** | **手机号(自有)+ Sign in with Apple** | 4.8 合规稳;换机不丢;隐私友好 | 需短信通道(阿里云/Twilio) | ⭐⭐⭐⭐⭐ |
| | 加微信登录 | 中国区转化 | **一旦加第三方登录,4.8 强制必须同时有 SIWA** | ⭐⭐⭐(中国区再上) |
| **本地存储** | **SwiftData 本地副本 + R2 音频** | 离线可用;呼应"数据永不丢失";R2 延续 | SwiftData iOS 17+;同步逻辑要写 | ⭐⭐⭐⭐⭐ |
| **端到端加密** | **首发不做,预留字段** | 降复杂度;AI 转写/僚机需明文 | 情侣数据敏感,是长期信任卖点 | ⭐⭐⭐(见 §6.3,分层做) |
| **语音转写** | **云端 Whisper 延续 + 端上 Speech 兜底** | 复用现链路;端上省钱/离线 | Whisper 出繁体(已知);端上中文有上限 | ⭐⭐⭐⭐ |
| **开发方式** | **Claude Code 主 + 设计工具(仪式时刻)辅** | 规格书已就绪;迭代快 | 高质感仪式需人把关视觉 | ⭐⭐⭐⭐⭐ |
| **域名** | **正式域名 + Associated Domains** | Universal Links 邀请码 deeplink;品牌 | 需购域名 + apple-app-site-association | ⭐⭐⭐⭐⭐ |

---

## 3. 核心问题二:Claude Code 做,还是设计工具做?

### 3.1 两条路径评估

**(a) Claude Code agentic 直接写 SwiftUI 工程**
- 优:念念的动效已被 `MOTION_DESIGN_PATTERNS.md` §4.5 沉淀成 **Motion Tokens 规格书**(3 条 easing、4 档 duration、stagger、位移全定死),§4.1–4.4 逐条给了"用在哪、参数多少、为什么"。**这不是创意 brief,这是一份可直接翻译成 SwiftUI 的实现说明书**——Claude Code 把它落成 `Animation` 常量与 `ViewModifier` 是机械翻译,不是再创作。API 契约、话术包、视觉 token 同理。
- 优:结构性工作(网络层、SwiftData 模型、APNs、状态机、五模式主题系统)是 Claude Code 的强项,可端到端产出可编译工程。
- 劣:**"办妥→回响仪式"这类需要审美判断的高铺张时刻**,纯文字规格喂 AI 容易出"能跑但没灵魂"的版本——这里需要人眼在真实设备上反复调。

**(b) 设计工具优先(Figma→SwiftUI / AI 设计生成)**
- 优:视觉/动效**先看到再定稿**,适合情侣产品对"质感"的高要求;`huashu-design` 这类技能可用 HTML 原生高保真原型快速探索仪式动画的多个变体(60fps 预览、导出参考视频)。
- 劣:Figma→SwiftUI 的自动导出(如 Figma Dev Mode、第三方插件)产出的是"能看不能维护"的布局代码,**动效和状态逻辑仍要重写**;设计工具擅长"静态屏 + 转场演示",不擅长"三态流转锁重复点击"这类正确性逻辑。

### 3.2 推荐:混合工作流(职责按"是否需要审美判断"切分)

> **主路径 Claude Code,把设计工具用在刀刃上(仅"唯一值得铺张的那一处")。**

具体分工:

| 阶段 | 谁做 | 产出 |
|---|---|---|
| 1. 视觉方向 / 仪式探索 | **设计工具(HTML 高保真 / Figma)** | 「办妥→回响仪式」的 3 个变体真实预览(模糊上浮 900ms + 卡片翻面 180°,`MOTION_DESIGN_PATTERNS.md` §4.1-B),人眼选定稿 |
| 2. Design Tokens 固化 | 从 `BRAND.md` + Motion Tokens 抽 | Swift `enum` / `Animation` 常量文件 |
| 3. 骨架工程 | **Claude Code** | 网络层、SwiftData、APNs、五模式主题、三态状态机(含锁重复点击) |
| 4. 常规界面 | **Claude Code** | 消息流、输入条、录音、设置——按规格书直译 SwiftUI |
| 5. 仪式时刻落地 | **Claude Code 实现 + 人在真机调** | 把定稿的仪式翻成 SwiftUI,真机反复调曲线 |
| 6. 无障碍/降级 | **Claude Code** | `prefers-reduced-motion` 对应的 `.accessibilityReduceMotion` 全局降级(§4.1-E,价值观红线,ADHD 执行方) |

**一句话:结构与常规界面交给 Claude Code(有规格书,机械翻译);唯一的高铺张仪式先用设计工具看板定稿再由 Claude Code 落地。** 别把整个工程都塞给设计工具(维护性差),也别指望纯文字规格喂出有灵魂的仪式动画。

---

## 4. 前端技术栈(带选型理由)

| 层 | 选型 | 理由 / 对应念念需求 |
|---|---|---|
| UI 框架 | **SwiftUI**(iOS 17+ 为基线,兼容 16) | 声明式 + 系统弹簧动画;`@Environment` 天然支持五模式主题热切 |
| 动效 | **SwiftUI 原生动画**(`.spring`/`.snappy`)+ 必要时 **Rive**(复杂矢量动效) | Motion Tokens 已定;Rive 比 Lottie 更适合"可交互 + 状态驱动"的办妥仪式,体积小、运行时轻(仅在仪式时刻用,主界面不用) |
| Live Activity / 灵动岛 | **ActivityKit + WidgetKit** | 锁屏"这条念念 TA 在办中"、纪念日 D-Day 倒数;Apple 官方最爱推的 featuring 用例(`KOREA_MARKET_DEEPDIVE.md` §7) |
| 桌面/锁屏组件 | **WidgetKit** | "今天有 N 件事有着落"轻量组件;纪念日组件 |
| 触感 | **Core Haptics** | 按住说话按下/松手、办妥的成功触感;自定义 AHAP 波形(唯原生可做) |
| 录音 | **AVFoundation / AVAudioEngine** | 取实时 PCM 电平驱动"暖珊瑚双圈波纹"(复用 logo 语言,§4.1-C);录 16kHz 单声道对齐硬件协议(`HARDWARE_API.md` §3) |
| 音频播放 | **AVAudioPlayer** + 波形 | PRD F-11 语音条波形/倍速 |
| 本地持久化 | **SwiftData**(iOS 17+;iOS 16 退 Core Data) | "数据永不丢失"的客户端地基:本地副本 + 离线可读可写,联网增量同步 |
| 网络 | **URLSession + async/await** + 轻量 client | 直连现有 REST;无需引入重型库 |
| 无障碍 | **Reduce Motion / Dynamic Type** | §4.1-E 价值观红线;E 模式适老字号×1.25 天然对齐 Dynamic Type |
| "她的话"字体分层 | 系统圆润无衬线 + 一款**有人味衬线**(如霞鹜文楷,注意授权) | §4.1-F:系统话/她的话视觉分层=产品叙事 |

**关于 Reanimated 类比**:念念不是 RN 工程,不需要 Reanimated;SwiftUI 的隐式动画 + `withAnimation` 就是原生等价物,且无 JS 桥损耗。**关于 Lottie/Rive**:仅用于"办妥仪式"一处复杂动效,主界面所有微交互用 SwiftUI 原生实现——这与 §4.0"日常工具动效≤300ms、只有仪式可铺张"的判据一致,不为炫技引入运行时。

---

## 5. 后端:现有 Cloudflare 栈能否直接给原生 App 用?

### 5.1 结论:能,REST 已就绪,原生 App 直接调,零迁移

`functions/api/[[path]].js` 已是标准 REST + Bearer token 鉴权(`auth()` 读 `Authorization: Bearer`)。原生 App 用 URLSession 携带 token 调用即可,**后端一行不改就能服务原生客户端**。已有端点覆盖:结对(`/space`、`/join`)、消息流(`/items` GET/POST、`/voice`、`/items/:id` PATCH)、音频(`/audio/*`)、AI 僚机方案页(`/page/:id`、`/pub/*` 签名分享)、硬件通道(`/ingest`)。

### 5.2 要补的两块(原生化必须)

1. **APNs 推送**(§7)——现有是"浏览器通知 + 12s 轮询"(README、PRD F-03),原生必须换 APNs,否则锁屏强提醒无从谈起。
2. **真账号体系**(§8)——现有 `ee_members.token` 是匿名随机 token,换机即丢;原生必须升级为账号。

### 5.3 D1 容量与何时迁移

- **现状够用**:D1 单库上限 **10GB(Workers 付费版,不可提额,Enterprise 也不行)**,免费版 500MB([Cloudflare D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)、[limits](https://developers.cloudflare.com/d1/platform/limits))。念念数据是文本为主(音频在 R2,不占 D1),一条念念约几百字节 + 可能的 `research_html`(方案页 HTML 可能几十 KB——**这是唯一的容量隐患**)。
- **[推理] 触发迁移的信号**:① `research_html` 大量堆积逼近 10GB(缓解:方案页 HTML 移出 D1,存 R2,D1 只留 key);② 单库连接/并发成为瓶颈。届时路径:按空间分库(D1 支持每账号 5 万库)或迁 Postgres(Neon/Supabase)。**首发阶段无需担心**,但**建议 v1 就把 `research_html` 挪到 R2**(见 §9 schema diff),避免大字段拖累 D1。
- **计费模型**:rows read/written + storage,scale-to-zero([同上]);Workers AI Whisper $0.0005/音频分钟(41.14 neurons/分钟),免费额度 10,000 neurons/天 ≈ **每天约 243 分钟音频免费转写**([Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/))——对早期用户量绰绰有余。

---

## 6. 存储、离线与端到端加密

### 6.1 R2 音频:延续

现有 `/voice`、`/ingest` 把原声存 R2(`voice/{space_id}/{uid}.audio`),按空间隔离(`/audio/*` 校验前缀)。原生 App 延续:录音→上传 R2→Whisper 转写→入流。**无需改动。** 原生可额外做:上传前本地留一份(SwiftData/文件),弱网重传,呼应"永不丢失"。

### 6.2 客户端离线副本(SwiftData/Core Data)= "数据不丢失"的客户端地基

- **为什么必须做**:`KOREA_MARKET_DEEPDIVE.md` §1 把"数据永不丢失"定为**韩国市场生死线**(Between 2025-09 弄丢十年照片 = 十年一遇信任真空)。客户端本地副本让"服务端出事时用户本地仍有全量数据",是可对外宣传的可验证承诺("一键完整导出"、"本地也有一份")。
- **方案**:SwiftData 建本地镜像表(spaces/members/items),App 启动读本地秒开,后台增量拉取(`updated_at` 游标)。发消息先写本地(乐观 UI)再同步。冲突策略:服务端 `updated_at` 为准(last-write-wins),三态流转是单调前进(received→doing→done),天然少冲突。
- **导出**:提供"导出我的那一份"(JSON + 音频打包),对齐 PRD §4 红线 2(分手/退出单方可导出自己那份)。

### 6.3 端到端加密(E2EE):首发不做,但要预留,分层取舍

- **诚实的矛盾**:情侣数据敏感,E2EE 是长期信任卖点(日本竞品 COUPPLY 已用 E2EE 当卖点,`GLOBAL_GTM.md` §3.1.1)。**但念念的两个核心功能与 E2EE 直接冲突**:① 云端 Whisper 转写需要明文音频;② AI 僚机出方案需要明文念念内容。**全链路 E2EE = 砍掉 AI 僚机和云端转写**,这是产品核心,不能砍。
- **[推理] 分层方案(建议)**:
  - **传输层**:全程 HTTPS/TLS(Cloudflare 已默认),先保证在途安全。
  - **敏感字段选择性加密**:办妥附言 `note`、纪念日档案这类"不需要 AI 处理"的私密内容,可做客户端加密(密钥派生自结对关系,存 Keychain),服务端存密文。
  - **需 AI 处理的内容**(念念正文、音频)保持服务端可读,但**用完即弃**原则(转写完可考虑不长期留原声、方案生成后音频可过期),并在隐私政策明示。
  - **合规底线**:韩国/日本跨境同意条款必须写明"数据传中国/接收方名称"(`GLOBAL_GTM.md` §3.1.3、`KOREA_MARKET_DEEPDIVE.md` §4);**声纹识别(speaker diarization)明确不做**(韩国刑事红线,§4:违反 5 年以下有期徒刑)。
- **取舍结论**:**首发做 TLS + 敏感字段选择性加密 + 本地副本 + 可导出**,把"数据安全"的营销承诺钉在"永不丢失 + 可导出 + 不做声纹"上(这些是真做得到的);**全链路 E2EE 留作 v2 差异化**,且需重新设计"AI 在端上跑还是放弃部分 AI"。schema 预留 `enc` 标志位(见 §9)。

---

## 7. 推送:APNs 接入方案

### 7.1 从 Web 通知 + 轮询 → APNs

现状(README/PRD F-03):浏览器通知 + 12s 轮询,PWA 加主屏才有锁屏推送。原生必须换 **APNs**:

- **常规推送**:念念送达、回响仪式(PRD F-01)、递进提醒(F-04)。iOS App 注册 remote notification 拿 device token → 上报后端 → 后端存 `ee_push_tokens`。
- **发送方**:Cloudflare Worker/Pages Function 用 **APNs Provider API(HTTP/2 + JWT p8 密钥)** 直接发。Workers 环境可用 Web Crypto 签 ES256 JWT,无需第三方 SDK。**APNs 本身免费**。
- **分级遵守 PRD F-02**:勿扰时段不推、轻念念不推、合并摘要推送——这套逻辑放后端,APNs 只是运力。

### 7.2 Live Activity 推送

- App 起 Live Activity 时 ActivityKit 拿一个**专属 push token**(与 device token 不同,且**会在生命周期内变化,须持续上报、旧的失效**,[Apple 文档](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications))。
- 后端用 `pushType: token`(iOS 16.1+)推更新;**iOS 17.2+ 支持 push-to-start**(用户没开 App 也能由服务端拉起 Live Activity)。
- 用例:纪念日 D-Day 灵动岛倒数、"TA 正在办这条念念"的实时状态条。

### 7.3 要点

- **APNs 环境**:开发用 sandbox、生产用 production,token 需区分环境存(`ee_push_tokens.env`)。
- **p8 密钥**:AuthKey 走 Pages secret,**绝不进代码/日志**(全局宪法红线)。
- **降级**:APNs 失败保留轮询兜底(PRD F-03 验收:订阅失败优雅降级),但周期可放宽(原生有 APNs 后不再需要 12s)。

---

## 8. 账号体系

### 8.1 现状与硬约束

- **现状**:免注册,`ee_members.token`(`crypto.randomUUID()`)= 唯一身份,存客户端。**换机即丢、无法多设备、无法找回**——原生 App 必须升级。
- **App Store 4.8 硬约束(已核实)**:**只有当你提供第三方社交登录**(微信/Google/Facebook 等)时,才**强制**同时提供 Sign in with Apple(或等效隐私登录);**若只做自有登录(手机号/邮箱),不强制 SIWA**([Apple 审核指南 4.8](https://developer.apple.com/app-store/review/guidelines/)、[WorkOS 2025 解读](https://workos.com/blog/apple-app-store-authentication-sign-in-with-apple-2025))。

### 8.2 推荐:分阶段

| 阶段 | 登录方式 | 4.8 合规 | 理由 |
|---|---|---|---|
| **首发(海外/TestFlight)** | **Sign in with Apple + 手机号(自有)** | ✅ SIWA 天然满足;手机号是自有登录 | 换机不丢、隐私友好、审核最稳;日韩用户接受度高 |
| **中国区上架时** | 加 **手机号为主 + 微信登录** | ⚠️ **一旦加微信(第三方),必须同时保留 SIWA** | 中国区转化靠微信;但别为省事砍 SIWA,会被 4.8 打回 |

- **手机号短信**:海外 Twilio / 国内阿里云短信 [推理,需选型]。
- **不做**:声纹识别做身份(韩国刑事红线,§4)。

### 8.3 邀请码结对逻辑:完整保留

现有 `/space`(建小家发 `NN-XXXX` 邀请码)、`/join`(凭码加入)逻辑**不变**,只是把"生成匿名 member token"改为"在已登录 account 下创建 member"。一个 account 可属于多个 space(PRD F-10 多小家、一对多结对天然支持)。**邀请码 + Universal Links** 组合成 deeplink(§10):点链接直接拉起 App 到加入页,没装则去 App Store。

### 8.4 免注册 → 账号的迁移(**最高风险,见 §11**)

现有线上用户全是匿名 token。迁移设计:
- App 首次启动检测本地是否有旧 `ee_auth` token(网页版 localStorage 里的);有则**引导"绑定账号以防丢失"**,把旧 member 挂到新建 account 下(旧 token 继续有效,新增 `account_id` 外键)。
- **向后兼容**:旧 token 永不失效(现有网页/硬件 `dev_` token 都还在用);account 是**叠加**在 member 之上的一层,不是替换。
- **数据不动**:member/items/spaces 全保留,只加 `account_id` 关联。这是"仅加列/加表"级演进,符合 PRD §5.3 schema 纪律。

---

## 9. Schema 演进 diff(现有 → 目标)

> 原则(PRD §5.3 + 全局宪法红线):**优先"仅加列/加表",绝不破坏现有数据;加表/迁移属红线操作,须用户拍板。** 下列为建议方案,**执行前需用户确认**(§13 未决问题)。

### 9.1 现有(schema.sql v1.0.0)

`ee_spaces` / `ee_members` / `ee_items` / `ee_devices`(见 `schema.sql`)。

### 9.2 目标演进(schema v1.1.0,全部向后兼容)

```sql
-- ============ 新增表 1:真账号(叠加在 member 之上,不替换)============
CREATE TABLE IF NOT EXISTS ee_accounts (
  id            TEXT PRIMARY KEY,
  apple_sub     TEXT UNIQUE,          -- Sign in with Apple 的稳定用户标识(可空)
  phone         TEXT UNIQUE,          -- 手机号登录(可空,E.164)
  wechat_openid TEXT UNIQUE,          -- 中国区微信(可空,后置)
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL
);

-- ============ 新增表 2:推送 token(device token + Live Activity token)============
CREATE TABLE IF NOT EXISTS ee_push_tokens (
  id         TEXT PRIMARY KEY,
  member_id  TEXT NOT NULL,
  apns_token TEXT NOT NULL,           -- 设备推送 token
  la_token   TEXT,                    -- Live Activity 专属 token(会变,须更新)
  env        TEXT NOT NULL DEFAULT 'prod',  -- sandbox | prod
  platform   TEXT NOT NULL DEFAULT 'ios',
  updated_at INTEGER NOT NULL,
  UNIQUE(member_id, apns_token, env)
);
CREATE INDEX IF NOT EXISTS idx_ee_push_member ON ee_push_tokens(member_id);

-- ============ 新增表 3:纪念日 / 周期念念(PRD F-06)============
CREATE TABLE IF NOT EXISTS ee_anniversaries (
  id         TEXT PRIMARY KEY,
  space_id   TEXT NOT NULL,
  title      TEXT NOT NULL,
  recur_rule TEXT NOT NULL,           -- yearly | monthly | 100day | custom:...
  next_at    INTEGER NOT NULL,        -- 下次触发时间
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ee_anniv_space ON ee_anniversaries(space_id, next_at);

-- ============ ee_members:加列(账号关联 + 勿扰 + 设置)============
ALTER TABLE ee_members ADD COLUMN account_id TEXT;          -- 关联 ee_accounts(可空,旧用户可后绑)
ALTER TABLE ee_members ADD COLUMN dnd_start  INTEGER;       -- 勿扰起(分钟数 0-1439,PRD F-02)
ALTER TABLE ee_members ADD COLUMN dnd_end    INTEGER;       -- 勿扰止
ALTER TABLE ee_members ADD COLUMN settings   TEXT;          -- JSON:模式偏好/字号/其他(设备级人格仍可存客户端)

-- ============ ee_items:加列(PRD F-02/F-04/F-05/F-07 早已预告)============
ALTER TABLE ee_items ADD COLUMN priority    TEXT NOT NULL DEFAULT 'normal';  -- light|normal|urgent(F-02)
ALTER TABLE ee_items ADD COLUMN tag         TEXT;            -- 急事/日常/心愿/纪念日/轻念念(F-05)
ALTER TABLE ee_items ADD COLUMN deadline    INTEGER;         -- 硬 deadline(F-04)
ALTER TABLE ee_items ADD COLUMN remind_plan TEXT;            -- 递进提醒计划 JSON(F-04)
ALTER TABLE ee_items ADD COLUMN reply_to    TEXT;            -- 关联原念念(F-07 回响给 TA)
ALTER TABLE ee_items ADD COLUMN recur_id    TEXT;            -- 关联 ee_anniversaries(F-06)
ALTER TABLE ee_items ADD COLUMN deleted_at  INTEGER;         -- 软删除(永不物理删,呼应"数据不丢失")
ALTER TABLE ee_items ADD COLUMN enc         INTEGER NOT NULL DEFAULT 0;      -- 0=明文 1=客户端加密(E2EE 预留,§6.3)
ALTER TABLE ee_items ADD COLUMN research_key TEXT;           -- 方案页 HTML 移 R2 后的 key(见下)

-- ============ D1 减负:research_html 移出 D1 → R2 ============
-- 现状 ee_items.research_html 直接存完整 HTML(可能几十 KB/条),是 D1 10GB 硬顶的唯一隐患。
-- 演进:新方案页写入 R2(key 存 research_key),ee_items.research_html 逐步弃用(保留读兼容,不再写)。
-- 迁移可后台异步:把存量 research_html 搬到 R2 并回填 research_key,再清空大字段。
```

### 9.3 演进要点

- **全部 `ALTER ... ADD COLUMN` + `CREATE TABLE IF NOT EXISTS`**,不改现有列、不删数据 → 现有网页/硬件客户端零感知,可平滑并存。
- **`account_id` 可空**:旧匿名用户不强制迁移,可在 App 内"绑定以防丢失"时后补(§8.4)。
- **`deleted_at` 软删除**:对齐"数据永不丢失",且 PRD §4 红线 2(办砸/过期不进汇总,但数据本身不物理删,单方可导出)。
- **`enc` 预留**:E2EE 分层落地时用,首发恒为 0。
- **`research_html`→R2**:这是**唯一建议在原生化同期就做的减负动作**,防大字段拖垮 D1。
- **执行纪律**:以上任一 `ALTER`/新表在生产 D1 落地前**须用户拍板**(全局宪法:schema 变更红线)。

---

## 10. 域名与深链

- **现状**:`*.pages.dev` + `rabbitholes.hero1900.com`(memory: project-deploy-setup)。原生 App 需要**正式自有域名** + **Associated Domains**(`applinks:yourdomain`)才能用 **Universal Links**。
- **用途**:邀请码结对 deeplink(点 `https://域名/join/NN-XXXX` 直接拉起 App 到加入页,未装则落地页引导下载 App Store);AI 僚机方案页分享链接(现有 `/pub/*` 签名链接可挂在自有域名下)。
- **要做**:① 买域名;② 域名根放 `/.well-known/apple-app-site-association`(JSON,声明 appID + 路径);③ Xcode 开 Associated Domains capability;④ SwiftUI 处理 `onOpenURL`。
- **出海关联**:App Store 支持一个 App 记录按 locale 设不同显示名(`GLOBAL_GTM.md` §2.2),域名/deeplink 一套通吃四国,只是落地页文案本地化。

---

## 11. 风险清单(按严重度排序,每条给缓解)

| # | 风险 | 严重度 | 说明 | 缓解 |
|---|---|---|---|---|
| R1 | **免注册→账号迁移丢数据** | 🔴 生死级 | 现有用户全是匿名 token,迁移做砸=丢用户历史=踩中韩国"数据永不丢失"生死线(`KOREA_MARKET_DEEPDIVE.md` §1:重演 Between 事故=出局+营收3%罚款) | account 叠加不替换、旧 token 永久有效、迁移前后本地副本双保险、灰度上线、迁移全程可回滚 |
| R2 | **中国大陆 ICP 备案** | 🔴 高 | [2024 起大陆应用商店强制 App 备案,需大陆法人主体或本地合作方](https://appinchina.co/blog/the-complete-guide-to-chinas-mobile-app-filing/);无主体无法上中国区 | 首发走海外区(日/韩/美,`GLOBAL_GTM.md` 首发日本)绕开;中国区上架前落大陆主体或找备案合作方 |
| R3 | **Cloudflare 单点依赖 + D1 10GB 硬顶** | 🟠 中高 | 全栈押 Cloudflare;[D1 单库 10GB 不可提额](https://developers.cloudflare.com/d1/platform/pricing/);`research_html` 大字段是隐患 | v1 就把方案页 HTML 移 R2(§9);监控 D1 用量;预研分库/迁 Postgres 路径 |
| R4 | **声纹识别刑事红线** | 🔴 高(合规) | 韩国 speaker diarization=민감정보,[违反 5 年以下有期徒刑或 5 千万韩元](`KOREA_MARKET_DEEPDIVE.md` §4) | 明确只做 ASR 转文字,**第一版起就不做说话人识别**;schema 层不设声纹字段 |
| R5 | **跨境数据传输合规** | 🔴 高(合规) | 日 APPI/韩 PIPA 要求跨境同意须写明"传中国/接收方名";阿里/Temu 已因此被罚(`GLOBAL_GTM.md` §3.1.3) | 数据落地不进中国(或明确告知同意);隐私政策写明目的地国名;区分存储 |
| R6 | **App Store 审核:情侣数据/UGC/订阅** | 🟠 中 | UGC 需举报/屏蔽/拉黑机制(4.3/1.2);订阅需清晰披露;情侣私密数据需隐私说明;4.8 登录合规 | 内置举报/拉黑;订阅走标准 IAP + 清晰条款;隐私营养标签如实填;登录方案按 §8 |
| R7 | **Whisper 中文出繁体** | 🟠 中 | 代码已注明("中文常输出繁体",`functions/api/[[path]].js:22-24`);繁→简未做 | runner 侧或后端加繁→简转换(opencc 类);或端上 Speech 兜底/替换;评估 SenseVoice(CJK 更强,[benchmark](https://whispernotes.app/blog/sensevoice-fastest-cjk-transcription)) |
| R8 | **韩国性别框架(셔틀앱)** | 🟠 中(市场) | "女指派男执行"被男性社区截图=24h 成 meme(GS25 判例,`KOREA_MARKET_DEEPDIVE.md` §3) | UI 双向对称、话术改"约定/共创"、绝不做完成度对比/KPI(与 PRD §4 三红线一致);韩文文案本地人写 + 红队测"这一屏会怎么被截图" |
| R9 | **PWA 与原生双前端并存** | 🟡 中低 | 一段时间两套前端 | 后端同一套;PWA 降级为轻量入口/落地页 |
| R10 | **SwiftData iOS 17+ 门槛** | 🟡 低 | SwiftData 需 iOS 17;iOS 16 用户 | iOS 16 退 Core Data;或基线定 iOS 17(2026 年覆盖率已高)[推理] |
| R11 | **五模式主题 × 原生工作量** | 🟡 低 | 5 套视觉 token + 话术包移植 | `MODE_SPEC.md` 已是 CSS 变量组 + 话术总表,直译 SwiftUI Design Token;70% 底盘不动 |

---

## 12. 从现在到 TestFlight 的里程碑清单(估时诚实标注为估算)

> **[估算] 所有工期为单人 + Claude Code 协作的粗估,未含审核往返与不可控等待;实际以真机联调为准。**

| 阶段 | 产出 | 关键项 | [估算]工期 |
|---|---|---|---|
| **M0 立项** | 可编译空壳 + 账号($99/年 [Apple 官方](https://developer.apple.com/programs/whats-included/))+ 域名 + Bundle ID + 证书 | Apple Developer 注册、买域名、AASA 文件、Xcode 工程骨架 | 2–4 天 |
| **M1 网络层 + 数据模型** | 连通现有 REST、SwiftData 本地副本、登录态 | URLSession client、SwiftData 镜像、旧 token 兼容读 | 3–5 天 |
| **M2 核心界面(消息流三态)** | 消息流、发文字/语音、三态流转(锁重复点击) | AVFoundation 录音 + 波纹(Core Haptics)、状态机(§4.1-D) | 5–8 天 |
| **M3 账号 + 结对** | SIWA + 手机号登录、邀请码结对、Universal Links 深链、免注册迁移 | `ee_accounts`/`account_id` 后端加、迁移灰度(R1 重点) | 5–8 天 |
| **M4 推送(APNs)** | 锁屏推送、分级/勿扰(PRD F-02)、点击直达 | APNs JWT 签发 Worker、`ee_push_tokens`、分级逻辑 | 4–6 天 |
| **M5 办妥仪式 + AI 僚机** | 回响仪式(模糊上浮+翻面)、AI 方案页(WebView 载现有 HTML)+ 一键回响 | 设计工具定稿→SwiftUI 落地(§3)、真机调曲线 | 4–6 天 |
| **M6 五模式主题** | 5 套皮肤 + 话术包切换、适老/安全阀 | Design Token 系统、`MODE_SPEC.md` 直译 | 3–5 天 |
| **M7 Live Activity + Widget** | 灵动岛"在办中"、纪念日 D-Day 组件 | ActivityKit + WidgetKit、LA push token | 4–7 天 |
| **M8 打磨 + 合规 + 冒烟** | 无障碍降级、举报/拉黑、隐私标签、繁→简、订阅条款、真机全流程冒烟 | R6/R7 缓解项、`prefers-reduced-motion`(§4.1-E) | 4–6 天 |
| **M9 TestFlight** | 上传构建、内部/外部测试、审核往返 | App Store Connect、隐私问卷、审核 | 2–5 天 + 审核等待 |

> **[估算] 合计约 6–9 周达到 TestFlight**(单人 + Claude Code,连续投入)。Live Activity/Widget(M7)与五模式(M6)可视首发范围裁剪进 TF 后迭代——**MVP 版 TestFlight 可压到约 4–5 周**(M0–M5 + 精简 M8),把 M6/M7 放到 TF 后。

---

## 13. 未决问题清单(需用户拍板)

| # | 问题 | 选项 | 建议 |
|---|---|---|---|
| Q1 | **正式域名用哪个?** | `.com` 收购 / `.io`/`.co` / 复用现有 hero1900 子域 | 出海需干净域名(`GLOBAL_GTM.md`:pinkypact.com 已被占,可用 .io);先定一个可挂 AASA 的自有域名 |
| Q2 | **首发账号方式** | ① 仅 SIWA+手机号 ② 加微信 | 首发①(海外,4.8 最稳);中国区再加微信(且必须同时留 SIWA) |
| Q3 | **是否上端到端加密** | 首发不做 / 敏感字段选择性 / 全链路 | §6.3:首发 TLS+选择性+本地副本+可导出;全 E2EE 留 v2(会砍 AI) |
| Q4 | **自建 vs 继续 Cloudflare** | 继续 Cloudflare / 部分迁移 | 继续(零迁移);仅把 `research_html` 移 R2 减负 D1 |
| Q5 | **首发区域 + 是否做中国区** | 海外先(日/韩/美)/ 中国区同步 | 海外先(绕开 ICP 备案 R2);中国区待大陆主体就绪 |
| Q6 | **iOS 基线版本** | iOS 16 / iOS 17(SwiftData) | [推理] 建议 iOS 17(SwiftData + LA 完整),iOS 16 视用户盘再定 |
| Q7 | **TestFlight MVP 范围** | 全量(含 LA/五模式)/ 精简(M0–M5) | 精简先出 TF 验证留存(男方 Aha),LA/五模式 TF 后迭代 |
| Q8 | **schema 演进执行授权** | §9 的 ALTER/新表是否批准落生产 D1 | 红线操作,需你明确授权后再执行 |

---

## 附:关键来源

- Apple 审核指南 4.8(登录):https://developer.apple.com/app-store/review/guidelines/ ·  https://workos.com/blog/apple-app-store-authentication-sign-in-with-apple-2025
- Apple Developer Program $99/年:https://developer.apple.com/programs/whats-included/
- Live Activity / ActivityKit 推送:https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications
- Cloudflare D1 定价/限制(单库 10GB):https://developers.cloudflare.com/d1/platform/pricing/ ·  https://developers.cloudflare.com/d1/platform/limits
- Workers AI / Whisper 定价:https://developers.cloudflare.com/workers-ai/platform/pricing/
- RN/Expo Live Activity(UI 仍须 Swift):https://github.com/software-mansion-labs/expo-live-activity
- Flutter Live Activity(UI 必须 Swift 写):https://pub.dev/packages/live_activities
- Capacitor Live Activity(无官方支持):https://medium.com/@kisimedia/ios-live-activities-in-capacitor-a-practical-plugin-to-make-it-work-9c85d40e35e1
- 中国 App ICP 备案(2024 强制):https://appinchina.co/blog/the-complete-guide-to-chinas-mobile-app-filing/
- iOS 端上语音(SpeechAnalyzer/SFSpeechRecognizer/SenseVoice CJK):https://get-inscribe.com/blog/apple-speech-api-benchmark.html ·  https://whispernotes.app/blog/sensevoice-fastest-cjk-transcription
- 项目内部依据:`docs/research/MOTION_DESIGN_PATTERNS.md`(动效范式/Motion Tokens)、`docs/research/GLOBAL_GTM.md`、`docs/research/KOREA_MARKET_DEEPDIVE.md`、`docs/PRD.md`、`docs/MODE_SPEC.md`、`BRAND.md`、`schema.sql`、`functions/api/[[path]].js`、`docs/HARDWARE_API.md`

## 12bis. 检索边界声明

- App Store 4.8、Apple Developer 费用、Cloudflare D1/Workers AI 定价、Live Activity 推送机制、RN/Flutter/Capacitor 的 Live Activity 支持现状、中国 ICP 备案 → **均为 2025–2026 一手来源实测,附链接**。
- iOS 端上语音 Chinese 精度对比 → 有 benchmark 来源,但**中文口语建任务的真实 WER 未做本项目实测**,标注为参考。
- 所有 **[估算]/[推理]** 项(工期、短信选型、iOS 基线、E2EE 分层、商标/备案细节)→ 未经本项目实测或需第三方确认,已逐处标注,不冒充实据。
