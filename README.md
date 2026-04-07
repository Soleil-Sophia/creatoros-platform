# CreatorOS

**A modular creator platform with a clear core workflow and optional add-on modules.**

Each tool works independently — but together, they create a real operating system for systematic content production.

---

## 🚨 CURRENT STATUS (April 2026)

### What's Built ✅
- **BrandOS UI** — 6-step brand setup flow (local state only)
- **ContentOS UI** — Generate + Library interface (mock data + localStorage)
- **Marketing Pages** — Landing, Dashboard, Modules overview

### What's Missing ❌
- **NO Backend** — No auth, no database, no persistence
- **NO AI Integration** — ContentOS uses placeholder data
- **NO Module Integration** — BrandOS and ContentOS don't communicate
- **5 Modules Are Docs Only** — LaunchOS, ManagementOS, AnalyticsOS, CommunityOS, ResearchOS

### Reality Check
**Users can fill out forms, but can't actually use the product.**

**Next Priority:** [MVP-1 Build Plan](/docs/MVP1-ACTION-PLAN.md) — Make BrandOS → ContentOS work as real integrated system (4 weeks)

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173
```

---

## 📚 Documentation

### **NEW: Product Documentation** 📖
Complete product architecture, module specifications, and strategic documentation:

- **[/docs/README.md](./docs/README.md)** - Documentation Overview & Navigation
- **[/docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Complete System Architecture (START HERE)
- **[/docs/BRANDOS-DEFINITION.md](./docs/BRANDOS-DEFINITION.md)** - Brand OS Module Specification
- **[/docs/CONTENTOS-DEFINITION.md](./docs/CONTENTOS-DEFINITION.md)** - Content OS Module Specification
- **[/docs/CHANGELOG.md](./docs/CHANGELOG.md)** - Product Version History

### Technical Documentation
- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete technical overview
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Component props & APIs
- **[TECHNICAL_REFERENCE.md](./TECHNICAL_REFERENCE.md)** - Configuration, troubleshooting
- **[COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)** - All 113+ components documented

### Component-Specific
- `/src/app/components/shared/README.md` - Shared UI Primitives
- `/src/app/components/generate/README.md` - Generate Screen
- `/src/app/components/library/README.md` - Library Screen

---

## 🏗️ Product Architecture

### Core Workflow (Recommended Path)
The core modules that create the main creator workflow. Each is standalone, but strongest together.

| # | Module | Status | Description |
|---|--------|--------|-------------|
| **01** | **Brand OS** | ✅ Active | Voice & Identity Foundation |
| **02** | **Content OS** | ✅ Active | Structured Content Generation |
| **03** | **Launch OS** | 🚧 Coming Q2 2026 | Rollout & Coordination |
| **04** | **Management OS** | 🚧 Coming Q2 2026 | Scheduling & Execution |
| **05** | **Analytics OS** | 🚧 Coming Q3 2026 | Performance Intelligence |

### Add-on Modules (Optional Extensions)
Not part of the core flow, but equally valuable when needed.

| # | Module | Status | Description |
|---|--------|--------|-------------|
| **06** | **Community OS** | 📋 Planned | Audience Relationship Management |
| **07** | **Research OS** | 📋 Planned | Audience & Market Intelligence |

---

## ✨ Core Features

### 1. Dashboard (`/dashboard`)
Personalized creator system overview:
- Core Workflow progress visualization
- Add-on module recommendations
- Direct launch buttons for active modules
- Visual workflow connectors

### 2. Modules Page (`/modules`)
Explore all modules with 3-tab navigation:
- **Core Workflow** - Recommended path
- **Add-on Modules** - Optional extensions
- **All Modules** - Complete overview

### 3. Brand OS (`/app/brand-os/setup`)
Strategic brand foundation:
- Define brand voice, tone, and messaging
- Structure audience & positioning
- Create reusable brand profile
- Export to Content OS

### 4. Content OS (`/app/content-os/generate` + `/library`)
Structured content generation:
- **Generate:** Input → Hooks + Scripts + Captions
- **Library:** Asset management & organization
- Brand voice consistency
- Platform-specific outputs

---

## 🎨 Design Philosophy

### Core Principles
- **Architectural Spatial Design** - Strong foreground/midground/background separation
- **Controlled Accents** - Pink/Purple accents on max 10% of surface
- **Premium Quality** - Sharp edges, controlled lighting, no soft SaaS patterns
- **Functional Precision** - Real tools, not facades

### Design System
```
Base Colors:  #0E0F14 (deep), #171923 (mid), #1F2230 (elevated)
Accents:      #E7C6F3 (Brand OS), #FFBFDE (Content OS), #DABFFF (Campaign/Research)
Typography:   Manrope (headings 700), Inter (body 400/500/600)
Shadows:      Layered with inset highlights
Radius:       20px → 16px → 12px → 8px → 6px
```

---

## 🗂️ Project Structure

```
/docs/                  # Product documentation (NEW)
├── ARCHITECTURE.md     # System architecture
├── BRANDOS-DEFINITION.md
├── CONTENTOS-DEFINITION.md
└── CHANGELOG.md

