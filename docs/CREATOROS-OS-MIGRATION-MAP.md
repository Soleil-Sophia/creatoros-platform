# CreatorOS OS Migration Map

**Status:** Working migration baseline — no capability removal authorized  
**Branch:** `architecture/creatoros-os-family-migration`  
**Depends on:** `docs/decisions/ADR-003-CREATOROS-OS-FAMILY.md`

## Rule

Migration is capability-based, not name-based.

A current module is not deleted or renamed wholesale. Each type, pure function, persistence layer, route, component, and workflow must be assigned to one future owner and validated before its legacy location is superseded.

## Initial Mapping

| Current capability / boundary | Future owner | Migration disposition | Current confidence |
|---|---|---|---|
| Brand Profile, audience, positioning, voice, messaging | BrandOS | Preserve and extend into canonical Brand Playbook | High |
| Brand policies, allowed claims, prohibited claims, no-gos | BrandOS | Add as explicit governed fields | High |
| Content strategy and next content decision | CreatorOS | Promote to core Next Best Content Action workflow | High |
| Content generation and structured content assets | CreatorOS | Preserve as CreatorOS creation apps | High |
| Content Library | CreatorOS | Preserve as canonical content asset store | High |
| Campaign and launch content sequencing | CreatorOS | Likely CreatorOS Campaign / Launch Planning app | Medium |
| Publishing tasks, ownership, deadlines | Undecided operational boundary | Audit before assignment; do not force into GrowthOS | Low |
| Performance metrics and analytics evidence | IntelligenceOS | Preserve and connect through typed evidence contracts | High |
| Interpretation, confidence, measurement plans | IntelligenceOS | Preserve / migrate from Creator Insight and Lovable prototype | High |
| Feedback and proposed brand/design changes | IntelligenceOS | Convert to Recommended / Experimental proposals only | High |
| Lead detection and scoring | SalesOS | Migrate from LeadFabrik / lead-intelligence capabilities later | High |
| CRM, opportunities, pipeline, conversion, revenue | SalesOS | Future bounded implementation | High |
| Experiment prioritization and scale recommendations | GrowthOS | Future bounded implementation | Medium |
| Visual identity, typography, color, layout, imagery, assets | DesignOS | Define source-of-truth contract before editor work | High |
| Generic research and knowledge management | SOREYA, not CreatorOS | Exclude from CreatorOS | High |

## Current-to-Future Module Interpretation

### BrandOS

**Keep:**

- brand profile,
- target audience,
- positioning,
- voice,
- messaging context,
- offers where they define brand-commercial context.

**Add:**

- values,
- policies,
- allowed claims,
- prohibited claims / no-gos,
- content pillars,
- preferred CTAs,
- governance state and revision metadata.

**Must not own:**

- performance analytics,
- automatic recommendations,
- content production,
- silent self-modification.

### ContentOS → CreatorOS capability migration

ContentOS is not treated as worthless or deleted. Its capabilities are reclassified as tools and workflows within CreatorOS.

Likely CreatorOS apps:

- Next Best Content Action,
- Content Studio,
- Script Studio,
- Reel / Short Planner,
- Content Library,
- Campaign Builder,
- Launch Planning,
- Asset preparation.

The first migration target is the decision layer, not every creation tool at once.

### AnalyticsOS → IntelligenceOS capability migration

Likely IntelligenceOS capabilities:

- evidence model,
- metrics and baselines,
- dominant signals,
- confidence calculation,
- interpretation,
- measurement plans,
- controlled recommendations,
- experiment results.

Analytics dashboards remain tools. IntelligenceOS is the owning system because it does more than display numbers: it interprets evidence and recommends controlled action.

### LaunchOS

LaunchOS requires decomposition.

Probable CreatorOS ownership:

- campaign sequence,
- channel plan,
- launch content assets,
- launch messaging,
- launch calendar as creative planning.

Potential operational ownership requiring a later decision:

- task assignment,
- execution deadlines,
- publishing status,
- operational accountability.

No LaunchOS code or route should be removed until all capabilities have explicit destinations and replacement workflows pass validation.

### ManagementOS

ManagementOS is not automatically renamed GrowthOS.

GrowthOS owns strategic growth prioritization, not generic task management. Existing ManagementOS capabilities must be inventoried individually. Some may belong to CreatorOS workflow execution; others may be outside the initial product scope.

### SalesOS

SalesOS replaces the ambiguous use of “Lead Intelligence” as a top-level product boundary.

It will eventually own:

- lead capture,
- lead identification,
- lead scoring,
- opportunities,
- CRM context,
- pipeline,
- follow-up workflows,
- conversion,
- revenue evidence.

CreatorOS may optimize content for lead potential, but SalesOS owns the actual lead and sales lifecycle.

### GrowthOS

GrowthOS owns the question:

> Where should the organization invest, experiment, and scale next?

It consumes evidence from IntelligenceOS and business outcomes from SalesOS. It does not create content, own brand truth, or manage generic tasks.

## Lovable Prototype Classification

**Project:** Creator Signal Hub  
**Classification:** Migration Source / Functional Prototype  
**Canonical status:** Non-canonical

Candidate capabilities for selective migration:

- typed Brand Playbook,
- local persistence behavior,
- deterministic recommendation builder,
- Brand Policy Check,
- production-ready recommendation output,
- explainable Reasoning / Evidence / Confidence / Measurement sections,
- CreatorOS shell navigation patterns,
- canonical architecture documentation concepts.

The prototype must not receive independent product expansion while migration is active.

## First Implementation Slice

### Slice A — Architecture and contracts

1. Approve ADR-003.
2. Audit current BrandOS and ContentOS types.
3. Define canonical `BrandPlaybook` contract.
4. Define canonical `CreatorRequestContext` contract.
5. Define canonical `ContentRecommendation` and `BrandPolicyCheck` contracts.
6. Define the typed Evidence handoff from IntelligenceOS.

### Slice B — Functional vertical path

1. Load or create a BrandOS Brand Playbook.
2. Select audience / goal / channel / funnel context.
3. Generate deterministic Next Best Content Action.
4. Validate against BrandOS policies.
5. Save the resulting content asset into the existing Content Library.
6. Display IntelligenceOS evidence and measurement plan.
7. Preserve handoff to current Launch planning until the new ownership decision is complete.

## Required Validation

- `pnpm typecheck`
- `pnpm build`
- existing automated tests
- new pure-logic tests for recommendation and policy checking
- browser workflow against an identifiable commit
- persistence reload verification
- no regression in the existing BrandOS → Content Library → LaunchOS path

## Explicitly Deferred

- mass module renaming,
- deletion of ContentOS, LaunchOS, ManagementOS, or AnalyticsOS code,
- full DesignOS editor,
- SalesOS CRM implementation,
- GrowthOS implementation,
- authentication and public self-service release,
- external image-generation or publishing integrations,
- Adobe or Canva partnership work.

## Next Technical Action

Perform a file-level capability inventory of:

- `src/config/modules.ts`,
- BrandOS types, routes, persistence, and components,
- ContentOS types, routes, persistence, Content Library, and handoffs,
- LaunchOS contracts and storage,
- analytics / insight logic,
- current navigation and route registration.

The result should identify exact files to preserve, adapt, move, or supersede before implementation begins.
