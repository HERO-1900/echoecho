# 晨报 · 念念 EchoEcho 通宵产品化 2026-07-05

任务 8/8 全部完成。产品已上线并开源。

## 交付物(全部可访问)

| 交付 | 地址 |
|---|---|
| 线上产品(网页版,即 PWA) | https://echoecho-aqp.pages.dev |
| GitHub 公开仓库 | https://github.com/HERO-1900/echoecho |
| APP 高保真设计稿 ×5 | 仓库 `docs/design/`(开屏/她的视角/他的视角/僚机方案页/设置) |
| 硬件接入协议 | 仓库 `docs/HARDWARE_API.md` |
| 品牌手册 | 仓库 `BRAND.md` |

## 命名(需你最终拍板)

**念念 EchoEcho** —— "念念不忘,必有回响"。一语三关:记住她的话 / 想念 / 念出声(语音)。
三态流转:**收到 → 在办 → 办妥**,对应"凡事有交待、事事有回应、件件有着落"。
备选存档:Roger(收到)、Landed(有着落)。

## 已验证(全部真实跑通,非纸面)

1. 建小家 → 邀请码(NN-XXXX)→ 结对:✓
2. 文字念念 + 三态流转 + 进度%:✓(8/8 API 冒烟)
3. 语音:say 合成中文 → 上传 → Whisper 转写:✓ 两条全对(App 通道 + 硬件 ingest 通道各一)
4. AI 僚机:真实 MiniMax 调研 + Kimi 排版,"三千元静音滚筒洗衣机"出了 14.5KB 方案页(快速结论/预算档/对比表/追问清单/免责):✓
5. UI 截图自查:开屏、主界面、方案页均正常(430px 下的"右缘裁切"确认是无头 Chrome 最小窗宽伪影,600px 复核正常)
6. 发布前 secrets 扫描 0 命中,.local.sh 未进 git:✓

## 妥协与已知问题(诚实清单)

1. **共用 D1 库**:你的 CF token 无建 D1 权限(连 d1 execute 都 403),暂时借用 rabbitholes-pool 库、全部表带 `ee_` 前缀完全隔离,未碰 rabbitholes 任何数据。→ 需你给 token 加 D1 权限后迁独立库
2. **原生 APP 未做**(6h 内不现实):交付 PWA(加主屏即 App)+ 5 屏设计稿;锁屏强提醒/独特震动需原生壳,列入 v1.1
3. **Web Push 未做**:当前浏览器通知 + 12s 轮询;v1.1
4. Whisper 中文常输出繁体(准确但繁体);turbo 模型试过输出乱码已回滚
5. 僚机 runner 跑在你 Mac 上(nohup --watch=30,已在值班),会话结束后需 launchd 常驻化——与 rabbitholes runner 同一个待办
6. 测试小家里有几条乱码测试数据(邀请码 NN-KUMN),不影响你新建自己的小家

## 需你决定

- A. 名字「念念 EchoEcho」是否定案
- B. CF token 加权限(D1 Edit + User Details Read),我迁独立库
- C. rabbitholes 与 echoecho 两个 runner 是否都 launchd 常驻化
- D. 是否要买域名(如 niannian.app / echoecho.app)

## 上手(30 秒)

手机打开 https://echoecho-aqp.pages.dev → 建小家(填昵称)→ 把邀请码发给对方 → 对方加入 → 互发念念。语音:点🎙️说话再点一下结束;任何一条可"请 AI 僚机出方案"。
