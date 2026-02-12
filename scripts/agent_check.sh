#!/usr/bin/env bash
set -euo pipefail

# PR #19 migrates tokens to a git submodule; ensure the working tree has submodules populated
# before build-time CSS imports resolve.
if [ -f .gitmodules ]; then
  git submodule update --init --recursive
fi

echo "▶︎ lint"
npm run lint
echo "▶︎ build"
npm run build
echo "✅ checks ok"
