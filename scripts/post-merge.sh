#!/bin/bash
set -e

echo "[post-merge] Installing dependencies..."
npm install --prefer-offline 2>&1 || npm install 2>&1

echo "[post-merge] Pushing DB schema (if drizzle config present)..."
if [ -f "drizzle.config.ts" ]; then
  npm run db:push --if-present 2>&1 || true
fi

echo "[post-merge] Done."
