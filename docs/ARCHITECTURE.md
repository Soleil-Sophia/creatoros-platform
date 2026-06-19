# CreatorOS — Produktarchitektur

**Version:** 2.0  
**Datum:** April 2026  
**Status:** In Entwicklung

---

## 1. Kernkonzept

**CreatorOS ist eine anpassbare Creator-Plattform mit einem klaren Kernworkflow aus eigenständig nutzbaren Modulen sowie einer Add-on-Struktur für optionale, gleichwertige Erweiterungen.**

### Das Problem
Creators haben:
- Keine systemische Grundlage für konsistente Content-Produktion
- Inkonsistente Brand Voice über Plattformen hinweg
- Keine strukturierte Arbeitsumgebung für wiederholbare Prozesse
- Fragmentierte Tools ohne echte Integration

### Die Lösung
CreatorOS bietet:
- **Core Workflow:** Empfohlener Hauptpfad mit logischem Ablauf
- **Add-on Modules:** Optionale Erweiterungen je nach Bedarf
- **Modulares System:** Jedes Modul standalone stark, zusammen noch stärker

---

## 2. Produktstruktur

### A. Core Workflow (Hauptpfad)

Der empfohlene systemische Ablauf. Diese Module sind standalone nutzbar, aber zusammen am stärksten.

#### 01. Brand OS
**Tagline:** Voice & Identity Foundation  
**Status:** Active  
**Zweck:** Die strategische Basis aller Content-Arbeit — definiert Identität, Voice & Messaging bevor Content, Launches und Execution

**Position im System:**  
BrandOS ist das **Fundament des CreatorOS Core Workflows**. Ohne definierte Brand-Identity bleibt Content generisch, Launches unkoordiniert und Analytics interpretationslos. BrandOS macht Marke erstmals maschinenlesbar und workflow-fähig.

