#!/usr/bin/env bash
set -euo pipefail
echo "▶︎ lint"
npm run lint
echo "▶︎ build"
npm run build
echo "✅ checks ok"

