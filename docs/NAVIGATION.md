# Documentation Navigation Guide

Schneller Überblick über die gesamte Dokumentationsstruktur und wie du dich zurechtfindest.

---

## 📍 Start Here

### Neu im Projekt?
**→ [/docs/ARCHITECTURE.md](./ARCHITECTURE.md)**  
Das ist die Hauptdokumentation. Lies diese zuerst für vollständigen Überblick.

### Arbeitest du an Brand OS?
**→ [/docs/BRANDOS-DEFINITION.md](./BRANDOS-DEFINITION.md)**  
Vollständige Modul-Spezifikation mit MVP-Definition.

### Arbeitest du an Content OS?
**→ [/docs/CONTENTOS-DEFINITION.md](./CONTENTOS-DEFINITION.md)**  
Vollständige Modul-Spezifikation mit Core Loop und Outputs.

### Was hat sich geändert?
**→ [/docs/CHANGELOG.md](./CHANGELOG.md)**  
Version History und alle Major Changes.

---

## 🗺️ Documentation Map

```
📁 CreatorOS Root
│
├── 📄 README.md                         ← Projekt-Übersicht (neu!)
│
├── 📁 /docs/                             ← HAUPT-DOKUMENTATION
│   ├── 📄 README.md                      ← Documentation Overview
│   ├── 📄 NAVIGATION.md                  ← Diese Datei (Quick Guide)
│   ├── 📄 ARCHITECTURE.md                ← ⭐ SYSTEM ARCHITEKTUR (START HERE)
│   ├── 📄 BRANDOS-DEFINITION.md          ← Brand OS Modul-Specs
│   ├── 📄 CONTENTOS-DEFINITION.md        ← Content OS Modul-Specs
│   └── 📄 CHANGELOG.md                   ← Version History
│
├── 📁 Technical Docs (Root Level)
│   ├── 📄 QUICK_START.md                 ← 5-Minuten Setup
│   ├── 📄 DOCUMENTATION.md               ← Technical Overview (1000+ lines)
│   ├── 📄 API_REFERENCE.md               ← Component APIs
│   ├── 📄 TECHNICAL_REFERENCE.md         ← Config & Troubleshooting
│   └── 📄 COMPONENT_CATALOG.md           ← All 113+ Components
│
└── 📁 Component-Specific Docs
    ├── /src/app/components/shared/README.md
    ├── /src/app/components/generate/README.md
    └── /src/app/components/library/README.md
```

---

## 🎯 Documentation by Role

### Product Manager / Designer
**Must Read:**
1. [ARCHITECTURE.md](./ARCHITECTURE.md) — Produktstrategie, Module, Scope
2. [BRANDOS-DEFINITION.md](./BRANDOS-DEFINITION.md) — Brand OS Modul
3. [CONTENTOS-DEFINITION.md](./CONTENTOS-DEFINITION.md) — Content OS Modul
4. [CHANGELOG.md](./CHANGELOG.md) — Product Evolution

**Optional:**
- `/README.md` — Quick Project Overview

---

### Frontend Developer
**Must Read:**
1. [ARCHITECTURE.md](./ARCHITECTURE.md) — System Overview
2. `/QUICK_START.md` — Setup Instructions
3. `/DOCUMENTATION.md` — Technical Details
4. Module-spezifische Docs je nach Feature

**Optional:**
- `/API_REFERENCE.md` — Component Props
- `/TECHNICAL_REFERENCE.md` — Troubleshooting

---

### Backend Developer
**Must Read:**
1. [ARCHITECTURE.md](./ARCHITECTURE.md) → Section "Technical Architecture"
2. Module-Definitions für Datenflüsse zwischen Modulen

**Optional:**
- `/TECHNICAL_REFERENCE.md` — Backend Config

---

### QA / Tester
**Must Read:**
1. [ARCHITECTURE.md](./ARCHITECTURE.md) → "Navigation & User Journey"
2. [CHANGELOG.md](./CHANGELOG.md) — Was ist neu?
3. Module-Definitions für Expected Behavior

---

## 📚 Documentation Types

### 1. Product Documentation (`/docs/`)
**Fokus:** Was, Warum, Für Wen

- Produktstrategie
- Modul-Definitionen
- Scope & Abgrenzungen
- User Journeys
- Roadmap

**Zielgruppe:** Product Team, Design Team, alle die "das große Bild" brauchen

---

### 2. Technical Documentation (Root Level)
**Fokus:** Wie, Womit, Setup

