---
name: platform static deploy (Option A)
description: Why the root platform app's Vite base differs between dev and build, and how it deploys standalone.
---

# Platform standalone static deployment (Option A)

The marketing site (`creatoros-site/`) and the root platform app deploy as
**two separate Replit apps**. One repl = one `[deployment]`, so they cannot
share a deployment.

## The dev-vs-build base invariant
- Vite `base` in root `vite.config.ts` is **conditional**: `/platform/` for dev
  (`command === 'serve'`), `/` for production (`command === 'build'`).
- React Router `basename` stays `/platform` in BOTH cases (`src/app/routes.ts`).

**Why:** In dev the platform is served behind the `creatoros-site` dev proxy at
`/platform/*`, so assets must resolve under `/platform/`. In production it is a
standalone static app at the domain root, so assets must resolve under `/` while
routes stay under `/platform/*` (served via SPA fallback to `index.html`).

**How to apply:** Never make `base` a single constant — that breaks either the
dev proxy or the standalone build. If you touch routing, keep `basename` and
`base` decoupled: `basename` = route prefix, `base` = asset URL prefix.

## Marketing site link to platform
- Marketing site links to the platform via build-time `VITE_PLATFORM_URL`
  (consumed by `getPlatformUrl()` in `creatoros-site/src/config/site.ts`).
- `VITE_*` is inlined at build → rebuild the marketing site whenever it changes.
- Scope `VITE_PLATFORM_URL` to the **production** environment only, NOT shared.
  **Why:** dev must leave it unset so `getPlatformUrl()` falls back to `/platform`
  and uses the Vite dev proxy to localhost:3000. A shared value would send dev
  "Open Module" links to the live site and bypass the local platform.
- Value: `https://creatorospage.replit.app/platform` (this repl = platform app).

## Deployment config
- Root `.replit` `[deployment]`: `static`, build `npm run build`, publicDir `dist`.
- Relies on Replit static SPA fallback to serve `index.html` for `/platform/*`
  direct reloads.
