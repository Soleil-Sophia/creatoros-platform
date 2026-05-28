# CreatorOS Platform

## Overview
CreatorOS is a modular creator platform built with Vite + React. The platform hosts a set of standalone creator tools ("modules") that work independently and together as a system.

## Architecture

### Platform = CreatorOS
### First Module = ContentOS

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                   # RouterProvider entry
│   ├── routes.ts                 # All routes (new + legacy)
│   ├── pages/                    # Marketing/product pages
│   │   ├── home.tsx
│   │   ├── dashboard.tsx
│   │   ├── modules.tsx           # Modules index (uses registry)
│   │   ├── brand-os-product.tsx
│   │   ├── brand-os-app.tsx
│   │   ├── content-os-product.tsx  (legacy)
│   │   ├── content-os-app.tsx      (legacy, wraps GenerateScreen)
│   │   ├── content-os-library.tsx  (legacy, wraps LibraryScreen)
│   │   └── not-found.tsx
│   ├── screens/
│   │   ├── generate.tsx          # GenerateScreen (accepts showTopbar prop)
│   │   └── library.tsx           # LibraryScreen (accepts showTopbar prop)
│   └── components/
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── generate/             # Generate UI sub-components
│       ├── library/              # Library UI sub-components
│       ├── shared/               # Shared UI atoms
│       └── ui/                   # Shadcn/Radix primitives
│
├── config/
│   └── modules.ts                # Typed CreatorOSModule registry (7 modules)
│
├── data/
│   └── contentos.ts              # ContentOS copy, features, workflow data
│
├── components/
│   └── modules/                  # Shared module page components
│       ├── ModuleHero.tsx
│       ├── ModuleFeatureGrid.tsx
│       ├── ModuleWorkflow.tsx
│       ├── ModuleCTA.tsx
│       └── ModulePageLayout.tsx  # Wrapper: Navbar + sections + Footer
│
└── modules/
    ├── contentos/
    │   ├── ContentOSPage.tsx     # /modules/contentos — module detail/marketing
    │   └── ContentOSApp.tsx      # /modules/contentos/app — tabbed app shell
    └── brandos/                  # (future)
```

---

## Routing

| Route | Component | Notes |
|---|---|---|
| `/` | `HomePage` | Landing page |
| `/dashboard` | `DashboardPage` | User dashboard |
| `/modules` | `ModulesPage` | Registry-driven module grid |
| `/modules/contentos` | `ContentOSPage` | New clean route |
| `/modules/contentos/app` | `ContentOSApp` | Tabbed app (Overview/Generate/Library) |
| `/modules/brandos` | `BrandOSProductPage` | New clean route (maps to existing) |
| `/modules/brandos/app` | `BrandOSAppPage` | New clean route (maps to existing) |
| `/modules/brand-os` | `BrandOSProductPage` | Legacy — preserved |
| `/app/brand-os/setup` | `BrandOSAppPage` | Legacy — preserved |
| `/modules/content-os` | `ContentOSProductPage` | Legacy — preserved |
| `/app/content-os/generate` | `ContentOSAppPage` | Legacy — preserved |
| `/app/content-os/library` | `ContentOSLibraryPage` | Legacy — preserved |

---

## Module Registry

`src/config/modules.ts` exports:
- `modules` — all 7 modules as `CreatorOSModule[]`
- `coreModules` — core workflow (01–05)
- `addonModules` — add-ons (06–07)
- `activeModules` — status === 'active'
- `getModule(id)` — lookup by slug

Module IDs (slugs): `brandos`, `contentos`, `launchos`, `managementos`, `analyticsos`, `communityos`, `researchos`

---

## Design System

| Token | Value |
|---|---|
| Background | `#0E0F14` |
| Card BG | `#171923` / `#1F2230` |
| Primary Text | `#F4F3F8` |
| Secondary Text | `#B4B8C7` |
| Muted | `#8B8F9E` |
| Pink accent | `#FFBFDE` |
| Lilac accent | `#DABFFF` |
| Pink-lilac blend | `#E7C6F3` |
| Heading font | Manrope |
| Body font | Inter |

---

## creatoros-site (Live Marketing Site)

The live site runs from `creatoros-site/` on port 5000 (workflow: `creatoros-site`).

