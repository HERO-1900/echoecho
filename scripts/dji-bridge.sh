#!/bin/zsh
# 念念 · DJI 麦克风硬件桥 v1.0.0
# 用法: ./scripts/dji-bridge.sh [秒数]   —— 从 DJI MIC 录 N 秒(默认 6),自动上传转写为一条念念
# 环境: EE_DEVICE_TOKEN(设备 token,App 设置里生成) EE_BASE(默认生产)
set -e
BASE="${EE_BASE:-https://echoecho-aqp.pages.dev}"
DUR="${1:-6}"
[ -z "$EE_DEVICE_TOKEN" ] && { echo "缺 EE_DEVICE_TOKEN(App→设置→硬件挂链→生成)"; exit 1; }

# 自动找 DJI 设备号(avfoundation 索引会变,不能写死)
IDX=$(ffmpeg -f avfoundation -list_devices true -i "" 2>&1 | grep -i "dji" | grep -oE "\[[0-9]+\]" | tr -d '[]' | head -1)
[ -z "$IDX" ] && { echo "没找到 DJI 麦克风,请检查连接"; exit 1; }
echo "🎙️  DJI MIC(设备 $IDX)录音 ${DUR}s,请说话…"
F=$(mktemp /tmp/dji-XXXX).wav
ffmpeg -hide_banner -loglevel error -f avfoundation -i ":$IDX" -t "$DUR" -ar 16000 -ac 1 -sample_fmt s16 "$F"
echo "⤴️  上传转写…"
curl -sS -X POST "$BASE/api/ingest" -H "x-device-token: $EE_DEVICE_TOKEN" -H 'content-type: audio/wav' --data-binary @"$F" --max-time 120
echo; rm -f "$F"
