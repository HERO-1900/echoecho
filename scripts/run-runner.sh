#!/bin/zsh
# 念响 AI 僚机 runner 启动器(launchd 用)。密钥从外部文件读取,本文件不含 secrets。
set -e
set -a
source "/Users/hero/Desktop/API Key 集合/Kimi、Minimax 与 DeepSeek 的 API Key"
source "/Users/hero/Desktop/echoecho/.local.sh"
set +a
export EE_BASE="https://echoecho-aqp.pages.dev"
cd /Users/hero/Desktop/echoecho
exec node scripts/research-runner.mjs --watch=30
