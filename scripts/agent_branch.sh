#!/usr/bin/env bash
set -euo pipefail
if [ $# -lt 1 ]; then
  echo "Usage: ./scripts/agent_branch.sh <branch-name>"
  exit 1
fi
BR="$1"
git checkout main
git pull --rebase || true
git checkout -b "$BR"
echo "✅ on branch $BR"

