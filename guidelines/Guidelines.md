<!-- make-kit-guidelines -->
## Design System Setup — MANDATORY

This project depends on `@figma/astraui-kit` packages. Before writing
any code:

1. Read guidelines/setup.md and guidelines/Guidelines.md inside
   each `@figma/astraui-kit` package in node_modules.
2. Execute all setup instructions (install dependencies, config changes)
   against THIS project — not the package itself.
3. Do not skip, modify, or improvise any setup steps.
4. Read ALL other required .md files specified in guidelines/Guidelines.md.
5. Verify that all packages specified in setup.md appear in this
   project's package.json and that all required .md files have been read before proceeding.
<!-- /make-kit-guidelines -->

---

## CreatorOS Product Documentation

**⚠️ IMPORTANT: Read product documentation before implementing features.**

### Product Architecture & Strategy
All product decisions, module definitions, and architectural guidelines are documented in `/docs/`:

- **[/docs/ARCHITECTURE.md](/docs/ARCHITECTURE.md)** — Complete system architecture, module structure, design system
- **[/docs/BRANDOS-DEFINITION.md](/docs/BRANDOS-DEFINITION.md)** — Brand OS module specification
- **[/docs/CONTENTOS-DEFINITION.md](/docs/CONTENTOS-DEFINITION.md)** — Content OS module specification
- **[/docs/CHANGELOG.md](/docs/CHANGELOG.md)** — Product version history
- **[/docs/NAVIGATION.md](/docs/NAVIGATION.md)** — Documentation navigation guide

### Key Rules

#### Module Development
Every module must fulfill **3 criteria:**
1. **Standalone Value** — Works independently
2. **Clear System Position** — Defined scope & purpose
3. **Clean Integration** — Can exchange data with other modules

**If a module doesn't fulfill these, it doesn't belong in the system.**

#### Scope Rule
**Every new feature must clearly belong to an existing module or justify a new module with full scope.**

#### Design System
- **Colors:** Use CSS variables from `/src/styles/theme.css`
- **Accent Rule:** Pink/Purple accents on max 10% of surface
- **Radius System:** 20px → 16px → 12px → 8px → 6px
- **Typography:** Manrope (headings), Inter (body)
- **Aesthetic:** Architectural spatial design, no soft SaaS patterns

### Before Starting Work

1. **Product Features:** Read [ARCHITECTURE.md](/docs/ARCHITECTURE.md) → Check module scope
2. **Brand OS Work:** Read [BRANDOS-DEFINITION.md](/docs/BRANDOS-DEFINITION.md)
3. **Content OS Work:** Read [CONTENTOS-DEFINITION.md](/docs/CONTENTOS-DEFINITION.md)
4. **Any Changes:** Update relevant documentation in `/docs/`

### Documentation Maintenance
**When you make changes, update:**
- `ARCHITECTURE.md` — For system/routing/design changes
- Module Definition — For feature changes within a module
- `CHANGELOG.md` — For every release/major change

---

Some of the base components you are using may have styling (eg. gap/typography) baked in as defaults. Make sure you explicitly set any styling information from the guidelines in the generated react to override the defaults.
