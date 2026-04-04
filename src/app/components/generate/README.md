# Generate Screen Component System

## Structure Overview

The Generate screen has been restructured into a clean, modular component system following architectural screen design principles.

## File Structure

```
/src/app/
├── screens/
│   └── generate.tsx                    # Main screen controller (252 lines, was 800+)
└── components/
    └── generate/
        ├── Badge.tsx                   # Reusable badge component
        ├── SectionLabel.tsx            # Section label component
        ├── Topbar.tsx                  # Top navigation bar
        ├── ReuseBanner.tsx             # Reuse context banner
        ├── InputPanel.tsx              # Left panel - Input form (36%)
        ├── OutputWorkspaceHeader.tsx   # Output workspace header
        └── AssetCard.tsx               # Reusable asset card component
```

## Component Hierarchy

```
GenerateScreen (Main Container)
├── Topbar
├── ReuseBanner (conditional)
└── Generate_Main (2-column layout)
    ├── InputPanel (36% width)
    │   ├── Header
    │   ├── Form Fields
    │   └── Action Footer
    └── OutputWorkspace (64% width)
        ├── OutputWorkspaceHeader
        └── Asset Grid
            ├── AssetCard (Hooks)
            ├── AssetCard (Scripts)
            └── AssetCard (Captions)
```

## Screen States

### 1. Generate_Default
- No reuse banner
- Empty output workspace (empty state)
- Clean input form

### 2. Generate_With_Output
- No reuse banner
- Full output workspace with asset cards
- Input form with user values

### 3. Generate_Reuse_State
- Reuse banner visible
- Input form prefilled
- Output workspace can be empty or full

## Key Components

### Badge
Reusable badge with variants (pink, purple, neutral) and sizes (sm, md).

### SectionLabel
Uppercase section labels with consistent styling.

### Topbar
Fixed top navigation with CreatorOS branding and navigation links.

### ReuseBanner
Contextual banner showing reused asset information with actions:
- Back to Library
- Clear & Start Fresh
- Dismiss

### InputPanel
Left column (36%) with:
- Input header
- Form fields (Offer, Audience, Platform, Goal, Tone, Output Type)
- Action buttons (Generate, Clear All)

### OutputWorkspaceHeader
Output section header with:
- Session metadata
- Content suite title
- Save to Library action

### AssetCard
Reusable card component for content assets with:
- Custom icon and accent color
- Header with title/subtitle
- Content items with numbering
- Footer with metadata and actions

## Design Principles

1. **Modular** - Each component has a single responsibility
2. **Reusable** - Common UI patterns extracted into shared components
3. **Clean Naming** - Explicit component names matching design system
4. **State Management** - Clear separation of data state and UI state
5. **Layouted** - 2-column architecture with clear hierarchy
6. **Conditional** - Different states don't mix - clean conditionals

## Benefits

- ✅ Reduced main file from 800+ lines to 252 lines
- ✅ Easy to maintain and update individual sections
- ✅ Reusable components (Badge, AssetCard, etc.)
- ✅ Clear component boundaries
- ✅ Type-safe props
- ✅ Easy to test individual components
- ✅ Matches design system terminology

## Usage Example

```tsx
import { GenerateScreen } from './screens/generate';

// The screen handles its own state and layout
<GenerateScreen />
```

## Future Enhancements

- Extract Empty State into its own component
- Create variant for OutputWorkspace (Default vs With Content)
- Add proper generation state management
- Connect to actual backend/API
- Add loading states
- Add error handling components
