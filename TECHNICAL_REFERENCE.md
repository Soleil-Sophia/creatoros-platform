# CreatorOS Technical Reference

**Version:** 37  
**Last Updated:** 2026-03-28  
**Status:** ✅ Production Ready

---

## 📑 Table of Contents

1. [Technology Stack](#technology-stack)
2. [Build Configuration](#build-configuration)
3. [Styling System](#styling-system)
4. [State Management Patterns](#state-management-patterns)
5. [Component Patterns](#component-patterns)
6. [Performance Optimizations](#performance-optimizations)
7. [Testing Strategy](#testing-strategy)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [Migration Guides](#migration-guides)

---

## 🛠️ Technology Stack

### Core Dependencies

```json
{
  "react": "^18.3.1",
  "react-router": "^7.1.1",
  "tailwindcss": "^4.0.0-alpha.37",
  "vite": "^6.0.7",
  "typescript": "^5.7.3"
}
```

### UI Libraries

```json
{
  "@radix-ui/react-*": "^1.x",  // Primitives
  "vaul": "^1.1.1",               // Drawer (Library Preview)
  "lucide-react": "^0.468.0",    // Icons
  "sonner": "^1.7.3"              // Toast Notifications
}
```

### Why These Choices?

#### React Router (not React Router DOM)
- **Reason**: `react-router` is the core package in v7
- **Benefit**: TypeScript-first, data-loading patterns
- **Note**: `react-router-dom` is legacy

#### Tailwind CSS v4
- **Reason**: Modern CSS Variables API
- **Benefit**: Better theme integration
- **Note**: Uses `@import "tailwindcss"` instead of `@tailwind`

#### Vite (without React dedupe)
- **Reason**: Standard configuration is stable
- **Problem**: React aliasing causes "default export" errors
- **Solution**: No `resolve.alias` for React

---

## ⚙️ Build Configuration

### Vite Config (`/vite.config.ts`)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // CRITICAL: No React dedupe or alias!
  // This causes "does not provide an export named 'default'" error
});
```

**❌ WRONG** (causes errors):
```typescript
resolve: {
  alias: {
    react: path.resolve('./node_modules/react')
  },
  dedupe: ['react', 'react-dom']
}
```

---

### TypeScript Config (`/tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

### Tailwind Config (Inline in CSS)

**File:** `/src/styles/tailwind.css`

```css
@import "tailwindcss";
@import "./theme.css";
@import "./fonts.css";
```

**Important Order:**
1. `tailwindcss` first
2. `theme.css` second (overwrites CSS vars)
3. `fonts.css` last

**❌ WRONG** (old Tailwind v3 syntax):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🎨 Styling System

### CSS Variables Architecture

**File:** `/src/styles/theme.css`

```css
:root {
  /* Base Colors */
  --deep-bg: #0E0F14;
  --mid-bg: #171923;
  --elevated-surface: #1F2230;
  --soft-elevated: #262A38;
  
  /* Text Colors */
  --primary-text: #F4F3F8;
  --secondary-text: #B4B8C7;
  --muted-text: #8B8F9E;
  
  /* Brand Accents */
  --pastel-pink: #FFBFDE;
  --soft-lilac: #DABFFF;
  --pink-lilac-blend: #E7C6F3;
  --accent-graphite: #3A4054;
  
  /* Radius System */
  --radius-hero: 20px;
  --radius-card: 16px;
  --radius-inner: 12px;
  --radius-mini: 8px;
  --radius-hard: 6px;
}
```

### Tailwind Utility Usage

```tsx
// ✅ CORRECT - Use CSS vars
<div style={{ background: 'var(--deep-bg)' }}>

// ✅ CORRECT - Inline Tailwind
<div className="px-8 py-4 rounded-[12px]">

// ✅ CORRECT - Custom radius
<div className="rounded-[var(--radius-card)]">

// ❌ WRONG - Magic numbers
<div style={{ borderRadius: '12px' }}>
```

---

### Font System

**File:** `/src/styles/fonts.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

body, p, span, div {
  font-family: var(--font-body);
}
```

**Typography Scale:**

| Element | Font | Size | Weight | Usage |
|---------|------|------|--------|-------|
| Hero | Manrope | 72px | 700 | Landing hero |
| H1 | Manrope | 64px | 700 | Page titles |
| H2 | Manrope | 42px | 700 | Section headers |
| H3 | Manrope | 36px | 700 | Subsections |
| H4 | Manrope | 28px | 700 | Card titles |
| Body Large | Inter | 24px | 400 | Lead text |
| Body | Inter | 16px | 400 | Main content |
| Body Small | Inter | 14px | 400 | Secondary |
| Caption | Inter | 13px | 500 | Labels |
| Label | Inter | 11-12px | 600 | Badges, tags |

---

### Shadow System

```typescript
// Foreground (Highest Elevation)
const foregroundShadow = `
  0 16px 40px rgba(255, 191, 222, 0.25),
  0 6px 16px rgba(0, 0, 0, 0.6),
  inset 0 1px 0 rgba(255, 255, 255, 0.12)
`;

// Midground
const midgroundShadow = `
  0 8px 24px rgba(0, 0, 0, 0.6),
  inset 0 1px 0 rgba(255, 255, 255, 0.06)
`;

// Background (Recessed)
const backgroundShadow = `
  inset 0 2px 6px rgba(0, 0, 0, 0.6)
`;

// Premium Glow
const glowShadow = `
  0 0 10px rgba(255, 191, 222, 0.25)
`;
```

**Usage:**

```tsx
// Input panel (Foreground)
<div style={{
  boxShadow: '0 16px 40px rgba(255, 191, 222, 0.25), 0 6px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
}}>

// Output card (Midground)
<div style={{
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
}}>

// Library background (Recessed)
<div style={{
  boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.6)'
}}>
```

---

### Gradient System

```typescript
// Pink Gradient (Primary CTA)
const pinkGradient = 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)';

// Purple Gradient
const purpleGradient = 'linear-gradient(135deg, #DABFFF 0%, #E7C6F3 100%)';

// Dark Panel Gradient
const panelGradient = 'linear-gradient(135deg, #1F2230 0%, #171923 100%)';

// Soft Elevated Gradient
const softGradient = 'linear-gradient(135deg, #262A38 0%, #1F2230 100%)';

// Top Edge Light
const topLight = 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.3) 35%, rgba(218, 191, 255, 0.25) 65%, transparent)';
```

---

## 🔄 State Management Patterns

### Local Component State

```tsx
// Generate Screen Example
const [formData, setFormData] = useState({
  offer: '',
  audience: '',
  platform: '',
  goal: '',
  tone: '',
  outputType: 'all'
});

const [generatedAssets, setGeneratedAssets] = useState<Asset[]>([]);
const [showReuseBanner, setShowReuseBanner] = useState(false);

// Update single field
const handleFormChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

---

### Callback Pattern (Parent → Child)

```tsx
// Parent Component
<InputPanel
  formData={formData}
  onFormChange={handleFormChange}
  onGenerate={handleGenerate}
  onClearAll={handleClear}
/>

// Child Component
interface InputPanelProps {
  formData: FormData;
  onFormChange: (field: string, value: string) => void;
  onGenerate: () => void;
  onClearAll: () => void;
}

export function InputPanel({ formData, onFormChange, onGenerate, onClearAll }: InputPanelProps) {
  return (
    <input
      value={formData.offer}
      onChange={(e) => onFormChange('offer', e.target.value)}
    />
  );
}
```

---

### Conditional Rendering Pattern

```tsx
// ✅ CORRECT - Clean conditional
{generatedAssets.length === 0 ? (
  <EmptyState title="No assets yet" />
) : (
  <AssetGrid assets={generatedAssets} />
)}

// ✅ CORRECT - Conditional component
{showReuseBanner && (
  <ReuseBanner
    assetType={reusedAsset.type}
    onDismiss={() => setShowReuseBanner(false)}
  />
)}

// ❌ WRONG - Complex inline logic
{assets.length > 0 && assets.filter(a => a.type === 'hook').length > 0 && (
  <div>...</div>
)}
```

---

### Filter & Search Pattern (Library)

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [filterType, setFilterType] = useState('all');
const [sortBy, setSortBy] = useState('recent');

// Derived state (computed on render)
const filteredAssets = mockAssets
  .filter(asset => {
    // Search filter
    if (searchQuery && !asset.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Type filter
    if (filterType !== 'all' && asset.type !== filterType) {
      return false;
    }
    return true;
  })
  .sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });
```

---

### Drawer/Modal Pattern

```tsx
const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
const [drawerOpen, setDrawerOpen] = useState(false);

const handleAssetClick = (asset: Asset) => {
  setSelectedAsset(asset);
  setDrawerOpen(true);
};

return (
  <>
    <AssetGrid onAssetClick={handleAssetClick} />
    
    <PreviewDrawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      asset={selectedAsset}
    />
  </>
);
```

---

## 🧩 Component Patterns

### Shared Primitive Pattern

```tsx
// Badge.tsx
interface BadgeProps {
  variant?: 'pink' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({ variant = 'pink', size = 'md', children }: BadgeProps) {
  const styles = {
    pink: 'linear-gradient(135deg, #FFBFDE, #E7C6F3)',
    purple: 'linear-gradient(135deg, #DABFFF, #E7C6F3)',
    neutral: 'rgba(255, 255, 255, 0.05)'
  };
  
  return (
    <div
      style={{
        background: styles[variant],
        padding: size === 'sm' ? '2px 8px' : '3px 12px',
        fontSize: size === 'sm' ? '10px' : '11px',
        fontWeight: 600,
        borderRadius: '6px',
        textTransform: 'uppercase'
      }}
    >
      {children}
    </div>
  );
}
```

---

### Panel Shell Pattern

```tsx
// PanelShell.tsx
interface PanelShellProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PanelShell({ children, onClick, className = '' }: PanelShellProps) {
  return (
    <div
      className={`rounded-[16px] p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
      }}
    >
      {children}
    </div>
  );
}
```

---

### Asset Card Pattern

```tsx
// AssetCard.tsx
interface AssetCardProps {
  type: string;
  variant: string;
  items: Array<{ label: string; content: string }>;
  accentColor: string;
  icon: React.ReactNode;
  onRegenerate: () => void;
  onCopy: () => void;
  onSaveToLibrary: () => void;
}

export function AssetCard({
  type,
  variant,
  items,
  accentColor,
  icon,
  onRegenerate,
  onCopy,
  onSaveToLibrary
}: AssetCardProps) {
  return (
    <div className="rounded-[16px] p-6" style={{
      background: `linear-gradient(135deg, ${accentColor}08 0%, ${accentColor}04 100%)`,
      border: `1px solid ${accentColor}30`
    }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <div>
          <Badge variant="pink">{type}</Badge>
          <div style={{ color: accentColor }}>{variant}</div>
        </div>
      </div>
      
      {/* Content */}
      {items.map((item, idx) => (
        <div key={idx}>
          <SectionLabel>{item.label}</SectionLabel>
          <p>{item.content}</p>
        </div>
      ))}
      
      {/* Actions */}
      <div className="flex gap-2">
        <button onClick={onRegenerate}>Regenerate</button>
        <button onClick={onCopy}>Copy</button>
        <button onClick={onSaveToLibrary}>Save</button>
      </div>
    </div>
  );
}
```

---

## 🚀 Performance Optimizations

### Lazy Loading Routes (Future)

```tsx
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/home'));
const ModulesPage = lazy(() => import('./pages/modules'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    )
  }
]);
```

---

### Memoization Pattern

```tsx
import { useMemo } from 'react';

