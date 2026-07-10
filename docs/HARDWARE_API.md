# 念念 EchoEcho · 硬件接入协议 v1.0.0

面向「念念挂链」等物理载体:**按一下录音,再按一下结束,松手即送达**。
硬件侧只需两步:拿到设备 Token → 把音频 POST 上来。转写、入流、通知全部由云端完成。

## 1. 获取设备 Token(绑定到某个成员)

App 内:设置 → 硬件挂链 → 生成设备 Token(即 `POST /api/devices`,需成员登录态)。
返回形如 `dev_xxxxxxxx-....`,烧录进硬件或配网时写入。一个 Token 绑定一位成员,消息以 TA 的身份发出。

## 2. 上传录音

```
POST https://<your-domain>/api/ingest
Header:  X-Device-Token: dev_xxxx...
Header:  Content-Type: audio/wav        # 也支持 audio/webm、audio/mp4 等
Body:    <音频二进制,≤ 25MB>
```

响应:

```json
{ "ok": true, "id": "c3a49db833d64f57", "transcript": "下周三是我妈生日,提前订个蛋糕。" }
```

云端流程:R2 存原声 → Workers AI Whisper 转写 → 生成一条「念念」(kind=voice)→ 对方端下次同步即收到,转写失败时保底显示"请听原声"。

## 3. 推荐硬件形态(v2 规划,未实现)

- 挂链/磁吸小方块:单键 + LED;长按配网,短按录音
- 蓝牙直连手机 App 代传,或 Wi-Fi 直连 API(ESP32-S3 级即可)
- 录音格式建议 16kHz 16bit 单声道 WAV,兼顾体积与转写率

## 4. 已验证

2026-07-05 冒烟:macOS `say` 合成中文语音经本协议上传,Whisper 转写全对(见 OVERNIGHT_REPORT)。
错误码:403 未知设备 / 410 设备绑定的成员已不存在 / 400 音频为空或超 25MB。