**Aufgabe:**
- Marke klar definieren (Name, Mission, Vision, Werte, Positionierung)
- Zielgruppe strukturieren (Wunschkunde, Probleme, Sprache)
- Voice & Tone festlegen (Tonalität, Sprachstil, Dos & Don'ts)
- Messaging Pillars erstellen (3-5 Hauptthemen)
- Offer Context erfassen (Produkt, Transformation, CTA Style)

**Output:**
- Brand Snapshot
- Voice Profile
- Messaging Framework
- AI-ready Brand Configuration
- Übergabedaten für ContentOS

**Kernnutzen:**  
Marke wird erstmals maschinenlesbar und workflow-fähig.

**Integration:**
- **Zu ContentOS:** Voice Profile + Messaging Framework für konsistente Content-Generierung
- **Zu LaunchOS:** Brand Positioning + Messaging Pillars für Launch-Strategie
- **Zu ManagementOS:** Platform-spezifische Voice-Anpassungen (LinkedIn formal, Instagram casual)

---

#### 02. Content OS
**Tagline:** Structured Content Generation  
**Status:** Active  
**Zweck:** Aus Ideen strukturierte Content-Assets erzeugen

**Aufgabe:**
- Generate from Idea: Input → AI Processing → Output
- Hook Generation (3-5 Varianten mit Frameworks)
- Script Creation (strukturierte Video-Scripts mit Sections)
- Social Captions (Instagram, LinkedIn, Twitter)
- Brand Voice System anwenden

**Output:**
- Hooks (PSA, Curiosity Gap, Problem-Agitate-Solve, etc.)
- Scripts (strukturiert nach Sections)
- Social Captions (plattformspezifisch)
- Gespeicherte Assets in Library

**Kernnutzen:**
Von Idee zu deployment-ready Content in einem System.

---

#### 03. Launch OS
**Tagline:** Rollout & Coordination  
**Status:** Coming Q2 2026  
**Zweck:** Strukturierte Launches, koordinierte Rollouts, orchestrierte Content-Phasen

**Geplante Features:**
- Launch Planning & Setup
- 3-Phase Structure (Pre-Launch, Launch, Post-Launch)
- Content Assignment from Library
- Platform Coordination
- Timeline Visualization
- Goal Tracking

**Output (geplant):**
- Vollständiger Launch Plan
- Content mapped to phases
- Platform Distribution Schedule
- Goal & Success Metrics
- Export to Management OS

---

#### 04. Management OS
**Tagline:** Scheduling & Execution  
**Status:** Coming Q2 2026  
**Zweck:** Operative Publishing-Steuerung — wann, wo, in welcher Form Content veröffentlicht wird

**Geplante Features:**
- Visual Content Calendar (Week/Month view)
- Publishing Queue Management
- Multi-Platform Connection & Posting
- Status Workflow (Draft → Scheduled → Published)
- Team Approval Workflows
- Publishing History & Error Handling

**Output (geplant):**
- Scheduled Posts Calendar
- Multi-Platform Publishing Queue
- Publishing Status Tracking
- Published Content Log for Analytics OS

**Integration:**
- Import from Launch OS (structured launches → scheduled posts)
- Browse Content OS Library for scheduling
- Export publishing data to Analytics OS for performance tracking

---

#### 05. Analytics OS
**Tagline:** Performance Intelligence  
**Status:** Coming Q3 2026  
**Zweck:** Content Performance tracken und AI-powered Insights generieren

**Geplante Features:**
- Cross-Platform Analytics
- Performance Pattern Recognition
- Engagement Insights
- ROI Tracking

**Output (geplant):**
- Performance Dashboard
- Top Performer Analysis
- Insights & Recommendations
- Optimization Suggestions

---

### B. Add-on Modules (Optionale Erweiterungen)

Diese Module sind **nicht** Teil des Kernflows, aber **gleichwertig** und aktivierbar bei Bedarf.

#### 06. Community OS
**Tagline:** Audience Relationship Management  
**Status:** Planned  
**Zweck:** Community-Interaktionen managen und Beziehungen aufbauen

**Geplante Features:**
- Interaction Tracking
- Response Automation
- Community Insights
- Relationship Scoring

---

#### 07. Research OS
**Tagline:** Audience & Market Intelligence  
**Status:** Planned  
**Zweck:** Deep Audience, Competitor & Market Analysis

**Geplante Features:**
- Audience Analysis
- Competitor Research
- Trend Monitoring
- Insight Extraction

---

## 3. Modul-Kriterien

Jedes Modul muss **3 Anforderungen erfüllen:**

1. **Standalone Nutzen**  
   Funktioniert alleine, ohne andere Module

2. **Klarer Platz im System**  
   Hat definierte Aufgabe und Scope

3. **Saubere Anschlussfähigkeit**  
   Kann Daten mit anderen Modulen austauschen

**Wenn ein Modul das nicht erfüllt, gehört es nicht ins System.**

---

## 4. Informationsarchitektur

### A. Dashboard (Personalized View)
**Route:** `/dashboard`

**Zweck:** Nutzer sieht seinen aktuellen Workflow-Status

**Sections:**
- Core Workflow Progress (5 Steps mit Status)
- Add-on Modules (verfügbare Erweiterungen)
- Quick Actions (Launch aktive Module)

**Key Features:**
- Status-Badges (Active / Coming Soon / Planned)
- Visual Connectors zwischen Workflow-Steps
- Direct Launch-Buttons für aktive Module

---

### B. Modules Page (All Modules View)
**Route:** `/modules`

**Zweck:** Alle verfügbaren Module erkunden

**Tab Navigation:**
1. **Core Workflow** — Empfohlener Hauptpfad
2. **Add-on Modules** — Optionale Erweiterungen
3. **All Modules** — Gesamtübersicht

**Modul-Darstellung:**
- Core Badge (Pink) für Kernmodule
- Add-on Badge (Lila) für Erweiterungen
- Status-Badges
- Feature-Liste
- Learn More + Launch Buttons

---

### C. Individual Module Pages
**Route Pattern:** `/modules/{module-name}`

**Zweck:** Detaillierte Produktseite pro Modul

**Sections:**
- Hero mit Key Value Proposition
- Visual System Overview
- Core Features Grid
- Workflow Explanation
- Integration mit anderen Modulen
- CTA to Launch

---

### D. Module Apps
**Route Pattern:** `/app/{module-name}/{view}`

**Zweck:** Funktionale Arbeitsumgebung pro Modul

**Beispiele:**
- `/app/brand-os/setup` — Setup Flow
- `/app/content-os/generate` — Generation Interface
- `/app/content-os/library` — Asset Library

---

## 5. Design System

### Farbsystem

**Dark Base:**
- `#0E0F14` — Background Primary
- `#171923` — Background Secondary
- `#1F2230` — Background Tertiary

**Accent Colors (max 10% Verwendung):**
- `#E7C6F3` — Pink/Lila Primary (Brand OS)
- `#FFBFDE` — Pink (Content OS)
- `#DABFFF` — Lila (Launch OS, Research OS)

**Text Colors:**
- `#F4F3F8` — Primary Text
- `#B4B8C7` — Secondary Text
- `#8B8F9E` — Tertiary Text

### Typography
- **Headlines:** Manrope (700 weight, tight tracking)
- **Body:** Inter (400/500/600 weights)

### Radius System
- 20px — Large Cards
- 16px — Medium Cards
- 12px — Buttons & Badges
- 8px — Small Elements
- 6px — Micro Elements

### Design-Prinzipien
1. **Architektonische Ästhetik** — Starke Vordergrund/Mittelgrund/Hintergrund-Trennung
2. **Räumliche Tiefe** — Subtile Shadows, Inset Highlights, Edge Lights
3. **Premium Wirkung** — Keine weiche SaaS-Optik, keine generischen Layouts
4. **Funktionale Präzision** — Echte Tools, keine Fassade

---

## 6. Technische Architektur

### Frontend Stack
- **Framework:** React 19
- **Routing:** React Router (Data Mode Pattern)
- **Styling:** Tailwind CSS v4 + Custom CSS Variables
- **Build:** Vite

### Backend Stack
- **Platform:** Supabase
- **Server:** Edge Functions (Hono Web Server)
- **Database:** PostgreSQL (Key-Value Table)
- **Storage:** Supabase Storage (Private Buckets)

### Three-Tier Architecture
```
Frontend (React) 
    ↓
Server (Supabase Edge Function / Hono)
    ↓
Database (PostgreSQL + KV Store)
```

### API Pattern
```
Frontend → https://{projectId}.supabase.co/functions/v1/make-server-{id}/{route}
Authorization: Bearer {publicAnonKey}
```

---

## 7. Datenfluss zwischen Modulen

### Brand OS → Content OS
**Übergebene Daten:**
- Brand Name
- Audience Description
- Voice Rules (Tone, Style, Energy)
- Content Pillars
- Offer Context
- CTA Style
- Banned/Preferred Language

**Verwendung in Content OS:**
ContentOS nutzt Brand Profile für:
- Personalisierte Hook-Generation
- Brand-konsistente Scripts
- Zielgruppen-spezifische Captions

---

### Content OS → Launch OS (geplant)
**Übergebene Daten:**
- Generated Assets (Hooks, Scripts, Captions)
- Content Pillars
- Platform-specific Variants

**Verwendung in Launch OS:**
Assets werden in Launch Phases eingebunden und koordiniert.

---

### Launch OS → Management OS (geplant)
**Übergebene Daten:**
- Launch Timeline
- Deployed Assets
- Platform Distribution

**Verwendung in Management OS:**
Assets werden für die Planung und Veröffentlichung eingesetzt.

---

### Management OS → Analytics OS (geplant)
**Übergebene Daten:**
- Scheduled Posts
- Publishing Status
- Published Content Log

**Verwendung in Analytics OS:**
Performance-Tracking pro Launch und Asset.

---

## 8. Navigation & User Journey

### Hauptnavigation
```
Home → Dashboard → Modules → [Module Detail] → [Module App]
```

### Core Flow (Empfohlene erste Reise)
```
1. Landing Page (/)
2. Dashboard (/dashboard) — System Overview
3. Brand OS Product Page (/modules/brand-os)
4. Brand OS Setup (/app/brand-os/setup)
5. Content OS Product Page (/modules/content-os)
6. Content OS Generate (/app/content-os/generate)
7. Content OS Library (/app/content-os/library)
```

### Quick Access
- **Navbar:** Home | Dashboard | Modules | Pricing
- **Dashboard:** Direct Launch-Buttons für aktive Module
- **Module Cards:** Learn More + Launch Actions

---

## 9. Produktstrategie

### Phase 1 (Current — MVP)
**Focus:** Core Workflow etablieren

**Live:**
- Brand OS (Setup Flow)
- Content OS (Generate + Library)
- Dashboard + Modules Page
- 3-Ebenen-Informationsarchitektur

**Ziel:**
Nutzer können systemisch von Brand Definition zu Content Generation arbeiten.

---

### Phase 2 (Q2 2026)
**Focus:** Core Workflow vervollständigen

**Geplant:**
- Launch OS Launch (formerly Campaign OS)
- Management OS Launch
- Analytics OS Launch
- Cross-Module Integration vertiefen
- Multi-Brand-Profile Support

---

### Phase 3 (Q3 2026)
**Focus:** Add-on Ecosystem aktivieren

**Geplant:**
- Community OS
- Research OS
- Team Access & Collaboration
- Export & Integration Features

---

## 10. Pricing-Logik (Konzept)

### Tier-Struktur

**Core Plan**
- Alle Core Workflow Module
- Einzelner Brand Profile
- Basis Content Library

**Core + Add-ons Plan**
- Core Workflow
- Auswählbare Add-on Modules
- Multiple Brand Profiles
- Erweiterte Library

**Bundles by Creator Type**
- **Solo Creator Bundle:** Brand OS + Content OS
- **Business Creator Bundle:** Core + Community OS + Research OS
- **Agency Bundle:** Core + Add-ons + Team Access

**Strategischer Vorteil:**
- Klein starten mit 2-3 Modulen möglich
- Groß denken durch Add-on-System
- Nutzer nicht überfordern
- Unterschiedliche Use Cases bedienen

---

## 11. Scope-Regeln

### Was CreatorOS IST:
- Modulare Creator-Plattform
- Systemischer Workflow mit klarem Kernpfad
- Produktionsumgebung für strukturierte Content-Arbeit
- Integration Layer zwischen Strategy und Execution

### Was CreatorOS NICHT IST:
- Social Media Scheduler
- Pure Design Tool
- Komplette Marketing-Suite
- Generic SaaS Dashboard ohne Fokus

### Kritische Regel:
**Jedes neue Feature muss klar einem bestehenden Modul zuordenbar sein oder ein neues Modul mit vollwertigem Scope rechtfertigen.**

---

## 12. Key Metrics (geplant)

### Product Metrics
- **Module Adoption Rate** — Wie viele Nutzer aktivieren welche Module
- **Core Flow Completion** — Wie viele durchlaufen Brand OS → Content OS
- **Add-on Activation** — Welche Add-ons werden am meisten aktiviert
- **Inter-Module Usage** — Wie oft nutzen Nutzer Daten aus Brand OS in Content OS

### User Metrics
- **Time to First Asset** — Von Signup zu erstem generierten Asset
- **Assets Created per Week**
- **Brand Profile Completion Rate**
- **Return Frequency**

---

## 13. Technische Constraints

### Protected System Files
```
/src/app/components/figma/ImageWithFallback.tsx
/pnpm-lock.yaml
/supabase/functions/server/kv_store.tsx
/utils/supabase/info.tsx
```

### Server-Side Rules
- Server-Code nur in `/supabase/functions/server/`
- Keine Migrations oder DDL Statements in Code
- KV Store als primäres Datenmodell
- Supabase Storage für Blob Data
- Open CORS Headers erforderlich

### Frontend Rules
- Entrypoint: `/src/app/App.tsx` (Default Export)
- Components in `/src/app/components/`
- Pages in `/src/app/pages/`
- Routes in `/src/app/routes.ts`
- Theme in `/src/styles/theme.css` (CSS Variables)

---

## 14. Nächste Schritte

### Immediate (April 2026)
- [ ] BrandOS Setup Flow UI-Verbesserungen
- [ ] ContentOS Generation Performance optimieren
- [ ] Library Filtering & Search
- [ ] Save to Library nach Generation

### Short-term (Mai 2026)
- [ ] Launch OS MVP planen (formerly Campaign OS)
- [ ] Analytics OS Konzept definieren
- [ ] Multi-Brand-Profile Support
- [ ] Export-Funktionen

### Mid-term (Juni-Juli 2026)
- [ ] Launch OS Launch (formerly Campaign OS)
- [ ] Management OS Launch
- [ ] Analytics OS Launch
- [ ] Community OS Konzept
- [ ] Research OS Konzept

---

## 15. Dokumentation Maintenance

**Diese Dokumentation wird aktualisiert bei:**
- Neuen Modulen
- Architektur-Änderungen
- Routing-Updates
- Feature-Releases
- Scope-Decisions

**Verantwortlich:** Product Team  
**Review Cycle:** Monatlich oder bei Major Changes

---

## Appendix

### Referenz-Dokumente
- `/docs/BRANDOS-DEFINITION.md` — Brand OS Produktdefinition
- `/docs/CONTENTOS-DEFINITION.md` — Content OS Produktdefinition (TBD)
- `/Guidelines.md` — Entwicklungs-Guidelines

### Design Assets
- Tailwind Config: `/src/styles/theme.css`
- Global Styles: `/src/styles/global.css`
- Font Config: `/src/styles/fonts.css`

---

**Ende der Architektur-Dokumentation**