// Expensive filtering/sorting
const filteredAssets = useMemo(() => {
  return mockAssets
    .filter(asset => asset.type === filterType)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}, [filterType, mockAssets]);
```

---

### Callback Memoization

```tsx
import { useCallback } from 'react';

const handleAssetClick = useCallback((asset: Asset) => {
  setSelectedAsset(asset);
  setDrawerOpen(true);
}, []);
```

---

## 🧪 Testing Strategy

### Component Testing Pattern

```tsx
// Badge.test.tsx
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with pink variant', () => {
    render(<Badge variant="pink">Module 01</Badge>);
    expect(screen.getByText('Module 01')).toBeInTheDocument();
  });
  
  it('applies correct size', () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    const badge = container.firstChild;
    expect(badge).toHaveStyle({ fontSize: '10px' });
  });
});
```

---

### Integration Testing Pattern

```tsx
// generate.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { GenerateScreen } from './screens/generate';

describe('GenerateScreen', () => {
  it('shows empty state initially', () => {
    render(<GenerateScreen />);
    expect(screen.getByText('No assets yet')).toBeInTheDocument();
  });
  
  it('generates assets on button click', () => {
    render(<GenerateScreen />);
    const generateButton = screen.getByText('Generate Content');
    fireEvent.click(generateButton);
    expect(screen.getAllByTestId('asset-card')).toHaveLength(8);
  });
});
```

---

## 📦 Deployment

### Production Build

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Preview production build
pnpm preview
```

