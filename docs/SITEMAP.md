# CreatorOS — Site Structure & User Flows

Visual overview of all routes, pages, and navigation flows.

---

## 🗺️ Complete Site Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         CreatorOS                                │
│                    Modular Creator Platform                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │           Landing Page (/)               │
        │  • Hero + Value Proposition              │
        │  • Module Preview                        │
        │  • CTA to Dashboard/Modules              │
        └─────────────────────────────────────────┘
                      │             │
        ┌─────────────┘             └──────────────┐
        ▼                                          ▼
┌──────────────────┐                    ┌──────────────────────┐
│   Dashboard      │                    │   Modules Page       │
│  (/dashboard)    │                    │   (/modules)         │
├──────────────────┤                    ├──────────────────────┤
│ • Core Workflow  │                    │ Tab Navigation:      │
│   Progress       │                    │ • Core Workflow      │
│ • Add-on Modules │                    │ • Add-on Modules     │
│ • Quick Actions  │                    │ • All Modules        │
└──────────────────┘                    └──────────────────────┘
        │                                          │
        │                                          ▼
        │                        ┌─────────────────────────────────┐
        │                        │   Module Product Pages          │
        │                        │   (/modules/{module-name})      │
        │                        ├─────────────────────────────────┤
        │                        │ • /modules/brand-os             │
        │                        │ • /modules/content-os           │
        │                        │ • /modules/launch-os            │
        │                        │ • /modules/management-os        │
        │                        │ • /modules/analytics-os         │
        │                        │ • /modules/community-os         │
        │                        │ • /modules/research-os          │
        │                        └─────────────────────────────────┘
        │                                          │
        └──────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────────┐
        │              Module Applications                 │
        │           (/app/{module-name}/{view})            │
        └─────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Brand OS    │    │   Content OS     │    │   Future         │
│   Setup      │    │   Generate       │    │   Modules        │
├──────────────┤    ├──────────────────┤    ├──────────────────┤
│ /app/brand-  │    │ /app/content-os/ │    │ • Launch OS      │
│  os/setup    │    │  generate        │    │ • Management OS  │
│              │    │                  │    │ • Analytics OS   │
│ • 6-Step     │    │ • Input Panel    │    │ • Community OS   │
│   Setup Flow │    │ • Output Display │    │ • Research OS    │
│ • Brand      │    │ • Save to Library│    │                  │
│   Profile    │    │                  │    │ Coming Soon      │
│ • Voice      │    ├──────────────────┤    │                  │
│   Config     │    │ /app/content-os/ │    │                  │
│              │    │  library         │    │                  │
│              │    │                  │    │                  │
│              │    │ • Asset Grid     │    │                  │
│              │    │ • Filter/Search  │    │                  │
│              │    │ • Preview Drawer │    │                  │
└──────────────┘    └──────────────────┘    └──────────────────┘
```

---

## 🧭 Navigation Patterns

### Primary Navigation (Navbar)
```
┌───────────────────────────────────────────────────────────┐
│  Logo  │  Home  │  Dashboard  │  Modules  │  Pricing      │
└───────────────────────────────────────────────────────────┘
                                                    ▲
                                                    │
                                           CTA: "Start Creating"
```

### User Journey Flows

#### Flow 1: First-Time User (Recommended Path)
```
Landing Page (/)
    ↓
    "Get Started" CTA
    ↓
Dashboard (/dashboard)
    ↓
    See Core Workflow → Module 01: Brand OS
    ↓
    Click "Launch Brand OS"
    ↓
Brand OS Setup (/app/brand-os/setup)
    ↓
    Complete 6-Step Setup
    ↓
    Save Brand Profile
    ↓
    "Create Content" CTA
    ↓
Content OS Generate (/app/content-os/generate)
    ↓
    Input Idea + Generate
    ↓
    Review Hooks/Scripts/Captions
    ↓
    Save to Library
    ↓
Content OS Library (/app/content-os/library)
    ↓
    Manage Assets, Copy, Reuse
```

#### Flow 2: Returning User (Quick Access)
```
Dashboard (/dashboard)
    ↓
    Quick Launch Button
    ↓
Last Used Module App
```

#### Flow 3: Exploring Modules
```
Modules Page (/modules)
    ↓
    Tab: "Core Workflow" | "Add-on Modules" | "All Modules"
    ↓
    Click Module Card
    ↓
Module Product Page (/modules/{name})
    ↓
    "Learn More" or "Launch Module"
    ↓
Module App (/app/{name}/{view})
```

---

## 📍 Route Reference

### Marketing Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `HomePage` | Landing page with value prop |
| `/dashboard` | `DashboardPage` | Personalized workflow overview |
| `/modules` | `ModulesPage` | All modules with tab navigation |

### Module Product Pages

| Route | Component | Status | Module |
|-------|-----------|--------|--------|
| `/modules/brand-os` | `BrandOSProductPage` | ✅ Active | Brand OS |
| `/modules/content-os` | `ContentOSProductPage` | ✅ Active | Content OS |
| `/modules/launch-os` | `LaunchOSProductPage` | 🚧 Coming Soon | Launch OS |
| `/modules/management-os` | `ManagementOSProductPage` | 🚧 Coming Soon | Management OS |
| `/modules/analytics-os` | `AnalyticsOSProductPage` | 🚧 Coming Soon | Analytics OS |
| `/modules/community-os` | `CommunityOSProductPage` | 📋 Planned | Community OS |
| `/modules/research-os` | `ResearchOSProductPage` | 📋 Planned | Research OS |

### Module Apps

| Route | Component | Purpose |
|-------|-----------|---------|
| `/app/brand-os/setup` | `BrandOSAppPage` | 6-step brand setup flow |
| `/app/content-os/generate` | `ContentOSAppPage` | Content generation interface |
| `/app/content-os/library` | `ContentOSLibraryPage` | Asset library management |

### Utility Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/test` | `UserTest` | Testing/development page |
| `*` | `NotFoundPage` | 404 error page |

