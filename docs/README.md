# CreatorOS Documentation

**Version:** 2.0  
**Last Updated:** April 7, 2026

---

## 🚀 Quick Start

**New here?** Start with one of these:
- **[INDEX.md](./INDEX.md)** — Quick access by need (Recommended)
- **[EXECUTIVE-SUMMARY.md](./EXECUTIVE-SUMMARY.md)** — 10-min business overview
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Complete system architecture
- **[NAVIGATION.md](./NAVIGATION.md)** — Can't find something? Start here

---

## 📚 Documentation Structure

Diese Documentation definiert die komplette Produktarchitektur, Modulstruktur und technische Implementation von CreatorOS.

---

## 📄 Available Documents

### 1. [ARCHITECTURE.md](./ARCHITECTURE.md)
**Hauptdokumentation — Start hier.**

Vollständige Systemarchitektur mit:
- Produktkonzept & Vision
- Core Workflow vs. Add-on Modules
- 3-Ebenen-Informationsarchitektur
- Design System Specs
- Technische Architektur
- Datenflüsse zwischen Modulen
- Navigation & User Journey
- Roadmap & Pricing-Konzept

**Zielgruppe:** Product Team, Development Team, Design Team

---

### 2. [BRANDOS-DEFINITION.md](./BRANDOS-DEFINITION.md)
**Brand OS Modul-Spezifikation**

Vollständige Produktdefinition für Brand OS mit:
- Kernidee & Aufgabe
- Scope & Abgrenzung
- Zielgruppe & Probleme
- MVP-Definition (6-Step Setup Flow)
- Outputs & Integration mit Content OS
- UX-Logik & Roadmap

**Zielgruppe:** Product Team, Development Team (Brand OS)

---

### 3. [CONTENTOS-DEFINITION.md](./CONTENTOS-DEFINITION.md)
**Content OS Modul-Spezifikation**

Vollständige Produktdefinition für Content OS mit:
- Kernidee & Aufgabe
- Scope & Abgrenzung
- Core Loop (Input → Processing → Output → Save)
- MVP-Definition (Generate + Library)
- Strukturierte Outputs (Hooks, Scripts, Captions)
- Integration mit Brand OS
- UX-Logik & Roadmap

**Zielgruppe:** Product Team, Development Team (Content OS)

---

### 4. [SITEMAP.md](./SITEMAP.md)
**Site Structure & User Flows**

Visuelle Übersicht aller Routes, Pages und Navigation Flows:
- Complete Site Map (Visual)
- Route Reference (All Pages)
- User Journey Flows
- Navigation Patterns
- Cross-Module Navigation
- Entry Points by User Type

**Zielgruppe:** Product Team, Design Team, QA Team

---

### 5. [NAVIGATION.md](./NAVIGATION.md)
**Documentation Navigation Guide**

Schneller Überblick über die Dokumentationsstruktur:
- Wie findest du die richtige Dokumentation
- Documentation by Role (PM, Dev, Designer, QA)
- Find Information by Topic
- Quick Links

**Zielgruppe:** Alle (Start hier wenn du nicht weißt wo zu suchen)

---

### 6. [CHANGELOG.md](./CHANGELOG.md)
**Product Version History**

Dokumentiert alle bedeutenden Änderungen:
- Version 2.0: 3-Ebenen-Architektur
- Version 1.x: MVP Features
- Upcoming Releases

**Zielgruppe:** Alle

---

## 🏗️ Produktstruktur (Übersicht)

### Core Workflow (Empfohlener Hauptpfad)
```
01. Brand OS       → Voice & Identity System
02. Content OS     → Structured Content Generation
03. Campaign OS    → Multi-Channel Campaign Planning (Coming Soon)
04. Analytics OS   → Performance Intelligence (Coming Soon)
```

### Add-on Modules (Optionale Erweiterungen)
```
05. Community OS   → Audience Relationship Management (Planned)
06. Research OS    → Audience & Market Intelligence (Planned)
```

---

## 🎯 Modul-Kriterien

Jedes Modul muss **3 Anforderungen erfüllen:**

1. **Standalone Nutzen** — Funktioniert alleine
2. **Klarer Platz im System** — Definierte Aufgabe & Scope
3. **Saubere Anschlussfähigkeit** — Datenaustausch mit anderen Modulen

**Wenn ein Modul das nicht erfüllt, gehört es nicht ins System.**

---

## 🗺️ Navigation & Routes

### Marketing Pages
```
/                    → Landing Page
/dashboard           → Personalized Dashboard
/modules             → All Modules View (mit Tabs)
/modules/{name}      → Individual Module Product Page
```

### Module Apps
```
/app/brand-os/setup              → Brand OS Setup Flow
/app/content-os/generate         → Content OS Generation Interface
/app/content-os/library          → Content OS Asset Library
/app/campaign-os/*               → Coming Soon
/app/analytics-os/*              → Coming Soon
```