**Output:** `/dist` folder

---

### Environment Variables

```bash
# .env.production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Usage:**

```tsx
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

---

### Deployment Platforms

#### Vercel
```bash
vercel --prod
```

#### Netlify
```bash
netlify deploy --prod
```

#### Static Hosting
```bash
# Build
pnpm build

# Upload /dist to:
# - AWS S3 + CloudFront
# - GitHub Pages
# - Any static host
```

---

## 🔍 Troubleshooting

### React "default export" Error

**Error:**
```
Module "react" does not provide an export named 'default'
```

**Cause:** React dedupe/alias in `vite.config.ts`

**Solution:**
```typescript
// ❌ Remove this
resolve: {
  alias: {
    react: path.resolve('./node_modules/react')
  }
}

// ✅ Use standard config
export default defineConfig({
  plugins: [react(), tailwindcss()]
});
```

---

### Tailwind Classes Not Applied

**Cause:** Missing `@import "tailwindcss"`

**Solution:**

```css
/* /src/styles/tailwind.css */
@import "tailwindcss";  /* Must be first! */
@import "./theme.css";
@import "./fonts.css";
```

---

### Nested Link Warning

**Error:**
```
Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>
```

**Cause:** Link inside Link

**Solution:**

```tsx
// ❌ WRONG
<Link to="/modules">
  <div>
    <Link to="/content-os">Nested</Link>
  </div>
</Link>

// ✅ CORRECT
<div>
  <Link to="/modules">Modules</Link>
  <Link to="/content-os">Content OS</Link>
</div>
```

---

### CSS Variables Not Working

**Cause:** Theme CSS imported before Tailwind

**Solution:**

```css
/* Correct order */
@import "tailwindcss";  /* 1. First */
@import "./theme.css";  /* 2. Second */
@import "./fonts.css";  /* 3. Last */
```

---

## 🔄 Migration Guides

### From Tailwind v3 to v4

```css
/* OLD (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* NEW (v4) */
@import "tailwindcss";
```

---

### From React Router DOM to React Router

```tsx
// OLD
import { BrowserRouter } from 'react-router-dom';

// NEW
import { createBrowserRouter, RouterProvider } from 'react-router';
```

---

## 📚 Additional Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [React Router v7 Docs](https://reactrouter.com)
- [Vite Docs](https://vite.dev)
- [Radix UI](https://www.radix-ui.com/)

---

**End of Technical Reference**
