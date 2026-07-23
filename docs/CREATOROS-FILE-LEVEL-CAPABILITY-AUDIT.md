# CreatorOS File-Level Capability Audit

**Status:** Completed baseline audit for first migration scope  
**Branch:** `architecture/creatoros-os-family-migration`  
**Canonical base inspected:** `main` at `e26c2dce8ecc32028d90894d6db0fa68d6260198`  
**Related:** ADR-003 and `CREATOROS-OS-MIGRATION-MAP.md`

## Executive Finding

The canonical repository already contains a usable lifecycle foundation. The correct strategy is extension and controlled capability migration, not a rewrite.

The strongest existing production path is:

`Brand Profile → ContentOS production workflow → Content Library → LaunchOS`

The first new architecture slice should be inserted before or inside the existing ContentOS production workflow:

`BrandOS Brand Playbook → CreatorOS Next Best Content Action → Content Asset → Content Library → LaunchOS`

IntelligenceOS should initially supply typed evidence, confidence, and measurement data to that recommendation. It should not replace the Content Library or LaunchOS workflow.

## File Ownership Matrix

### Platform shell, routing, and module registry

| File | Current responsibility | Future treatment |
|---|---|---|
| `src/app/routes.ts` | Canonical route registration, including BrandOS, ContentOS, and LaunchOS routes | Preserve. Add the CreatorOS recommendation route through a focused implementation PR. Keep existing LaunchOS aliases until migration is proven. |
| `src/config/modules.ts` | Module registry and route metadata | Adapt after ADR approval. Do not mass-rename current modules in the first code PR. Add truthful future-owner metadata only when supported by code. |
| `src/config/moduleDisplay.ts` | User-facing module labels and display state | Defer broad naming migration. Change only labels required by an implemented route. |
| `src/components/modules/ModuleEcosystemFlow.tsx` | Existing lifecycle visualization | Legacy lifecycle presentation. Update only after replacement architecture is implemented and validated. |

### BrandOS

| File | Current responsibility | Future treatment |
|---|---|---|
| `src/app/pages/brand-os-app.tsx` | Reachable BrandOS product page | Preserve as the canonical BrandOS UI entry point. Extend rather than replace. |
| `src/app/lib/brand-profile/storage.ts` | Core Brand Profile read/write behavior | Preserve as migration foundation. Add schema-versioned Brand Playbook fields through backward-compatible normalization. |
| `src/app/lib/brand-profile/extendedStorage.ts` | Extended Brand Profile persistence | Audit overlap with core storage before adding fields. Consolidation may be needed, but not in the first feature PR unless required. |
| `src/app/screens/generate.tsx` | Reads Brand Profile and creates/saves content with brand context | High-value integration point. Refactor later to consume the canonical Brand Playbook and recommendation contract. |
| `src/app/components/shared/BrandVoiceChip.tsx` | Displays brand voice context | Preserve; adapt to Brand Playbook snapshot contract when implemented. |
| `src/app/pages/dashboard.tsx` | Reads Brand Profile for platform state and progress | Preserve; update only when new Brand Playbook readiness rules are defined. |

**BrandOS gap:** The current profile must be extended with governed values, policies, allowed claims, prohibited claims/no-gos, content pillars, preferred CTAs, governance state, schema version, and revision metadata.

**Required rule:** Existing profile data must continue loading. Migration must normalize old records into the new schema without destructive reset.

### CreatorOS creation and content asset layer

| File | Current responsibility | Future treatment |
|---|---|---|
| `src/app/lib/contentos-production/workflow.ts` | Existing BrandOS-aware content production logic and context handoff | Preserve. This is the primary existing execution engine to wrap or extend with Next Best Content Action inputs. Do not duplicate it. |
| `src/app/components/contentos-production/ContentOSWorkflow.tsx` | Existing production workflow UI | Preserve. Candidate to become a CreatorOS app surface after the recommendation contract is integrated. |
| `src/app/pages/content-os-product.tsx` | ContentOS product route/page | Preserve during migration. It can later become a CreatorOS Create/Studio route after functional parity is proven. |
| `src/modules/contentos/ContentOSApp.tsx` | Additional ContentOS app boundary | Audit for duplication with the app-level production workflow before modification. Do not blindly merge both implementations. |
| `src/data/contentos.ts` | ContentOS configuration or seed data | Preserve until exact consumers are confirmed. Reclassify only with code references and tests. |
| `src/app/screens/generate.tsx` | User-facing generation and save flow | Strong candidate for first vertical-slice integration. Add recommendation context and policy result without removing current asset creation behavior. |

**CreatorOS insertion point:** Introduce typed pure logic adjacent to the existing production workflow, not inside UI components:

- `BrandPlaybook`
- `CreatorRequestContext`
- `ContentRecommendation`
- `BrandPolicyCheck`
- `EvidenceItem`
- `MeasurementPlan`
- `GovernanceState`

The deterministic recommendation builder should produce data that the current generation workflow can convert into a canonical content asset.

### Content Library

| File | Current responsibility | Future treatment |
|---|---|---|
| `src/app/lib/content-library/storage.ts` | Canonical browser-local content asset persistence | Preserve. This is the current destination for CreatorOS outputs. Extend asset metadata backward-compatibly if recommendation/evidence snapshots are added. |
| `src/app/pages/content-os-library.tsx` | Content Library page | Preserve and later relabel as a CreatorOS app only after route and product migration are approved. |
| `src/app/screens/library.tsx` | Library screen implementation | Preserve. Audit relationship to `content-os-library.tsx` before changing either. |
| `src/core/library/libraryMapper.ts` | Maps assets to library representations | High-risk contract file. Extend through tests when recommendation metadata enters the library. |
| `src/core/library/libraryAdapter.ts` | Adapter boundary around library records | Preserve; preferred location for compatibility translation rather than scattering schema checks through UI. |
| `src/app/components/library/*` | Library UI components | No first-pass architecture change required. |