### Deployment (Option A — separate published app)
The marketing site publishes as its **own** Replit app, separate from the platform app (this repl, live at `https://creatorospage.replit.app`). To publish the marketing site:
- **Target:** static
- **Build:** `cd creatoros-site && npm run build`
- **Public dir:** `creatoros-site/dist`
- **Env var:** `VITE_PLATFORM_URL = https://creatorospage.replit.app/platform` (set in the **production** environment; inlined at build time). Dev intentionally leaves it unset so `getPlatformUrl()` falls back to `/platform`, which Vite proxies to the local platform on port 3000.
- After changing `VITE_PLATFORM_URL`, **rebuild** — `VITE_*` values are baked into the bundle at build time, so a rebuild/republish is required for changes to take effect.
- Module "Open" links on `/modules` resolve to `${VITE_PLATFORM_URL}${MODULE_APP_PATHS[name]}` (e.g. `https://creatorospage.replit.app/platform/modules/contentos`).

### Key pages
| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Hero, Problem, Outcome, FeaturedProduct, HowItWorks, SystemOverview, EcosystemPreview, About, FinalCTA |
| `/modules` | `src/pages/Modules.tsx` | Full platform module overview — all 5 modules with capabilities |
| `/product` | `src/pages/Product.tsx` | Creator Clarity Kit (€24 one-time) |
| `/offers` | `src/pages/Offers.tsx` | Offers page |
| `/about` | `src/pages/About.tsx` | About page |
| `/early-access` | `src/pages/EarlyAccess.tsx` | Early access signup |

### Key components
- `src/components/home/SystemOverview.tsx` — Platform architecture section (01–05 modules)
- `src/components/home/EcosystemPreview.tsx` — Module grid (all 5 modules)
- `src/components/home/Hero.tsx` — Platform-first hero (CTAs → `/modules`)
- `src/components/Footer.tsx` — 4-column footer: PLATFORM / CORE MODULES / RESOURCES / COMPANY
- `src/i18n/en.ts` — All copy strings (hero, ecosystem, etc.)
- `src/config/site.ts` — SITE_URL, SUPPORT_EMAIL, BRAND_NAME, PLATFORM_URL, MODULE_APP_PATHS
- `src/contexts/AuthContext.tsx` — Soft owner gate (localStorage + `VITE_OWNER_ACCESS_CODE`). Not real auth — replace with Supabase Auth before real users.
- `src/pages/SignIn.tsx` — `/sign-in` page for owner access

### Owner auth (soft gate)
- Navbar shows "Sign in" for public, "Owner" badge + Sign out for owner
- `/modules` shows "Join Waitlist" for public on each module, "Open {Name}" for owner (opens in new tab)
- Each module card has `id={name.toLowerCase()}` so footer `#brandos` etc. anchors scroll correctly
- Secret rotation: changing `VITE_OWNER_ACCESS_CODE` auto-invalidates old browser sessions on next load

### Cross-app routing (platform proxy)
- Marketing site (`creatoros-site`, port 5000) proxies `/platform/*` → root platform app (port 3000)
- Root app's Vite has `base: '/platform/'` and React Router has `basename: '/platform'` — both must stay in sync
- Root app imports must use `react-router` (v7), NOT `react-router-dom` (v6) — they're incompatible
- In production, set `VITE_PLATFORM_URL` in `creatoros-site` to the deployed platform URL (overrides the `/platform` default)
- Module → platform path mapping: `creatoros-site/src/config/site.ts` `MODULE_APP_PATHS`. Set to `null` for modules without an app yet (owner sees "In Development" badge)

### Platform positioning
- CreatorOS = platform
- BrandOS (01), ContentOS (02), LaunchOS (03), ManagementOS (04), AnalyticsOS (05) = modules
- BrandOS + ContentOS = Active; LaunchOS, ManagementOS, AnalyticsOS = Planned

---

## GitHub Integration
- Connector: `@replit/connectors-sdk`
- Connection ID: `conn_github_01KJF2JYMM87081TNRMKNJSKT2`
- Repo: `https://github.com/Soleil-Sophia/creatoros-platform`

## Canvas Mockup
- Mockup sandbox on port 23636, base path `/__mockup/`
- Landing page mockup: `artifacts/mockup-sandbox/src/components/mockups/landing-page/Current.tsx`
- Theme: `artifacts/mockup-sandbox/src/styles/_group.css`

## Vite Config
- Marketing site (creatoros-site): port 5000, proxies `/platform/*` → localhost:3000
- Root platform app: port 3000, `base: '/platform/'`, router `basename: '/platform'`
- HMR uses `REPLIT_DEV_DOMAIN` env var
- `.local/` excluded from file watcher

---

## MVP-1 Smoke Checklist & Local State Reference

Operational reference for MVP-1 alpha. Documentation only — do not infer
behavior beyond what is listed here.

