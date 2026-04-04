# CreatorOS Quick Start Guide

**Get up and running in 5 minutes!**

---

## 🚀 Installation

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open browser
# http://localhost:5173
```

That's it! The app should now be running.

---

## 📁 Project Structure (Essential)

```
/src/app/
├── pages/              # Routes → Components
├── screens/            # Business logic
├── components/
│   ├── shared/         # ⭐ Reusable primitives
│   ├── generate/       # Generate screen
│   └── library/        # Library screen
└── routes.ts           # ⭐ Add routes here

/src/styles/
├── theme.css           # ⭐ Design tokens
├── tailwind.css        # Tailwind imports
└── fonts.css           # Font imports
```

---

## 🎨 Design System Cheat Sheet

### Colors (use CSS vars)
```tsx
style={{ background: 'var(--deep-bg)' }}       // #0E0F14
style={{ background: 'var(--mid-bg)' }}        // #171923
style={{ background: 'var(--elevated-surface)' }} // #1F2230
style={{ color: 'var(--primary-text)' }}       // #F4F3F8
style={{ color: 'var(--secondary-text)' }}     // #B4B8C7
```

### Gradients (copy-paste)
```tsx
// Pink Gradient (CTAs)
background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)'

// Dark Panel Gradient
background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)'
```

### Shadows (copy-paste)
```tsx
// Foreground (highest)
boxShadow: '0 16px 40px rgba(255, 191, 222, 0.25), 0 6px 16px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)'

// Midground
boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)'

// Background (recessed)
boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.6)'
```

### Radius
```tsx
className="rounded-[20px]"  // Hero panels
className="rounded-[16px]"  // Standard cards
className="rounded-[12px]"  // Inner elements
className="rounded-[8px]"   // Buttons
className="rounded-[6px]"   // Badges
```

---

## 🧩 Common Patterns

### 1. Create a New Page

```tsx
// /src/app/pages/new-page.tsx
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';

export function NewPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />
      <main className="pt-32 pb-20 px-8">
        {/* Your content */}
      </main>
      <Footer />
    </div>
  );
}
```

```typescript
// /src/app/routes.ts
import { NewPage } from './pages/new-page';

const router = createBrowserRouter([
  // ... existing routes
  { path: '/new-page', Component: NewPage }
]);
```

---

### 2. Use Shared Primitives

```tsx
import { Badge, SectionLabel, EmptyState, PageHeader } from '../shared';

<Badge variant="pink" size="md">Module 01</Badge>
<SectionLabel>Input Layer</SectionLabel>
<EmptyState title="No data" description="Try something" />
<PageHeader title="Page" description="Description" badgeText="Badge" />
```

---

### 3. Create a Premium Panel

```tsx
<div
  className="p-8 rounded-[16px]"
  style={{
    background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
  }}
>
  {/* Panel content */}
</div>
```

Or use PanelShell:

```tsx
import { PanelShell } from '../shared';

<PanelShell>
  {/* Panel content */}
</PanelShell>
```

---

### 4. Add Top Edge Light

```tsx
<div className="relative">
  {/* Top edge light */}
  <div 
    className="absolute top-0 left-0 right-0 h-px"
    style={{ 
      background: 'linear-gradient(90deg, transparent, rgba(255, 191, 222, 0.3) 35%, rgba(218, 191, 255, 0.25) 65%, transparent)' 
    }}
  />
  
  {/* Content */}
</div>
```

---

### 5. Create CTA Button

```tsx
<button
  className="px-8 py-4 rounded-[12px] transition-all hover:opacity-90"
  style={{
    background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
    color: '#0E0F14',
    fontSize: '16px',
    fontWeight: 600,
    boxShadow: '0 8px 24px rgba(255, 191, 222, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
  }}
>
  Call to Action