/src/app/
├── pages/              # 7 pages (home, dashboard, modules, products, apps)
├── screens/            # 2 screens (generate, library)
├── components/
│   ├── shared/         # 6 shared primitives ⭐
│   ├── generate/       # 6 generate components
│   ├── library/        # 14 library components
│   ├── ui/             # 70+ shadcn components
│   └── [marketing]     # navbar, hero, footer, etc.
└── routes.ts           # React Router config

/src/styles/
├── theme.css           # CSS Variables & design tokens
├── tailwind.css        # Tailwind v4 imports
└── fonts.css           # Manrope + Inter
```

---

## 🛠️ Tech Stack

### Core
- **React** 19 - UI library
- **TypeScript** 5.7.3 - Type safety
- **Vite** 6.0.7 - Build tool
- **React Router** 7.1.1 - Routing (Data Mode)
- **Tailwind CSS** v4 alpha - Styling

### Backend
- **Supabase** - Database, Auth, Storage
- **Edge Functions** - Hono web server
- **KV Store** - Key-value data persistence

### UI Libraries
- **Radix UI** - Accessible primitives
- **Vaul** - Drawer component
- **Lucide React** - Icons
- **Sonner** - Toast notifications

---

## 🎯 Navigation Flow

```
Homepage (/)
  ↓
Dashboard (/dashboard)
  ↓
Modules Overview (/modules) [with tabs: Core | Add-ons | All]
  ↓
Module Product Page (/modules/{module-name})
  ↓
Module App (/app/{module-name}/{view})
```

### Example Flow
```
1. Landing Page (/)
2. Dashboard (/dashboard) — See workflow status
3. Brand OS Product (/modules/brand-os)
4. Brand OS Setup (/app/brand-os/setup) — Define brand
5. Content OS Product (/modules/content-os)
6. Content OS Generate (/app/content-os/generate) — Create content
7. Content OS Library (/app/content-os/library) — Manage assets
```

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Setup
```bash
# Clone repository
git clone [repository-url]
cd creator-os

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## 🧪 Development

### Common Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm typecheck    # TypeScript check
```

### Coding Standards
- ✅ Use shared primitives from `/components/shared/`
- ✅ Use CSS variables from `theme.css`
- ✅ Follow radius system (20/16/12/8/6px)
- ✅ Maintain 10% accent rule
- ✅ TypeScript for all new code
- ✅ Update `/docs/` when changing architecture

### Module Development Rules
Every new module must fulfill **3 criteria:**
1. **Standalone Value** - Works independently
2. **Clear System Position** - Defined scope & purpose
3. **Clean Integration** - Can exchange data with other modules

**If a module doesn't fulfill these, it doesn't belong in the system.**

---

## 📊 Project Statistics

- **Total Components**: 113+
- **Pages**: 7
- **Screens**: 2
- **Core Modules**: 4 (2 active, 2 coming soon)
- **Add-on Modules**: 2 (planned)
- **Shared Primitives**: 6
- **Total Lines**: ~18,000+
- **Documentation Pages**: 9

---

## 🚦 Development Roadmap

### Phase 1 (Current — MVP) ✅
- Brand OS Setup Flow
- Content OS Generate + Library
- Dashboard with Core Workflow
- Modules Page with Tabs
- 3-Level Information Architecture

### Phase 2 (Q2 2026)
- Campaign OS Launch
- Analytics OS Launch
- Multi-Brand Profile Support
- Cross-Module Integration

### Phase 3 (Q3 2026)
- Community OS
- Research OS
- Team Access & Collaboration
- Export & Integration Features

---

## 🎯 Key Concepts

### What CreatorOS IS:
- Modular creator platform
- Systematic workflow with clear core path
- Production environment for structured content work
- Integration layer between strategy and execution

### What CreatorOS is NOT:
- Social media scheduler
- Pure design tool
- Complete marketing suite
- Generic SaaS dashboard

### Critical Rule:
**Every new feature must clearly belong to an existing module or justify a new module with full scope.**

---

## 🌟 Highlights

- ✅ **Modular Architecture** - Core + Add-ons system
- ✅ **3-Level IA** - Dashboard → Modules → Apps
- ✅ **Brand → Content Flow** - Systematic consistency
- ✅ **113+ Components** - Fully documented
- ✅ **Dark Premium Design** - Architectural spatial hierarchy
- ✅ **Type-Safe Routing** - React Router Data Mode
- ✅ **Modern Stack** - React 19, Vite 6, Tailwind v4

---

## 📝 License

Proprietary - All Rights Reserved

---

## 📞 Support

### Product Documentation
- **Architecture:** [/docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Brand OS:** [/docs/BRANDOS-DEFINITION.md](./docs/BRANDOS-DEFINITION.md)
- **Content OS:** [/docs/CONTENTOS-DEFINITION.md](./docs/CONTENTOS-DEFINITION.md)

### Technical Documentation
- **Quick Start:** [QUICK_START.md](./QUICK_START.md)
- **Complete Docs:** [DOCUMENTATION.md](./DOCUMENTATION.md)
- **API Reference:** [API_REFERENCE.md](./API_REFERENCE.md)

---

**Built with precision. Designed for creators. Structured for scale.**

Version 2.0 | April 2026