- Code-Struktur
- Component APIs
- Config Files
- Troubleshooting
- Development Workflow

**Zielgruppe:** Development Team

---

### 3. Component Documentation (Component READMEs)
**Fokus:** Spezifische UI-Implementation

- Component Usage
- Props & APIs
- Styling Patterns
- Best Practices

**Zielgruppe:** Frontend Developers

---

## 🔍 Find Information By Topic

### "Ich will verstehen, wie CreatorOS funktioniert"
→ [ARCHITECTURE.md](./ARCHITECTURE.md)

### "Ich will wissen, was Brand OS genau macht"
→ [BRANDOS-DEFINITION.md](./BRANDOS-DEFINITION.md)

### "Ich will wissen, was Content OS genau macht"
→ [CONTENTOS-DEFINITION.md](./CONTENTOS-DEFINITION.md)

### "Ich will das Projekt lokal starten"
→ `/QUICK_START.md`

### "Ich will eine neue Component bauen"
→ `/API_REFERENCE.md` + `/COMPONENT_CATALOG.md`

### "Ich will wissen, welche Colors/Fonts/Radius wir nutzen"
→ [ARCHITECTURE.md](./ARCHITECTURE.md) → Section "Design System"

### "Ich will wissen, wie Module miteinander Daten austauschen"
→ [ARCHITECTURE.md](./ARCHITECTURE.md) → Section "Datenfluss zwischen Modulen"

### "Ich will wissen, was als Nächstes kommt"
→ [ARCHITECTURE.md](./ARCHITECTURE.md) → Section "Roadmap"  
→ [CHANGELOG.md](./CHANGELOG.md) → Section "Upcoming"

### "Ich habe einen Bug / Error"
→ `/TECHNICAL_REFERENCE.md` → Section "Troubleshooting"

### "Ich will ein neues Modul vorschlagen"
→ [ARCHITECTURE.md](./ARCHITECTURE.md) → Section "Modul-Kriterien"

---

## 🆕 Recently Updated

### 2026-04-07
- ✅ [ARCHITECTURE.md](./ARCHITECTURE.md) — NEU: Vollständige System-Architektur
- ✅ [BRANDOS-DEFINITION.md](./BRANDOS-DEFINITION.md) — NEU: Brand OS Modul-Definition
- ✅ [CONTENTOS-DEFINITION.md](./CONTENTOS-DEFINITION.md) — NEU: Content OS Modul-Definition
- ✅ [CHANGELOG.md](./CHANGELOG.md) — NEU: Product Version History
- ✅ `/README.md` — AKTUALISIERT: Neuer Fokus auf modulare Architektur

---

## 💡 Documentation Best Practices

### Beim Lesen
1. Start mit [ARCHITECTURE.md](./ARCHITECTURE.md) für Context
2. Gehe dann zu spezifischen Modul-Docs
3. Check Technical Docs nur wenn du Code schreibst

### Beim Updaten
1. **ARCHITECTURE.md** updaten bei System-Changes
2. **Modul-Definition** updaten bei Feature-Changes in Modul
3. **CHANGELOG.md** updaten bei jedem Release
4. **Component READMEs** updaten bei Component-Changes

### Beim Erstellen neuer Docs
1. Überlege: Ist das Product oder Technical Info?
2. Product → `/docs/`
3. Technical → Root Level oder `/src/app/components/`

---

## 🔗 Quick Links

### Most Important
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System Architecture
- [README.md](./README.md) — Documentation Overview
- [CHANGELOG.md](./CHANGELOG.md) — What's New

### Module Specs
- [BRANDOS-DEFINITION.md](./BRANDOS-DEFINITION.md)
- [CONTENTOS-DEFINITION.md](./CONTENTOS-DEFINITION.md)

### Technical
- [QUICK_START.md](../QUICK_START.md)
- [DOCUMENTATION.md](../DOCUMENTATION.md)
- [API_REFERENCE.md](../API_REFERENCE.md)

---

## 📞 Still Lost?

### Product Questions
**Read:** [ARCHITECTURE.md](./ARCHITECTURE.md)  
**Focus on:** Sections 1-7, 9-11

### Technical Questions
**Read:** `/DOCUMENTATION.md`  
**Focus on:** Setup, Structure, Component Guide

### Module-Specific Questions
**Read:** Respective Module Definition in `/docs/`

---

**Last Updated:** 2026-04-07  
**Maintained by:** Product Team