</button>
```

---

## 📋 Common Tasks

### Add a new route
1. Create page in `/src/app/pages/your-page.tsx`
2. Add route in `/src/app/routes.ts`
3. Link to it: `<Link to="/your-page">Link</Link>`

### Add a new component
1. Create in appropriate folder (`/shared`, `/generate`, `/library`, or root `/components`)
2. Follow naming convention: PascalCase
3. Export from file
4. Import where needed

### Update design tokens
1. Edit `/src/styles/theme.css`
2. Use CSS variables in components
3. Changes apply everywhere automatically

### Add a font
1. Import in `/src/styles/fonts.css`
2. Define CSS variable in `:root`
3. Use in components

---

## 🐛 Quick Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Tailwind classes not working
Check `/src/styles/tailwind.css`:
```css
@import "tailwindcss";  /* Must be first! */
@import "./theme.css";
@import "./fonts.css";
```

### React errors
Make sure `vite.config.ts` has NO React alias:
```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // No resolve.alias!
});
```

### Link warnings
Don't nest `<Link>` inside `<Link>`:
```tsx
// ❌ WRONG
<Link to="/page1">
  <Link to="/page2">Nested</Link>
</Link>

// ✅ CORRECT
<Link to="/page1">Link 1</Link>
<Link to="/page2">Link 2</Link>
```

---

## 🎯 Navigation Map

```
Homepage (/)
  ↓ "Explore Modules"
Modules Page (/modules)
  ↓ "Learn More"
Product Page (/modules/content-os)
  ↓ "Launch Content OS"
App Generate (/app/content-os/generate)
  ↔ Library (/app/content-os/library)
```

---

## 📦 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router": "^7.1.1",        // NOT react-router-dom!
  "tailwindcss": "^4.0.0-alpha.37", // v4, not v3!
  "vite": "^6.0.7",
  "typescript": "^5.7.3"
}
```

---

## 📚 Learn More

- **Full Documentation**: `/DOCUMENTATION.md`
- **API Reference**: `/API_REFERENCE.md`
- **Technical Details**: `/TECHNICAL_REFERENCE.md`
- **All Components**: `/COMPONENT_CATALOG.md`
- **Change History**: `/CHANGELOG.md`
- **Shared Primitives**: `/src/app/components/shared/README.md`
- **Generate Components**: `/src/app/components/generate/README.md`
- **Library Components**: `/src/app/components/library/README.md`

---

## ✨ Quick Wins

### Make a pink badge
```tsx
import { Badge } from '../shared';
<Badge variant="pink">Active</Badge>
```

### Make a section header
```tsx
import { SectionLabel } from '../shared';
<SectionLabel>Input Layer</SectionLabel>
```

### Show empty state
```tsx
import { EmptyState } from '../shared';
<EmptyState title="No data" />
```

### Add a page header
```tsx
import { PageHeader } from '../shared';
<PageHeader title="Title" description="Description" />
```

### Create a link
```tsx
import { Link } from 'react-router';
<Link to="/modules">Go to Modules</Link>
```

---

## 🎨 Color Palette Reference

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Deep BG | `#0E0F14` | `--deep-bg` | Main background |
| Mid BG | `#171923` | `--mid-bg` | Panel backgrounds |
| Elevated | `#1F2230` | `--elevated-surface` | Raised panels |
| Soft Elevated | `#262A38` | `--soft-elevated` | Nested panels |
| Primary Text | `#F4F3F8` | `--primary-text` | Headlines |
| Secondary Text | `#B4B8C7` | `--secondary-text` | Body text |
| Muted Text | `#8B8F9E` | `--muted-text` | Labels |
| Pastel Pink | `#FFBFDE` | `--pastel-pink` | Primary accent |
| Soft Lilac | `#DABFFF` | `--soft-lilac` | Secondary accent |
| Pink-Lilac Blend | `#E7C6F3` | `--pink-lilac-blend` | Gradient blend |

---

## 🚦 Status

- ✅ **Version**: 37
- ✅ **Status**: Production Ready
- ✅ **Components**: 113+
- ✅ **Pages**: 5
- ✅ **Screens**: 2
- ✅ **Routes**: 5

---

**Happy Coding! 🎨**

For questions, see full docs in `/DOCUMENTATION.md`
