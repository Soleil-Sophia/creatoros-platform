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
- `src/config/site.ts` — SITE_URL, SUPPORT_EMAIL, BRAND_NAME

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
- Main app: port 5000
- HMR uses `REPLIT_DEV_DOMAIN` env var
- `.local/` excluded from file watcher
