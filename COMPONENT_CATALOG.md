# CreatorOS Component Catalog

Complete reference of all components in the CreatorOS system.

**Version:** 37  
**Total Components:** 100+  
**Last Updated:** 2026-03-28

---

## 📑 Table of Contents

1. [Shared Primitives](#shared-primitives) (6 components)
2. [Generate Components](#generate-components) (6 components)
3. [Library Components](#library-components) (14 components)
4. [Marketing Components](#marketing-components) (10 components)
5. [Layout Components](#layout-components) (3 components)
6. [UI Components (shadcn)](#ui-components-shadcn) (70+ components)
7. [Page Components](#page-components) (5 components)
8. [Screen Components](#screen-components) (2 components)

---

## 🧩 Shared Primitives

Located in: `/src/app/components/shared/`

---

### 1. Badge

**File:** `Badge.tsx`  
**Purpose:** Status indicators, labels, module tags  
**Lines:** 45

#### Props

```typescript
interface BadgeProps {
  variant?: 'pink' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}
```

#### Variants

| Variant | Background | Use Case |
|---------|------------|----------|
| `pink` | `linear-gradient(135deg, #FFBFDE, #E7C6F3)` | Primary badges, Module 01 |
| `purple` | `linear-gradient(135deg, #DABFFF, #E7C6F3)` | Secondary badges |
| `neutral` | `rgba(255, 255, 255, 0.05)` | Status badges |

#### Sizes

| Size | Font | Padding |
|------|------|---------|
| `sm` | 10px | 2px 8px |
| `md` | 11px | 3px 12px |

#### Usage

```tsx
import { Badge } from '../shared';

<Badge variant="pink" size="md">Module 01</Badge>
<Badge variant="neutral" size="sm">Active</Badge>
```

#### Used In
- Topbar (Generate)
- AssetCard (Generate)
- ReuseBanner (Generate)
- PageHeader (Library)
- DrawerMetadata (Library)
- LibraryTopbar (Library)

---

### 2. SectionLabel

**File:** `SectionLabel.tsx`  
**Purpose:** Section headers with consistent typography  
**Lines:** 24

#### Props

```typescript
interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
}
```

#### Styling
- Font Size: 12px
- Font Weight: 600
- Text Transform: Uppercase
- Letter Spacing: 0.08em
- Default Color: #8B8F9E

#### Usage

```tsx
import { SectionLabel } from '../shared';

<SectionLabel>Input Layer</SectionLabel>
<SectionLabel color="#FFBFDE">Custom Color</SectionLabel>
```

#### Used In
- InputPanel (Generate)
- OutputWorkspaceHeader (Generate)
- OrganizationRail (Library)

---

### 3. EmptyState

**File:** `EmptyState.tsx`  
**Purpose:** Empty state messages  
**Lines:** 34

#### Props

```typescript
interface EmptyStateProps {
  title: string;
  description?: string;
}
```

#### Styling
- Centered layout
- Muted text colors
- Icon (optional)
- Consistent spacing

#### Usage

```tsx
import { EmptyState } from '../shared';

<EmptyState 
  title="No assets yet" 
  description="Generate content to see it here"
/>
```

#### Used In
- library.tsx (Screen)
- Future: generate.tsx (when cleared)

---

### 4. PageHeader

**File:** `PageHeader.tsx`  
**Purpose:** Page titles with badge and description  
**Lines:** 48

#### Props

```typescript
interface PageHeaderProps {
  title: string;
  description: string;
  badgeText?: string;
}
```

#### Structure
- Badge (optional)
- Title (28px, bold)
- Description (14px, muted)

#### Usage

```tsx
import { PageHeader } from '../shared';

<PageHeader 
  title="Asset Library"
  description="Your saved content assets"
  badgeText="Module 01"
/>
```

#### Used In
- PageHeader (Library component wrapper)
- OrganizationRail (Library)

---

### 5. PanelShell

**File:** `PanelShell.tsx`  
**Purpose:** Consistent panel/card styling  
**Lines:** 38

#### Props

```typescript
interface PanelShellProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

#### Styling
- Background: `linear-gradient(135deg, #1F2230, #171923)`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Shadow: Midground elevation
- Radius: 16px
- Padding: 24px

#### Usage

```tsx
import { PanelShell } from '../shared';

<PanelShell onClick={() => handleClick()}>
  <div>Panel Content</div>
</PanelShell>
```

#### Future Use
- AssetCard base
- AssetCardGrid base
- Custom panels

---

### 6. HelperNote

**File:** `HelperNote.tsx`  
**Purpose:** Inline info blocks, notifications  
**Lines:** 42

#### Props

```typescript
interface HelperNoteProps {
  variant?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}
```

#### Variants

| Variant | Border Color | Background |
|---------|-------------|------------|
| `info` | Blue tint | `rgba(100, 150, 255, 0.1)` |
| `warning` | Orange tint | `rgba(255, 150, 100, 0.1)` |
| `success` | Green tint | `rgba(100, 255, 150, 0.1)` |

#### Usage

```tsx
import { HelperNote } from '../shared';

<HelperNote variant="info">
  This is a helpful note
</HelperNote>
```

#### Future Use
- Brand Voice guidance
- Planner tips
- Validation messages

---

## 🎨 Generate Components

Located in: `/src/app/components/generate/`

---

### 1. Topbar

**File:** `Topbar.tsx`  
**Purpose:** Top navigation bar  
**Lines:** 98

#### Props

```typescript
interface TopbarProps {
  activeView: 'generate' | 'library';
}
```

#### Features
- CreatorOS branding
- Module badge
- Navigation links (Generate, Library)
- Active state highlighting

#### Structure
```
┌────────────────────────────────────┐
│ CreatorOS [Module 01]  Generate Library │
└────────────────────────────────────┘
```

#### Usage

```tsx
import { Topbar } from '../components/generate/Topbar';

<Topbar activeView="generate" />
```

---

### 2. InputPanel

**File:** `InputPanel.tsx`  
**Purpose:** Left sidebar input form  
**Lines:** 187

#### Props

```typescript
interface InputPanelProps {
  formData: {
    offer: string;
    audience: string;
    platform: string;
    goal: string;
    tone: string;
    outputType: string;
  };
  onFormChange: (field: string, value: string) => void;
  onGenerate: () => void;
  onClearAll: () => void;
}
```

#### Features
- Section header with badge
- 6 form fields
- "Generate Content" CTA
- "Clear All" action
- Field labels with SectionLabel

#### Form Fields
1. Offer/Product
2. Audience
3. Platform
4. Goal
5. Tone
6. Output Type (dropdown)

#### Layout
- Width: 36% of screen
- Sticky positioning
- Dark panel background
- Premium elevation

#### Usage

```tsx
<InputPanel
  formData={formData}
  onFormChange={(field, value) => setFormData({...formData, [field]: value})}
  onGenerate={handleGenerate}
  onClearAll={handleClear}
/>
```

---

### 3. OutputWorkspaceHeader

**File:** `OutputWorkspaceHeader.tsx`  
**Purpose:** Output section header  
**Lines:** 76

#### Props

```typescript
interface OutputWorkspaceHeaderProps {
  assetCount: number;
  onSaveToLibrary: () => void;
}
```

#### Features
- Session metadata
- Content suite title
- Asset count display
- "Save All to Library" button

#### Structure
```
Output Layer                    [Save All to Library]
Content Suite — 8 assets
```

#### Usage

```tsx
<OutputWorkspaceHeader 
  assetCount={8}
  onSaveToLibrary={() => console.log('saving...')}
/>
```

---

### 4. AssetCard

**File:** `AssetCard.tsx`  
**Purpose:** Reusable content asset card  
**Lines:** 152

#### Props

```typescript
interface AssetCardProps {
  type: string;
  variant: string;
  items: Array<{ label: string; content: string }>;
  metadata?: string;
  accentColor: string;
  icon: React.ReactNode;
  onRegenerate: () => void;
  onCopy: () => void;
  onSaveToLibrary: () => void;
}
```

#### Features
- Custom icon & accent color
- Badge with type
- Numbered content items
- Metadata footer
- 3 action buttons

#### Structure
```
┌────────────────────────────────┐
│ [Icon] [Badge] Type            │
│ Variant                        │
├────────────────────────────────┤
│ 1. Content item                │
│ 2. Content item                │
├────────────────────────────────┤
│ Metadata  [Regen] [Copy] [Save]│
└────────────────────────────────┘
```

#### Usage

```tsx
<AssetCard
  type="Hook"
  variant="Problem-Solution"
  items={[
    { label: 'Variant 1', content: 'Hook text...' }
  ]}
  metadata="3 variants"
  accentColor="#FFBFDE"
  icon={<SparklesIcon />}
  onRegenerate={() => {}}
  onCopy={() => {}}
  onSaveToLibrary={() => {}}
/>
```

---

### 5. ReuseBanner

**File:** `ReuseBanner.tsx`  
**Purpose:** Contextual banner for reused assets  
**Lines:** 124

#### Props

```typescript
interface ReuseBannerProps {
  assetType: string;
  assetVariant: string;
  onBackToLibrary: () => void;
  onClearAndFresh: () => void;
  onDismiss: () => void;
}
```

#### Features
- Reuse context info
- "Back to Library" button
- "Clear & Start Fresh" button
- Dismiss (X) button
- Pink accent background

#### Structure
```
┌────────────────────────────────────┐
│ Reusing Hook — Problem-Solution    │
│ [Back to Library] [Clear & Fresh] [X]│
└────────────────────────────────────┘
```

#### Usage

```tsx
<ReuseBanner
  assetType="Hook"
  assetVariant="Problem-Solution"
  onBackToLibrary={() => navigate('/library')}
  onClearAndFresh={handleClear}
  onDismiss={handleDismiss}
/>
```

---

## 📚 Library Components

Located in: `/src/app/components/library/`

---

### 1. LibraryTopbar

**File:** `LibraryTopbar.tsx`  
**Purpose:** Top navigation bar  
**Lines:** 98

#### Props

```typescript
interface LibraryTopbarProps {
  activeView: 'generate' | 'library';
}
```

#### Features
- Same as Generate Topbar
- Active state on Library

---

### 2. OrganizationRail

**File:** `OrganizationRail.tsx`  
**Purpose:** Left sidebar with filters  
**Lines:** 84

#### Props

```typescript
interface OrganizationRailProps {
  filterType: string;
  filterCampaign: string;
  filterPlatform: string;
  filterGoal: string;
  onFilterChange: (type: string, value: string) => void;
  onNewGeneration: () => void;
}
```

#### Features
- PageHeader component
- 3 FilterGroup components
- "New Generation" CTA
- Width: 30% of screen

#### Filter Groups
1. Content Type (All, Hooks, Scripts, Captions, Plans)
2. Campaigns (All, Launch Q1, Batch Content, Educational)
3. Platform (All, Instagram, YouTube, LinkedIn)

#### Usage

```tsx
<OrganizationRail
  filterType={filterType}
  filterCampaign={filterCampaign}
  filterPlatform={filterPlatform}
  filterGoal={filterGoal}
  onFilterChange={(type, value) => {}}
  onNewGeneration={() => navigate('/generate')}
/>
```

---

### 3. PageHeader

**File:** `PageHeader.tsx`  
**Purpose:** Library header (wrapper around shared)  
**Lines:** 23

#### Features
- Uses shared PageHeader primitive
- Library-specific title/description
- Module 01 badge

---

### 4. FilterGroup

**File:** `FilterGroup.tsx`  
**Purpose:** Reusable filter group  
**Lines:** 29

#### Props

```typescript
interface FilterGroupProps {
  title: string;
  options: Array<{
    value: string;
    label: string;
    count?: number;
  }>;
  activeValue: string;
  onFilterChange: (value: string) => void;
}
```

#### Features
- Group title
- List of FilterItem components
- Active state management

#### Usage

```tsx
<FilterGroup
  title="Content Type"
  options={[
    { value: 'all', label: 'All Assets', count: 10 },
    { value: 'hooks', label: 'Hooks', count: 3 }
  ]}
  activeValue={filterType}
  onFilterChange={setFilterType}
/>
```

---

### 5. FilterItem

**File:** `FilterItem.tsx`  
**Purpose:** Individual filter button  
**Lines:** 38

#### Props

```typescript
interface FilterItemProps {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}
```

#### Features
- Label text
- Optional count badge
- Active state styling
- Click handler

---

### 6. LibraryToolbar

**File:** `LibraryToolbar.tsx`  
**Purpose:** Search, View, Sort controls  
**Lines:** 62

#### Props

```typescript
interface LibraryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}
```

#### Features
- SearchInput component
- ViewToggle component
- SortControl component
- Horizontal layout

#### Structure
```
┌────────────────────────────────────┐
│ [Search]  [Grid/List]  [Sort ▼]   │
└────────────────────────────────────┘
```

---

### 7. SearchInput

**File:** `SearchInput.tsx`  
**Purpose:** Search field  
**Lines:** 34

#### Features
- Search icon (lucide-react)
- Placeholder text
- onChange handler
- Dark input styling

---

### 8. ViewToggle

**File:** `ViewToggle.tsx`  
**Purpose:** Grid/List toggle  
**Lines:** 48

#### Features
- Grid icon (LayoutGrid)
- List icon (List)
- Active state highlighting
- Toggle functionality

---

### 9. SortControl

**File:** `SortControl.tsx`  
**Purpose:** Sort dropdown  
**Lines:** 52

#### Features
- Dropdown select
- Sort options (Recent, Oldest, A-Z, Z-A)
- ChevronDown icon
- onChange handler

---

### 10. AssetGrid

**File:** `AssetGrid.tsx`  
**Purpose:** Grid layout wrapper  
**Lines:** 32

#### Props

```typescript
interface AssetGridProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onAssetCopy: (asset: Asset) => void;
  onAssetReuse: (asset: Asset) => void;
}
```

#### Features
- 2-column grid
- Maps to AssetCardGrid
- Click, Copy, Reuse handlers

---

### 11. AssetList

**File:** `AssetList.tsx`  
**Purpose:** List layout wrapper  
**Lines:** 32

#### Props
- Same as AssetGrid

#### Features
- Single column
- Maps to AssetRowList

---

### 12. AssetCardGrid

**File:** `AssetCardGrid.tsx`  
**Purpose:** Grid view asset card  
**Lines:** 89

#### Features
- Compact card design
- Type badge
- Content preview
- Click to open drawer
- Copy & Reuse buttons

---

### 13. AssetRowList

**File:** `AssetRowList.tsx`  
**Purpose:** List view asset row  
**Lines:** 94

#### Features
- Horizontal layout
- Type badge
- Content preview
- Metadata (campaign, platform, date)
- Copy & Reuse buttons

---

### 14. PreviewDrawer

**File:** `PreviewDrawer.tsx`  
**Purpose:** Asset detail drawer  
**Lines:** 101

#### Props

```typescript
interface PreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  asset: Asset | null;
  onCopy: () => void;
  onReuse: () => void;
}
```

#### Features
- Vaul-based drawer
- Slides from right
- DrawerHeader component
- Content preview
- Variants list
- DrawerMetadata component
- DrawerActions component

#### Structure
```
┌────────────────────────┐
│ DrawerHeader      [X]  │
├────────────────────────┤
│ Content Preview        │
│ Variants (1-8)         │
├────────────────────────┤
│ DrawerMetadata         │
├────────────────────────┤
│ DrawerActions          │
└────────────────────────┘
```

---

### DrawerHeader

**File:** `DrawerHeader.tsx`  
**Purpose:** Drawer header section  
**Lines:** 61

#### Features
- Asset type badge
- Title
- Close button
- Platform/Campaign/Date metadata

---

### DrawerMetadata

**File:** `DrawerMetadata.tsx`  
**Purpose:** Drawer metadata section  
**Lines:** 28

#### Features
- Brand voice display
- Status badge
- Structured layout

---

### DrawerActions

**File:** `DrawerActions.tsx`  
**Purpose:** Drawer action buttons  
**Lines:** 97

#### Features
- Copy to Clipboard (primary)
- Reuse in Generate (primary)
- Export (coming soon)
- Archive (coming soon)
- Button styling with icons

---

## 🏠 Marketing Components

Located in: `/src/app/components/`

---

### 1. Navbar

**File:** `navbar.tsx`  
**Purpose:** Global navigation  
**Lines:** 120

#### Features
- Fixed position
- Backdrop blur (glassmorphism)
- Logo with gradient
- Navigation links (Home, Modules, Pricing, About)
- CTAs (Sign In, Start Creating)
- Premium light edges

#### Structure
```
┌────────────────────────────────────┐
│ [Logo] CreatorOS  [Nav]  [CTAs]   │
└────────────────────────────────────┘
```

---

### 2. Footer

**File:** `footer.tsx`  
**Purpose:** Global footer  
**Lines:** 156

#### Features
- Multi-column layout (4 columns)
- Link groups (Platform, Resources, Company, Legal)
- Social links
- Copyright notice
- Dark premium styling

#### Columns
1. Platform (Modules, Pricing, Docs)
2. Resources (Blog, Support, API)
3. Company (About, Careers, Contact)
4. Legal (Privacy, Terms, Security)

---

### 3. Hero

**File:** `hero.tsx`  
**Purpose:** Homepage hero  
**Lines:** 343

#### Features
- Architektonische background planes
- Editorial text stack (left)
- Premium OS surface (right)
- Input/Output/Library visualization
- 2 CTA buttons
- 3D panel hierarchy

#### Layout
```
┌──────────────────────────────────┐
│                                  │
│  Editorial         OS Preview    │
│  Stack             (3D Panels)   │
│                                  │
│  [Start] [Explore]               │
└──────────────────────────────────┘
```

---

### 4. Platform Statement

**File:** `platform-statement.tsx`  
**Purpose:** Value proposition section  
**Lines:** 98

#### Features
- Large headline
- 3-column feature grid
- Icon-based highlights
- Premium styling

---

### 5. Featured Module

**File:** `featured-module.tsx`  
**Purpose:** Content OS highlight  
**Lines:** 142

#### Features
- Asymmetric layout
- Content preview
- Module badge
- "Launch Content OS" CTA
- Pink accent

---

### 6. How It Works

**File:** `how-it-works.tsx`  
**Purpose:** Process explanation  
**Lines:** 116

#### Features
- 3-step workflow
- Numbered steps with icons
- Input → Generate → Library
- Visual flow

---

### 7. What You Can Create

**File:** `what-you-can-create.tsx`  
**Purpose:** Output examples showcase  
**Lines:** 187

#### Features
- Grid of content types
- Hooks, Scripts, Captions, Plans
- Visual examples with mock content
- Accent colors per type

---

### 8. Why Not Chat

**File:** `why-not-chat.tsx`  
**Purpose:** Differentiation section  
**Lines:** 134

#### Features
- Comparison grid (2 columns)
- Chat vs Content OS
- Highlighted benefits (checkmarks)
- Visual contrast (muted vs highlighted)

---

### 9. Ecosystem Preview

**File:** `ecosystem-preview.tsx`  
**Purpose:** Module showcase  
**Lines:** 168

#### Features
- 6 module icons
- "Coming Soon" badges
- Future vision messaging
- Grid layout

---

### 10. Final CTA

**File:** `final-cta.tsx`  
**Purpose:** Conversion section  
**Lines:** 89

#### Features
- Prominent CTA button
- Value proposition
- High-contrast design
- Pink gradient background

---

## 📄 Page Components

Located in: `/src/app/pages/`

---

### 1. HomePage

**File:** `home.tsx`  
**Purpose:** Marketing homepage  
**Lines:** 27

#### Component Stack
1. Navbar
2. Hero
3. PlatformStatement
4. FeaturedModule
5. HowItWorks
6. WhatYouCanCreate
7. WhyNotChat
8. EcosystemPreview
9. FinalCTA
10. Footer

---

### 2. ModulesPage

**File:** `modules.tsx`  
**Purpose:** Module ecosystem overview  
**Lines:** 528

#### Features
- Hero section
- 6 module cards (2-column grid)
- Status badges (Active/Coming Soon/Planned)
- Module-specific accent colors
- Feature lists
- CTAs (Learn More, Launch)
- Bottom CTA section

#### Module Cards
1. Content OS (Active) - #FFBFDE
2. Campaign OS (Coming Soon) - #E7C6F3
3. Analytics OS (Coming Soon) - #DABFFF
4. Community OS (Planned) - #FFBFDE
5. Brand OS (Planned) - #E7C6F3
6. Research OS (Planned) - #DABFFF

---

### 3. ContentOSProductPage

**File:** `content-os-product.tsx`  
**Purpose:** Content OS marketing page  
**Lines:** 650+

#### Sections
1. Product Hero (with "Back to Modules" link)
2. Premium Product Preview (Input/Output visualization)
3. Why Not Chat (Differentiation)
4. Asset Library Concept
5. Brand Voice System

---

### 4. ContentOSAppPage

**File:** `content-os-app.tsx`  
**Purpose:** Generate screen wrapper  
**Lines:** 13

#### Features
- Imports GenerateScreen
- Clean wrapper

---

### 5. ContentOSLibraryPage

**File:** `content-os-library.tsx`  
**Purpose:** Library screen wrapper  
**Lines:** 13

#### Features
- Imports LibraryScreen
- Clean wrapper

---

## 🖥️ Screen Components

Located in: `/src/app/screens/`

---

### 1. GenerateScreen

**File:** `generate.tsx`  
**Purpose:** Content generation interface  
**Lines:** 252

#### Layout
- Topbar
- Optional ReuseBanner
- 2-column layout (InputPanel 36%, OutputWorkspace 64%)

#### State
- formData
- generatedAssets
- showReuseBanner
- reusedAsset

---

### 2. LibraryScreen

**File:** `library.tsx`  
**Purpose:** Asset library interface  
**Lines:** 238

#### Layout
- LibraryTopbar
- 2-column layout (OrganizationRail 30%, Workspace 70%)
- PreviewDrawer (overlay)

#### State
- searchQuery
- filterType/Campaign/Platform/Goal
- sortBy
- viewMode
- selectedAsset
- drawerOpen

---

## 📊 Summary Statistics

### By Category

| Category | Count | Lines (Avg) |
|----------|-------|-------------|
| Shared Primitives | 6 | ~35 |
| Generate Components | 6 | ~120 |
| Library Components | 14 | ~55 |
| Marketing Components | 10 | ~130 |
| Page Components | 5 | ~200 |
| Screen Components | 2 | ~245 |
| UI Components (shadcn) | 70+ | ~80 |

### Total
- **Components:** 113+
- **Total Lines:** ~15,000+

---

**End of Component Catalog**