### 1. MVP-1 Current Real Flows
What actually works end-to-end today:
- BrandOS profile persists locally (survives reload).
- BrandOS seeds ContentOS Generate (tone, voice label).
- Generate shows the Brand Voice chip and custom tone pill.
- Generate button shows visible feedback (`Generated {Label} ✓` near the button).
- Generate saves assets to the Library.
- Saved assets include a frozen Brand Voice snapshot captured at save time.
- Library shows saved assets above the mock seed entries.
- Library supports deleting saved assets.
- Library → Generate "Use in Generate" reuse restores the full saved inputs
  (offer / audience / goal / tone / platform / outputType).
- Dashboard reads local CreatorOS state (brand profile, library count,
  authority runs).
- Authority Engine Labs persists runs locally.

### 2. MVP-1 Still Mock / Not Yet Built
Be explicit about what is NOT real yet:
- Generation content is still `OUTPUT_MOCK`, not real AI.
- No backend, no auth, no Supabase.
- No cross-device persistence.
- No publishing, scheduling, or analytics.
- Planned modules (LaunchOS, ManagementOS, AnalyticsOS, CommunityOS,
  ResearchOS) remain docs/demo unless their status is `active` in
  `src/config/modules.ts`.
- localStorage only — clearing browser storage wipes all state.

### 3. Local Storage Keys
| Key | Written by | Read by | Shape (summary) | UI can clear? |
|---|---|---|---|---|
| `creatoros-brand-profile-v1` | BrandOS setup | Generate, Dashboard | Single object: `{ tone, complexity, formality, energy, voiceLabel, updatedAt, ... }` | Re-save in BrandOS overwrites; no in-UI delete |
| `creatoros-content-library-v1` | Generate "Save to Library" | Library, Dashboard | Array of `SavedContentAsset` (see `src/app/lib/content-library/types.ts`) including frozen `brandVoiceSnapshot` | Yes — per-asset delete in Library |
| `creatoros-authority-runs` | Authority Engine Labs | Authority Engine Labs, Dashboard | Array of run objects (inputs + output + timestamp) | Yes — per-run delete in Labs |

To wipe everything during testing, clear these three keys in DevTools →
Application → Local Storage.

### 4. Six Key Routes Smoke Test
Routes are served under `/platform` via the marketing-site proxy in dev, or
direct on port 3000.

- `/platform/dashboard`
- `/platform/modules`
- `/platform/app/brand-os/setup`
- `/platform/app/content-os/generate`
- `/platform/app/content-os/library`
- `/platform/app/labs/authority-engine`

Expected:
- All return HTTP 200.
- Direct reload on each route works (React Router `basename: '/platform'`).
- No console errors beyond normal dev/Vite messages (HMR pings, source-map
  notices, React DevTools hint).

Quick check from shell:
```
for p in /platform/dashboard /platform/modules /platform/app/brand-os/setup /platform/app/content-os/generate /platform/app/content-os/library /platform/app/labs/authority-engine; do
  printf "%s  %s\n" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000${p})" "${p}"
done
```

### 5. Manual Happy Path Smoke Test
Click-through to validate the MVP-1 loop:
1. Open BrandOS setup, save a profile with tone "Motivational & Direct".
2. Open ContentOS Generate.
3. Confirm the Brand Voice chip and the custom tone pill are visible.
4. Select output type "Caption Draft".
5. Click "Generate Caption Draft".
6. Confirm `Generated Caption Draft ✓` appears near the Generate button.
7. Click "Save to Library".
8. Confirm the button shows `Saving…` then `Saved ✓`.
9. Open Library.
10. Confirm the saved asset appears at the top with its Brand Voice snapshot.
11. Open the saved asset.
12. Click "Use in Generate".
13. Confirm offer / audience / goal / tone / platform / outputType restore
    correctly.
14. Delete the saved asset from the Library.
15. Confirm it disappears and stays deleted after a full reload.

### 6. Build Check
- `npm run build` must exit 0 before pushing.
- `dist/` is gitignored and must not be committed.
- Build time is ~1 minute; the resulting hash in `dist/assets/` should change
  whenever source changes.

### 7. Known MVP-1 Limitations
- localStorage only — no cross-device, no cross-browser, no cross-tab realtime sync.
- No AI — outputs are static `OUTPUT_MOCK` fixtures.
- No auth — owner gate on the marketing site is a soft localStorage flag, not
  identity.
- No backend.
- No production-grade data migration (schema bumps require a manual key
  rename / clear).
- No automated tests yet — verification is manual via the smoke checklist
  above.

### 8. What Not To Build Before MVP-1 Alpha
- Do not add AI before the local workflow is stable end-to-end.
- Do not add new modules before MVP-1 alpha closure.
- Do not start Supabase / auth / publishing until private-alpha feedback
  validates the local workflow.