**Library rule:** The first implementation must save the recommended output through the existing canonical library path. A second parallel recommendation store is forbidden.

### Launch planning

| File | Current responsibility | Future treatment |
|---|---|---|
| `src/app/components/launchos/LaunchOSWorkflow.tsx` | Functional six-phase launch planning UI with truthful persistence status | Preserve intact during the first CreatorOS migration. It is already validated and should not be destabilized by naming work. |
| `src/app/lib/launchos/types.ts` | Launch domain contracts | Preserve. Audit future ownership later; no contract rewrite in Slice 1. |
| `src/app/lib/launchos/storage.ts` | Launch plan persistence and truthful write outcomes | Preserve. Do not replace with generic storage during the first slice. |
| `src/app/pages/launch-os-app.tsx` | Thin route page to LaunchOS workflow | Preserve. |
| `src/app/routes.ts` | Canonical and legacy LaunchOS routes | Preserve all existing aliases until browser migration evidence proves removal safe. |

**LaunchOS decision:** Launch planning remains operationally intact. The first new CreatorOS output must remain selectable by LaunchOS through the existing Content Library contract.

### Intelligence and analytics

| Current evidence | Finding | Future treatment |
|---|---|---|
| `src/config/modules.ts`, `docs/FEATURE-MAPPING.md`, `docs/PRODUCT-MAP.md` | AnalyticsOS is represented as a product boundary, but current `main` does not expose a clearly verified next-best-action engine equivalent to the Lovable prototype. | Do not claim IntelligenceOS implemented. Introduce only the minimum typed evidence contract in the first implementation slice. |
| Lovable Creator Signal Hub | Contains deterministic dominant signal, recommendation, evidence, confidence, and measurement concepts with passing tests | Treat as migration-source logic. Port selectively and adapt to this repository’s existing types and library workflow. No whole-project copy. |
| `creatoros-insight` migration source | Previously classified migration source | Compare its pure analytics logic with the Lovable implementation before selecting the canonical engine. |

**IntelligenceOS first scope:**

- evidence items,
- baseline/observed signal input,
- explainable reasoning,
- expected impact,
- confidence,
- measurement plan,
- recommendations only.

No automatic edits to BrandOS or DesignOS.

## Duplicate and Drift Risks

1. **Multiple ContentOS surfaces** — `content-os-product.tsx`, `ContentOSWorkflow.tsx`, `ContentOSApp.tsx`, and `generate.tsx` may represent overlapping generations of the same workflow. The first code PR must choose one integration path and leave the others untouched unless exact references prove they are redundant.
2. **Multiple Brand storage layers** — `storage.ts` and `extendedStorage.ts` may overlap. Add no third persistence mechanism.
3. **Library schema risk** — recommendation metadata can break LaunchOS selection if asset mapping changes incompatibly. Extend via adapters and tests.
4. **Open architecture PR conflict** — PR #130 still proposes the older lifecycle architecture. PR #135 supersedes its module model conceptually but should not be merged until the conflict is explicitly resolved.
5. **Open audit PR overlap** — PR #129 contains an earlier capability inventory. Reuse evidence where valid, but avoid two competing canonical audit documents on `main`.
6. **Naming before behavior** — changing ContentOS/AnalyticsOS labels before new contracts work would create false product truth.

## Exact First Code PR Scope

### Proposed branch

`feat/creatoros-next-best-content-action-core`

### Add

A new pure domain package, using repository naming conventions, containing:

- Brand Playbook extension types and normalization,
- Creator request context,
- deterministic recommendation builder,
- brand policy checker,
- evidence and measurement contracts,
- unit tests.

### Modify only where necessary

- `src/app/lib/brand-profile/storage.ts` or its canonical schema layer — backward-compatible normalization only.
- `src/app/lib/contentos-production/workflow.ts` — accept or map a typed recommendation into the existing production flow.
- `src/app/screens/generate.tsx` or the verified canonical Create surface — collect minimal request context and render the recommendation.
- `src/app/lib/content-library/storage.ts` plus mapper/adapter only if recommendation snapshot persistence requires it.
- canonical documentation affected by the behavior.

### Explicitly do not modify

- LaunchOS planner, types, storage, or workflow,
- broad navigation labels,
- module status labels,
- DesignOS, SalesOS, or GrowthOS UI,
- authentication,
- database infrastructure,
- Vercel configuration,
- public marketing site.

## Acceptance Gate for First Code PR

1. Existing Brand Profiles load without data loss.
2. A user can define the additional Brand Playbook policy fields.
3. A deterministic recommendation changes when BrandOS or request context changes.
4. A prohibited claim can produce `Needs Review` with exact reasons.
5. Recommendation output includes format, audience, goal, hook, core message, content structure/script, visual direction/shot list, CTA, caption guidance, policy check, reasoning, evidence, expected impact, confidence, and measurement plan.
6. The output can be saved as a real asset through the existing Content Library.
7. The saved asset remains selectable in LaunchOS.
8. Existing BrandOS → ContentOS → Library → LaunchOS behavior does not regress.
9. Typecheck, build, automated tests, and browser save/reload proof pass against an identifiable commit.

## Audit Conclusion

The repository is ready for a focused implementation. The first code change should not be a platform rewrite or module rename. It should add the missing decision-intelligence layer to the existing working lifecycle and prove the new architecture through one complete path.
