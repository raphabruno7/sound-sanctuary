#!/usr/bin/env bash
set -euo pipefail

echo "=== Async Status ==="
echo ""

echo "Active Sprint(s):"
ls docs/SPRINTS

echo ""

echo "Tasks:"
find agents/tasks -type f | sed 's|agents/tasks/||'

echo ""

echo "Local branches:"
git branch
