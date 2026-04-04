# CreatorOS API Reference

**Version**: 37  
**Letztes Update**: 2026-03-28

---

## 📑 Inhaltsverzeichnis

1. [Routing API](#routing-api)
2. [Component Props API](#component-props-api)
3. [Shared Primitives API](#shared-primitives-api)
4. [Generate Components API](#generate-components-api)
5. [Library Components API](#library-components-api)
6. [Type Definitions](#type-definitions)
7. [Utility Functions](#utility-functions)

---

## 🧭 Routing API

### Router Configuration

```typescript
// /src/app/routes.ts
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  { path: '/', Component: HomePage },
  { path: '/modules', Component: ModulesPage },
  { path: '/modules/content-os', Component: ContentOSProductPage },
  { path: '/app/content-os/generate', Component: ContentOSAppPage },
  { path: '/app/content-os/library', Component: ContentOSLibraryPage },
]);
```

### Route Paths

| Path | Component | Beschreibung |
|------|-----------|--------------|
| `/` | `HomePage` | Marketing Homepage |
| `/modules` | `ModulesPage` | Module-Übersicht |
| `/modules/content-os` | `ContentOSProductPage` | Content OS Produktseite |
| `/app/content-os/generate` | `ContentOSAppPage` | Content OS Generate App |
| `/app/content-os/library` | `ContentOSLibraryPage` | Content OS Library App |

### Navigation

```tsx
import { Link } from 'react-router';

// Internal Navigation
<Link to="/modules">Go to Modules</Link>

// Programmatic Navigation
import { useNavigate } from 'react-router';
const navigate = useNavigate();
navigate('/app/content-os/generate');
```

---

## 🧩 Component Props API

### Navbar

```tsx
// /src/app/components/navbar.tsx
export function Navbar(): JSX.Element

// Keine Props - Globale Navigation
// Fixed Position, nutzt React Router Links
```

**Verwendung**:
```tsx
import { Navbar } from './components/navbar';
<Navbar />
```

---

### Footer

```tsx
// /src/app/components/footer.tsx
export function Footer(): JSX.Element

// Keine Props - Globaler Footer
```

**Verwendung**:
```tsx
import { Footer } from './components/footer';
<Footer />
```

---

### Hero

```tsx
// /src/app/components/hero.tsx
export function Hero(): JSX.Element

// Keine Props - Homepage Hero mit OS Preview
```

**Features**:
- Architektonische Background Planes
- OS Surface Visualisierung
- CTA Buttons (Start Creating, Explore Modules)

---

## ✨ Shared Primitives API

### Badge

```tsx
// /src/app/components/shared/Badge.tsx
interface BadgeProps {
  variant?: 'pink' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element
```

**Beispiele**:
```tsx
<Badge variant="pink" size="md">Module 01</Badge>
<Badge variant="neutral" size="sm">Active</Badge>
<Badge variant="purple">Coming Soon</Badge>
```

**Varianten**:
- `pink`: Pink Gradient (#FFBFDE)
- `purple`: Purple Gradient (#DABFFF)
- `neutral`: Grayscale

**Größen**:
- `sm`: 10px font, 2px padding
- `md`: 11px font, 3px padding

---

### SectionLabel

```tsx
// /src/app/components/shared/SectionLabel.tsx
interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
}

export function SectionLabel(props: SectionLabelProps): JSX.Element
```

**Beispiele**:
```tsx
<SectionLabel>Input Layer</SectionLabel>
<SectionLabel color="#FFBFDE">Custom Color</SectionLabel>
```

**Default**:
- Uppercase
- 12px font size
- 600 weight
- 0.08em letter-spacing
- #8B8F9E color (wenn nicht angegeben)

---

### EmptyState

```tsx
// /src/app/components/shared/EmptyState.tsx
interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState(props: EmptyStateProps): JSX.Element
```

**Beispiele**:
```tsx
<EmptyState 
  title="No assets yet" 
  description="Generate content to see it here"
/>

<EmptyState title="No results found" />
```

---

### PageHeader

```tsx
// /src/app/components/shared/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  description: string;
  badgeText?: string;
}

export function PageHeader(props: PageHeaderProps): JSX.Element
```

**Beispiele**:
```tsx
<PageHeader 
  title="Asset Library"
  description="Your saved content assets"
  badgeText="Module 01"
/>
```

---

### PanelShell

```tsx
// /src/app/components/shared/PanelShell.tsx
interface PanelShellProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PanelShell(props: PanelShellProps): JSX.Element
```

**Beispiele**:
```tsx
<PanelShell onClick={() => console.log('clicked')}>
  <div>Panel Content</div>
</PanelShell>
```

**Features**:
- Dark gradient background
- Border & Shadow
- Optional click handler
- Customizable className

---

### HelperNote

```tsx
// /src/app/components/shared/HelperNote.tsx
interface HelperNoteProps {
  variant?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}

export function HelperNote(props: HelperNoteProps): JSX.Element
```

**Beispiele**:
```tsx
<HelperNote variant="info">This is a helpful note</HelperNote>
<HelperNote variant="warning">Warning message</HelperNote>
<HelperNote variant="success">Success message</HelperNote>
```

---

## 🎨 Generate Components API

### Topbar

```tsx
// /src/app/components/generate/Topbar.tsx
interface TopbarProps {
  activeView: 'generate' | 'library';
}

export function Topbar(props: TopbarProps): JSX.Element
```

**Beispiele**:
```tsx
<Topbar activeView="generate" />
<Topbar activeView="library" />
```

---

### InputPanel

```tsx
// /src/app/components/generate/InputPanel.tsx
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

export function InputPanel(props: InputPanelProps): JSX.Element
```

**Beispiele**:
```tsx
<InputPanel
  formData={formState}
  onFormChange={(field, value) => setFormState({...formState, [field]: value})}
  onGenerate={handleGenerate}
  onClearAll={handleClear}
/>
```

---

### OutputWorkspaceHeader

```tsx
// /src/app/components/generate/OutputWorkspaceHeader.tsx
interface OutputWorkspaceHeaderProps {
  assetCount: number;
  onSaveToLibrary: () => void;
}

export function OutputWorkspaceHeader(props: OutputWorkspaceHeaderProps): JSX.Element
```

**Beispiele**:
```tsx
<OutputWorkspaceHeader 
  assetCount={8}
  onSaveToLibrary={() => console.log('saving...')}
/>
```

---

### AssetCard

```tsx
// /src/app/components/generate/AssetCard.tsx
interface AssetCardProps {
  type: string;
  variant: string;
  items: Array<{
    label: string;
    content: string;
  }>;
  metadata?: string;
  accentColor: string;
  icon: React.ReactNode;
  onRegenerate: () => void;
  onCopy: () => void;
  onSaveToLibrary: () => void;
}

export function AssetCard(props: AssetCardProps): JSX.Element
```

**Beispiele**:
```tsx
<AssetCard
  type="Hook"
  variant="Problem-Solution"
  items={[
    { label: 'Variant 1', content: 'Hook content...' }
  ]}
  metadata="3 variants"
  accentColor="#FFBFDE"
  icon={<IconComponent />}
  onRegenerate={() => {}}
  onCopy={() => {}}
  onSaveToLibrary={() => {}}
/>
```

---

### ReuseBanner

```tsx
// /src/app/components/generate/ReuseBanner.tsx
interface ReuseBannerProps {
  assetType: string;
  assetVariant: string;
  onBackToLibrary: () => void;
  onClearAndFresh: () => void;
  onDismiss: () => void;
}

export function ReuseBanner(props: ReuseBannerProps): JSX.Element
```

**Beispiele**:
```tsx
<ReuseBanner
  assetType="Hook"
  assetVariant="Problem-Solution"
  onBackToLibrary={() => navigate('/app/content-os/library')}
  onClearAndFresh={handleClear}
  onDismiss={handleDismiss}
/>
```

---

## 📚 Library Components API

### LibraryTopbar

```tsx
// /src/app/components/library/LibraryTopbar.tsx
interface LibraryTopbarProps {
  activeView: 'generate' | 'library';
}

export function LibraryTopbar(props: LibraryTopbarProps): JSX.Element
```

---

### OrganizationRail

```tsx
// /src/app/components/library/OrganizationRail.tsx
interface OrganizationRailProps {
  filterType: string;
  filterCampaign: string;
  filterPlatform: string;
  filterGoal: string;
  onFilterChange: (type: string, value: string) => void;
  onNewGeneration: () => void;
}

export function OrganizationRail(props: OrganizationRailProps): JSX.Element
```

---

### LibraryToolbar

```tsx
// /src/app/components/library/LibraryToolbar.tsx
interface LibraryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function LibraryToolbar(props: LibraryToolbarProps): JSX.Element
```

---

### AssetGrid

```tsx
// /src/app/components/library/AssetGrid.tsx
interface AssetGridProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onAssetCopy: (asset: Asset) => void;
  onAssetReuse: (asset: Asset) => void;
}

export function AssetGrid(props: AssetGridProps): JSX.Element
```

---

### AssetList

```tsx
// /src/app/components/library/AssetList.tsx
interface AssetListProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onAssetCopy: (asset: Asset) => void;
  onAssetReuse: (asset: Asset) => void;
}

export function AssetList(props: AssetListProps): JSX.Element
```

---

### PreviewDrawer

```tsx
// /src/app/components/library/PreviewDrawer.tsx
interface PreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  asset: Asset | null;
  onCopy: () => void;
  onReuse: () => void;
}

export function PreviewDrawer(props: PreviewDrawerProps): JSX.Element
```

---

## 📋 Type Definitions

### Asset

```typescript
interface Asset {
  id: string;
  type: 'hook' | 'script' | 'caption' | 'plan';
  variant: string;
  content: string;
  campaign?: string;
  platform?: string;
  goal?: string;
  brandVoice?: string;
  status?: 'draft' | 'published' | 'archived';
  createdAt: string;
  variants?: Array<{
    label: string;
    content: string;
  }>;
}
```

**Beispiel**:
```typescript
const asset: Asset = {
  id: '1',
  type: 'hook',
  variant: 'Problem-Solution',
  content: '"You don\'t need more ideas..."',
  campaign: 'Launch Campaign Q1',
  platform: 'Instagram',
  goal: 'Awareness',
  brandVoice: 'Motivational & Clear',
  status: 'published',
  createdAt: '2024-01-15T10:30:00Z',
  variants: [
    { label: 'Variant 1', content: '...' }
  ]
};
```

---

### Module

```typescript
interface Module {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: 'active' | 'coming-soon' | 'planned';
  accent: string;
  route: string;
  appRoute: string | null;
  features: string[];
}
```

**Beispiel**:
```typescript
const module: Module = {
  id: '01',
  name: 'Content OS',
  tagline: 'Structured Content Generation',
  description: 'Turn your offers...',
  status: 'active',
  accent: '#FFBFDE',
  route: '/modules/content-os',
  appRoute: '/app/content-os/generate',
  features: ['Hooks & Scripts', 'Social Captions', 'Brand Voice System', 'Asset Library']
};
```

---

### FormData

```typescript
interface FormData {
  offer: string;
  audience: string;
  platform: string;
  goal: string;
  tone: string;
  outputType: string;
}
```

---

### FilterOptions

```typescript
interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  title: string;
  options: FilterOption[];
  activeValue: string;
  onFilterChange: (value: string) => void;
}
```

---

## 🛠️ Utility Functions

### CSS Variable Access

```typescript
// Zugriff auf Design Tokens
const deepBg = 'var(--deep-bg)';        // #0E0F14
const midBg = 'var(--mid-bg)';          // #171923
const elevated = 'var(--elevated-surface)'; // #1F2230
const pink = 'var(--pastel-pink)';      // #FFBFDE
const lilac = 'var(--soft-lilac)';      // #DABFFF
```

**Verwendung**:
```tsx
<div style={{ background: 'var(--deep-bg)', color: 'var(--primary-text)' }}>
  Content
</div>
```

---

### Gradient Helpers

```typescript
// Pink Gradient
const pinkGradient = 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)';

// Purple Gradient
const purpleGradient = 'linear-gradient(135deg, #DABFFF 0%, #E7C6F3 100%)';

// Dark Panel Gradient
const panelGradient = 'linear-gradient(135deg, #1F2230 0%, #171923 100%)';
```

---

### Shadow Helpers

```typescript
// Foreground Shadow (Highest Elevation)
const foregroundShadow = '0 16px 40px rgba(255, 191, 222, 0.25), 0 6px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)';

// Midground Shadow
const midgroundShadow = '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)';

// Background Shadow (Recessed)
const backgroundShadow = 'inset 0 2px 6px rgba(0, 0, 0, 0.6)';
```

---

### Format Date

```typescript
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

// Verwendung
formatDate('2024-01-15T10:30:00Z') // "15. Jan 2024"
```

---

### Copy to Clipboard

```typescript
async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
```

---

### Generate Mock Asset

```typescript
function generateMockAsset(type: Asset['type']): Asset {
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    variant: 'Generated',
    content: 'Mock content...',
    createdAt: new Date().toISOString()
  };
}
```

---

## 🎯 Best Practices

### Component Composition

```tsx
// ✅ RICHTIG - Component Composition
<div>
  <Navbar />
  <main>
    <PageContent />
  </main>
  <Footer />
</div>

// ❌ FALSCH - Verschachtelte Links
<Link to="/page">
  <div>
    <Link to="/other">Nested Link</Link>
  </div>
</Link>
```

---

### State Management

```tsx
// ✅ RICHTIG - useState für lokalen State
const [assets, setAssets] = useState<Asset[]>([]);
const [searchQuery, setSearchQuery] = useState('');

// ✅ RICHTIG - Callbacks für Child-Components
<SearchInput 
  value={searchQuery}
  onChange={setSearchQuery}
/>
```

---

### Styling

```tsx
// ✅ RICHTIG - CSS Variables verwenden
<div style={{ 
  background: 'var(--deep-bg)',
  borderRadius: 'var(--radius-card)'
}}>

// ✅ RICHTIG - Inline Tailwind Classes
<div className="px-8 py-4 rounded-[12px]">

// ❌ FALSCH - Magic Numbers
<div style={{ borderRadius: '12px' }}>
```

---

### Imports

```tsx
// ✅ RICHTIG - Relative Imports
import { Badge } from '../shared';
import { Navbar } from '../components/navbar';

// ✅ RICHTIG - Named Exports
import { Badge, SectionLabel, EmptyState } from '../shared';

// ❌ FALSCH - Absolute Imports (nicht konfiguriert)
import { Badge } from '@/components/shared';
```

---

## 📞 Support

Bei Fragen zur API:
- Siehe `/DOCUMENTATION.md` für vollständige Dokumentation
- Siehe `/src/app/components/shared/README.md` für Shared Primitives
- Siehe `/src/app/components/generate/README.md` für Generate Components
- Siehe `/src/app/components/library/README.md` für Library Components

---

**Ende der API Reference**
