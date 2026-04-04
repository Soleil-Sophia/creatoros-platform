# CreatorOS — Premium Creator Infrastructure Platform

**Version 37** | Production Ready ✅

A modular creator infrastructure platform featuring dark, architectural design with structured content workflows. Built with React, TypeScript, Tailwind CSS v4, and React Router.

![CreatorOS](https://img.shields.io/badge/version-37-blue)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.7.3-blue)
![Tailwind](https://img.shields.io/badge/tailwind-v4-blue)
![Vite](https://img.shields.io/badge/vite-6.0.7-blue)

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173
```

That's it! See [QUICK_START.md](./QUICK_START.md) for more.

---

## 📚 Documentation

### Essential Guides
- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete project overview (1000+ lines)
- **[API_REFERENCE.md](./API_REFERENCE.md)** - Component props & APIs
- **[TECHNICAL_REFERENCE.md](./TECHNICAL_REFERENCE.md)** - Configuration, troubleshooting
- **[COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)** - All 113+ components documented
- **[CHANGELOG.md](./CHANGELOG.md)** - Development history (37 versions)

### Component-Specific
- `/src/app/components/shared/README.md` - Shared UI Primitives
- `/src/app/components/generate/README.md` - Generate Screen
- `/src/app/components/library/README.md` - Library Screen

---

## 🎨 Design Philosophy

### Core Principles
- **Architectural Spatial Design** - Strong foreground/midground/background separation
- **Controlled Accents** - Pink/Purple accents on max 10% of surface
- **Premium Quality** - Sharp edges, controlled lighting, no soft SaaS patterns
- **Modularity** - Each module is standalone but part of an ecosystem

### Dark Premium Aesthetic
```
Base Colors:  #0E0F14 (deep), #171923 (mid), #1F2230 (elevated)
Accents:      #FFBFDE (pink), #DABFFF (lilac), #E7C6F3 (blend)
Typography:   Manrope (headings), Inter (body)
Shadows:      Layered box-shadows with inset highlights
Radius:       20px → 16px → 12px → 8px → 6px
```

---

## 🏗️ Project Structure

```
/src/app/
├── pages/              # 5 pages (home, modules, product, app, library)
├── screens/            # 2 screens (generate, library)
├── components/
│   ├── shared/         # 6 shared primitives ⭐
│   ├── generate/       # 6 generate components
│   ├── library/        # 14 library components
│   ├── ui/             # 70+ shadcn components
│   └── [10 marketing]  # navbar, hero, footer, etc.
└── routes.ts           # React Router config

/src/styles/
├── theme.css           # CSS Variables & design tokens
├── tailwind.css        # Tailwind v4 imports
└── fonts.css           # Manrope + Inter
```

---

## 🧩 Module System

CreatorOS consists of 6 modules:

| Module | Status | Route | Description |
|--------|--------|-------|-------------|
| **Content OS** | ✅ Active | `/modules/content-os` | Structured content generation |
| **Campaign OS** | 🚧 Coming Soon | `/modules/campaign-os` | Multi-channel campaign planning |
| **Analytics OS** | 🚧 Coming Soon | `/modules/analytics-os` | Performance intelligence |
| **Community OS** | 📋 Planned | `/modules/community-os` | Audience relationship management |
| **Brand OS** | 📋 Planned | `/modules/brand-os` | Visual & voice identity system |
| **Research OS** | 📋 Planned | `/modules/research-os` | Audience & market intelligence |

---

## ✨ Key Features

### Content OS (Active Module)
- **Generate Screen** - Structured input → 8 content assets
  - Hooks (Problem-Solution, Curiosity Gap, Bold Statement)
  - Scripts (Short-form 60s, Long-form 5min)
  - Captions (Educational, Promotional)
  - Content Plans (30-day calendar)
  
- **Library Screen** - Asset management & reuse
  - Grid/List view toggle
  - Search, filter, sort
  - Preview drawer
  - Copy/Reuse actions

### Shared UI Primitives
- Badge (pink/purple/neutral variants)
- SectionLabel (consistent headers)
- EmptyState (no-content messaging)
- PageHeader (title + badge + description)
- PanelShell (consistent panel styling)
- HelperNote (info/warning/success variants)

---

## 🛠️ Tech Stack

### Core
- **React** 18.3.1 - UI library
- **TypeScript** 5.7.3 - Type safety
- **Vite** 6.0.7 - Build tool
- **React Router** 7.1.1 - Routing (Data Mode)
- **Tailwind CSS** v4 alpha 37 - Styling

### UI Libraries
- **Radix UI** - Accessible primitives
- **Vaul** - Drawer component (Library preview)
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Important Notes
- ✅ Use `react-router` (not `react-router-dom`)
- ✅ Use Tailwind v4 syntax: `@import "tailwindcss"`
- ✅ No React dedupe in Vite config (causes errors)

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

## 🎯 Navigation Flow

```
Homepage (/)
  ↓ "Explore Modules"
Modules Page (/modules)
  ↓ Click "Content OS"
Product Page (/modules/content-os)
  ↓ "Launch Content OS"
Generate App (/app/content-os/generate)
  ↔ Library (/app/content-os/library)
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

### File Structure Rules
- **Pages** (`/pages/`) - Routing + layout
- **Screens** (`/screens/`) - Business logic + state
- **Components** (`/components/`) - UI + presentation
- **Shared** (`/components/shared/`) - Reusable primitives

### Coding Standards
- ✅ Use shared primitives from `../shared`
- ✅ Use CSS variables from `theme.css`
- ✅ Follow radius system (20/16/12/8/6px)
- ✅ Maintain 10% accent rule
- ✅ No nested `<Link>` components
- ✅ TypeScript for all new code

---

## 🎨 Design Tokens

Quick reference for development:

```tsx
// Colors
style={{ background: 'var(--deep-bg)' }}       // #0E0F14
style={{ background: 'var(--elevated-surface)' }} // #1F2230
style={{ color: 'var(--primary-text)' }}       // #F4F3F8

// Gradients
background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)' // Pink
background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)' // Panel

// Shadows (Foreground)
boxShadow: '0 16px 40px rgba(255, 191, 222, 0.25), 0 6px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)'

// Radius
className="rounded-[20px]"  // Hero
className="rounded-[16px]"  // Cards
className="rounded-[12px]"  // Inner
```

See [QUICK_START.md](./QUICK_START.md) for more patterns.

---

## 📊 Project Statistics

- **Total Components**: 113+
- **Pages**: 5
- **Screens**: 2
- **Routes**: 5
- **Shared Primitives**: 6
- **Total Lines**: ~15,000+
- **Development Versions**: 37
- **Documentation Pages**: 6

---

## 🐛 Known Issues

### React "default export" Error
❌ **Don't** add React alias in `vite.config.ts`  
✅ **Do** use standard Vite config

### Nested Link Warning
❌ **Don't** nest `<Link>` components  
✅ **Do** use separate link buttons

See [TECHNICAL_REFERENCE.md](./TECHNICAL_REFERENCE.md) for troubleshooting.

---

## 🚦 Development Phases

| Phase | Versions | Focus |
|-------|----------|-------|
| Foundation | 1-10 | Design system, Tailwind v4, React Router |
| Marketing | 11-20 | Homepage sections, navigation |
| Generate | 21-28 | Content generation UI & logic |
| Library | 29-33 | Asset management & preview |
| Primitives | 34 | Shared component extraction |
| Fixes | 35 | Vite config, React dedupe |
| Structure | 36-37 | Module ecosystem, navigation |

See [CHANGELOG.md](./CHANGELOG.md) for detailed history.

---

## 🎯 Roadmap

### Immediate (Priority 1)
- [ ] Backend integration (Supabase)
- [ ] Authentication system
- [ ] Asset persistence in database

### Short-term (Priority 2)
- [ ] Campaign OS module
- [ ] Analytics OS module
- [ ] Mobile responsiveness

### Long-term (Priority 3)
- [ ] Community OS, Brand OS, Research OS
- [ ] User onboarding flow
- [ ] Pricing page

---

## 🤝 Contributing

This is a private project. For internal development:

1. Read [DOCUMENTATION.md](./DOCUMENTATION.md) first
2. Follow coding standards in [TECHNICAL_REFERENCE.md](./TECHNICAL_REFERENCE.md)
3. Use shared primitives from `/components/shared/`
4. Maintain design system consistency
5. Update documentation for new features

---

## 📝 License

Proprietary - All Rights Reserved

---

## 📞 Support

- **Documentation**: [DOCUMENTATION.md](./DOCUMENTATION.md)
- **API Reference**: [API_REFERENCE.md](./API_REFERENCE.md)
- **Quick Start**: [QUICK_START.md](./QUICK_START.md)
- **Components**: [COMPONENT_CATALOG.md](./COMPONENT_CATALOG.md)

---

## 🌟 Highlights

- ✅ **113+ Components** - Fully documented
- ✅ **6 Shared Primitives** - Reusable across modules
- ✅ **Dark Premium Design** - Architectural spatial hierarchy
- ✅ **Type-Safe Routing** - React Router Data Mode
- ✅ **Modern Stack** - React 18, Vite 6, Tailwind v4
- ✅ **Modular Architecture** - Scalable for 6+ modules
- ✅ **1000+ Lines Docs** - Comprehensive documentation

---

**Built with precision. Designed for creators.**

Version 37 | 2026-03-28
