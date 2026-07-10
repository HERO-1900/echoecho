# 念念 EchoEcho

**事事有回应,句句有回响。** Every word echoes back.

情侣双向备忘录:她说的每句话,自动变成他清单里的一条任务卡;收到 → 在办 → 办妥,句句有着落。还有 **AI 僚机**——她说"想买台洗衣机",AI 自动出一页选购方案。

> 念念不忘,必有回响。名字取自这句话:一条消息 = 一个「念念」。

## 功能

- **结对小家**:建小家 → 邀请码 → TA 加入(也支持一对多:父母、孩子订阅式结对)
- **双向消息流**:文字 / 语音(按一下说话,再按结束),语音自动转文字(Cloudflare Workers AI Whisper)
- **三态有着落**:收到 / 在办(带进度%)/ 办妥(可附一句交待),对应"凡事有交待、事事有回应、件件有着落"
- **AI 僚机**:对任何一条念念一键"出方案",生成完整选购/行动方案页(预算档、对比表、行动清单)
- **PWA**:手机加到主屏即 App,新念念浏览器通知
- **硬件预留**:挂链按键录音直传接口,见 [docs/HARDWARE_API.md](docs/HARDWARE_API.md)

## 技术栈与部署

Cloudflare Pages + Functions + D1 + R2 + Workers AI,单文件 API,零框架前端。

```bash
# 1. 建资源
npx wrangler d1 create echoecho          # 把 database_id 填进 wrangler.toml
npx wrangler r2 bucket create echoecho-audio
npx wrangler pages project create echoecho --production-branch=main

# 2. 部署 + 设 secret + 建表
npx wrangler pages deploy public --project-name=echoecho --branch=main
printf '%s' "你的随机口令" | npx wrangler pages secret put ENGINE_TOKEN --project-name=echoecho
curl -X POST https://你的域名/api/setup -H "x-engine-token: 你的随机口令"
```

> 本仓库当前线上实例因 token 权限限制,临时复用既有 D1 库(表带 `ee_` 前缀),`/api/setup` 即为此设计;你自己部署时按上面走独立库即可。

## AI 僚机 runner(可插拔)

方案生成跑在你自己的机器/服务器上,通过 `ENGINE_TOKEN` 与云端握手:

```bash
# BYOK:任意 OpenAI 兼容端点
export ENGINE_TOKEN=... LLM_BASE=https://api.xxx.com/v1 LLM_KEY=sk-... LLM_MODEL=...
node scripts/research-runner.mjs --watch=30
```

也内置 Kimi(coding 端点)+ MiniMax 双引擎模式(`KIMI_API_KEY` + `MINIMAX_API_KEY`:MiniMax 调研,Kimi 排版)。

## 路线图(v1.1+)

- Web Push 强提醒(锁屏可见、独特震动;当前为浏览器通知 + 12s 轮询)
- 语音转写繁→简转换;iOS/Android 原生壳(强提醒、独特铃声需原生能力)
- 排名与奖励机制(办妥率、回响速度)
- 念念挂链硬件(EchoCharm)

## 设计稿

`docs/design/` 内有 5 屏高保真 HTML 设计稿(开屏 / 她的视角 / 他的视角 / AI 僚机方案页 / 设置),双击即看。

## 安全说明

- 成员凭 Bearer token 访问,音频/方案页按小家隔离
- `ENGINE_TOKEN`、LLM key 全部走环境变量 / Pages secret,不进代码
- 免责:AI 僚机内容由模型生成,具体型号价格请以实际核实为准

---

MIT License · 由 [Claude Code](https://claude.com/claude-code) 在一个通宵内构建 🌙