---

## 🎨 Design System

### Farben
- **Dark Base:** `#0E0F14`, `#171923`, `#1F2230`
- **Accents (max 10%):** `#E7C6F3` (Brand OS), `#FFBFDE` (Content OS), `#DABFFF` (Campaign/Research)
- **Text:** `#F4F3F8`, `#B4B8C7`, `#8B8F9E`

### Typography
- **Headlines:** Manrope (700)
- **Body:** Inter (400/500/600)

### Radius System
- 20px, 16px, 12px, 8px, 6px

### Design-Prinzipien
- Architektonische Ästhetik
- Räumliche Tiefe (Shadows, Insets, Edge Lights)
- Premium Wirkung (keine weiche SaaS-Optik)
- Funktionale Präzision (echte Tools, keine Fassade)

---

## 🔧 Technische Architektur

### Stack
- **Frontend:** React 19 + Tailwind CSS v4
- **Routing:** React Router (Data Mode)
- **Backend:** Supabase (Edge Functions, PostgreSQL, Storage)
- **Server:** Hono Web Framework

### Three-Tier Pattern
```
Frontend → Server (Edge Function) → Database (KV Store)
```

### Protected Files
```
/src/app/components/figma/ImageWithFallback.tsx
/pnpm-lock.yaml
/supabase/functions/server/kv_store.tsx
/utils/supabase/info.tsx
```

---

## 📊 Key Metrics (geplant)

### Product Metrics
- Module Adoption Rate
- Core Flow Completion Rate
- Add-on Activation Rate
- Inter-Module Usage

### User Metrics
- Time to First Asset
- Assets Created per Week
- Brand Profile Completion Rate
- Return Frequency

---

## 🚀 Roadmap

### Phase 1 (Current — MVP)
- ✅ Brand OS Setup Flow
- ✅ Content OS Generate + Library
- ✅ Dashboard + Modules Page
- ✅ 3-Ebenen-Informationsarchitektur

### Phase 2 (Q2 2026)
- Campaign OS Launch
- Analytics OS Launch
- Multi-Brand Profile Support
- Cross-Module Integration vertiefen

### Phase 3 (Q3 2026)
- Community OS
- Research OS
- Team Access & Collaboration
- Export & Integration Features

---

## 📝 Documentation Maintenance

### Diese Dokumentation wird aktualisiert bei:
- Neuen Modulen
- Architektur-Änderungen
- Routing-Updates
- Feature-Releases
- Scope-Decisions

### Verantwortlich
Product Team

### Review Cycle
Monatlich oder bei Major Changes

---

## 🔗 Related Files

### Guidelines
```
/Guidelines.md                   → Development Guidelines (System Context)
```

### Styles
```
/src/styles/theme.css           → CSS Variables & Design Tokens
/src/styles/global.css          → Global Styles
/src/styles/fonts.css           → Font Imports
```

### Routes
```
/src/app/routes.ts              → React Router Configuration
```

### Components
```
/src/app/components/navbar.tsx  → Main Navigation
/src/app/components/footer.tsx  → Footer Component
```

### Pages
```
/src/app/pages/home.tsx         → Landing Page
/src/app/pages/dashboard.tsx    → Dashboard
/src/app/pages/modules.tsx      → Modules Overview
```

---

## 📞 Contact & Support

**Product Team:**  
Fragen zur Produktstrategie, Scope, oder Roadmap

**Development Team:**  
Technische Implementation, Architecture, Code

**Design Team:**  
UI/UX, Design System, Visual Specs

---

## 🎓 How to Use This Documentation

### Für neue Team-Mitglieder:
1. Start mit `ARCHITECTURE.md` für Gesamtübersicht
2. Lies `BRANDOS-DEFINITION.md` für Brand OS Modul
3. Lies `CONTENTOS-DEFINITION.md` für Content OS Modul
4. Review Code in `/src/app/` für Implementation

### Für Product Decisions:
1. Check `ARCHITECTURE.md` → "Scope-Regeln"
2. Check Modul-Definitions für spezifische Scope
3. Konsultiere Team bei Grenzfällen

### Für Development:
1. Check `ARCHITECTURE.md` → "Technische Architektur"
2. Check Modul-Definition für Feature-Specs
3. Check `/Guidelines.md` für Code-Standards

---

## ⚠️ Wichtige Regeln

### Scope-Regel
**Jedes neue Feature muss klar einem bestehenden Modul zuordenbar sein oder ein neues Modul mit vollwertigem Scope rechtfertigen.**

### Modul-Regel
**Ein Modul muss 3 Kriterien erfüllen: Standalone Nutzen, Klarer Platz im System, Saubere Anschlussfähigkeit.**

### Design-Regel
**Keine weiche SaaS-Optik. Architektonische, räumliche Ästhetik mit starker Vordergrund/Mittelgrund/Hintergrund-Trennung.**

---

**Ende der Documentation Overview**