---

## 🔄 Navigation States

### Active State Indicators

**Navbar Links:**
- Active route shows underline accent on hover
- Current page highlighted (optional enhancement)

**Dashboard:**
- Active modules show "Active" badge + accent glow
- Completed steps show checkmark
- Coming Soon modules show lock icon + muted state

**Modules Page:**
- Active tab shows accent background + border
- Active modules show pink/purple accent
- Status badges: Active | Coming Soon | Planned

---

## 🎯 Key User Journeys

### Journey 1: "I want to define my brand"
```
Entry Point: Any page
    ↓
Navbar → "Dashboard" OR Direct Link
    ↓
Dashboard → Core Workflow Section → Module 01: Brand OS
    ↓
Click "Launch Brand OS"
    ↓
/app/brand-os/setup
    ↓
Complete Setup → Save Profile
```

### Journey 2: "I want to create content"
```
Entry Point: Dashboard OR Modules Page
    ↓
Navigate to Content OS
    ↓
/app/content-os/generate
    ↓
Input Idea → Generate → Review → Save
    ↓
Navigate to Library
    ↓
/app/content-os/library
```

### Journey 3: "I want to explore what's available"
```
Entry Point: Landing Page
    ↓
Click "Explore Modules"
    ↓
/modules
    ↓
Switch between Tabs: Core | Add-ons | All
    ↓
Click Module Card → "Learn More"
    ↓
/modules/{module-name}
    ↓
Read Product Page
    ↓
"Launch Module" (if active)
```

### Journey 4: "I want to see my workflow progress"
```
Entry Point: Any page
    ↓
Navbar → "Dashboard"
    ↓
/dashboard
    ↓
View Core Workflow Progress
    ↓
See which modules are complete/active/coming
    ↓
Quick Launch active modules
```

---

## 🔗 Cross-Module Navigation

### Brand OS → Content OS
```
/app/brand-os/setup
    ↓
Complete Setup
    ↓
Success Screen: "Your brand is ready"
    ↓
CTA: "Create Content with Brand OS"
    ↓
/app/content-os/generate
    (with Brand Profile automatically loaded)
```

### Content OS Generate → Library
```
/app/content-os/generate
    ↓
Generate Assets
    ↓
Click "Save to Library"
    ↓
Success Toast
    ↓
Link in Toast OR Topbar Button
    ↓
/app/content-os/library
```

### Library → Generate (Reuse)
```
/app/content-os/library
    ↓
View Asset in Preview Drawer
    ↓
Click "Reuse" Button
    ↓
/app/content-os/generate
    (with original idea pre-filled)
```

---

## 📊 Navigation Hierarchy

```
Level 1: Marketing
├── Landing Page (/)
├── Dashboard (/dashboard)
└── Modules (/modules)

Level 2: Product Pages
├── Brand OS Product (/modules/brand-os)
├── Content OS Product (/modules/content-os)
├── Launch OS Product (/modules/launch-os)
├── Management OS Product (/modules/management-os)
├── Analytics OS Product (/modules/analytics-os)
├── Community OS Product (/modules/community-os)
└── Research OS Product (/modules/research-os)

Level 3: Applications
├── Brand OS Setup (/app/brand-os/setup)
├── Content OS Generate (/app/content-os/generate)
├── Content OS Library (/app/content-os/library)
└── [Future Module Apps]
```

---

## 🚪 Entry Points by User Type

### New User
**Primary Entry:** Landing Page (/)  
**Goal:** Understand value → Sign up → Start with Dashboard

### Returning User
**Primary Entry:** Dashboard (/dashboard)  
**Goal:** Quick access to active modules

### Explorer
**Primary Entry:** Modules Page (/modules)  
**Goal:** Browse all available modules

### Direct Access (Bookmark)
**Primary Entry:** Module App (/app/{module}/{view})  
**Goal:** Continue work where left off

---

## 🎨 Visual Navigation Patterns

### Tab Navigation (Modules Page)
```
┌─────────────────────────────────────────────────────────┐
│  [Core Workflow]  [Add-on Modules]  [All Modules]       │
│       ↑ Active                                           │
└─────────────────────────────────────────────────────────┘
```

### Workflow Progress (Dashboard)
```
┌──────────┐
│ 01       │  Brand OS
│ Brand OS │  ✅ Active — Voice & Identity Foundation
└──────────┘
     │
     ▼ Connector
┌──────────┐
│ 02       │  Content OS
│ContentOS │  ✅ Active — Content Generation
└──────────┘
     │
     ▼ Connector
┌──────────┐
│ 03       │  Launch OS
│LaunchOS  │  🚧 Coming Q2 — Rollout & Coordination
└──────────┘
     │
     ▼ Connector
┌──────────┐
│ 04       │  Management OS
│ManagmtOS │  🚧 Coming Q2 — Scheduling & Execution
└──────────┘
     │
     ▼ Connector
┌──────────┐
│ 05       │  Analytics OS
│Analytics │  🚧 Coming Q3 — Performance Intelligence
└──────────┘
```

### Breadcrumbs (Future Enhancement)
```
Home > Modules > Content OS > Generate
```

---

## 🔄 State Management

### URL State
- Current page/route
- Module selection
- View mode (Grid/List in Library)

### Local State
- Filter selections
- Search queries
- Form inputs
- Preview drawer open/close

### Global State (Future)
- User authentication
- Active brand profile
- User preferences

---

**Last Updated:** 2026-04-07  
**Maintained by:** Product Team