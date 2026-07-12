# OFFLINE_PLAN 2026-07-05 · 通宵任务:双向情侣备忘录产品化

## 任务(用户原话摘要)
把 rabbitholes 的积累转化为通用 C 端产品,发布到 GitHub:
- 定位:帮男生记住女朋友说的话 / 让男朋友记住你说的话
- Slogan:事事有回应,句句有回响
- 交付:APP 设计(交互/登录/匹配)、网页版开发、AI 自动调研迁移、硬件接口预留、起名(中文+英文)
- 时限:6 小时,明早验收

## 命名(H0,先定再干)
- 主推:中文「**念念**」/ 英文「**EchoEcho**」——"念念不忘,必有回响"
- 备选:「回声收到 Roger」「有着落 Landed」
- 三态任务流:**收到 → 在办 → 办妥**(对应"凡事有交待、事事有回应、件件有着落")

## 计划(优先级排序,共 8 块)
| # | 内容 | 预算 |
|---|---|---|
| H0 | 命名 + 品牌语言 | 30m |
| H1 | 新仓库脚手架:Cloudflare Pages+D1+R2,配对系统(建空间→邀请码→绑定,支持一对多) | 1.5h |
| H2 | 核心双向消息流:文字+语音录制(MediaRecorder)→ Workers AI Whisper 转写 → 三态流转+进度% | 2h |
| H3 | PWA:manifest/图标/主屏安装/Web Push 提醒基础版 | 1h |
| H4 | AI 僚机:调研引擎迁移为 BYOK 可插拔(开源默认自带 key 配置),自部署用现有引擎 | 1h |
| H5 | 硬件接口预留:POST /api/ingest(设备 token+音频)→ 自动转写入流,写接口文档 | 30m |
| H6 | APP 高保真设计稿(HTML)+ README + Landing + GitHub 公开发布 | 1h |
| H7 | 全链路冒烟 + 截图自查 + 晨报(OVERNIGHT_REPORT) | 30m |

## 诚实边界(明早汇报时会重申)
- 原生 iOS/Android 6h 内不现实 → 交付 **可安装 PWA**(iOS 主屏+推送)+ 完整 APP 设计稿;锁屏强提醒/独特震动需原生壳,列为 v2 路线
- 转写用 Cloudflare Workers AI Whisper(免费额度内)

## 红线(触发即停,等用户)
1. 不碰 rabbitholes 生产数据(Amber/Andy 的问题池/文件/调研)、不 push rabbitholes 仓库
2. 新仓库公开前必须扫 secrets(API key 绝不进代码);key 只进 Pages env
3. 新 GitHub 公开仓库 = 用户本次明确授权,仅限新仓库
4. 不删任何现有文件/目录

## 唤醒机制
ScheduleWakeup 链式,约 30 分钟一轮;每轮先 TaskList 再继续。
结束条件:全部 completed / 触发红线 / 用户回来。
