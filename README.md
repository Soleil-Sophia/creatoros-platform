# CreatorOS

**A living creator lifecycle system by LXST SYSTEMS.**

CreatorOS connects creator identity, content production, launch planning, operations, measurement, and improvement in one continuous system.

```text
BrandOS → ContentOS → LaunchOS → ManagementOS → AnalyticsOS → Feedback
```

The product is not measured by how many modules exist. Its value comes from preserving context as work moves through the creator lifecycle.

---

## Current Status — July 2026

**Active program:** CreatorOS Stabilization Sprint 1  
**Canonical repository:** `Soleil-Sophia/creatoros-platform`  
**Production branch:** `main`

| Capability | Current truthful status |
|---|---|
| BrandOS | Implemented; extended profile and ContentOS context handoff require final sprint verification |
| ContentOS | Implemented and routed; production workflow, library persistence, and handoff validation are active sprint work |
| LaunchOS | Planner, storage, workflow UI, page, and routes exist; lifecycle integration is being validated |
| ManagementOS | Migration source only; not part of Stabilization Sprint 1 |
| AnalyticsOS | Migration source only; not part of Stabilization Sprint 1 |
| Authority Engine | Labs / internal |
| CommunityOS | Planned / deferred |
| General ResearchOS | Not part of CreatorOS; general knowledge and research belong to SOREYA |
| Authentication and user isolation | Not proven; required before public self-service beta |
| Production cloud persistence | Not proven for the complete lifecycle; browser-local persistence is the current closed-beta baseline under validation |

CreatorOS is suitable for an internal preview and is being prepared for a possible **closed beta**. It is not yet approved as a public self-service beta.

---

## See the Current Platform

Stable production alias following the latest successful deployment of canonical `main`:

**https://creatoros-platform-git-main-lxst.vercel.app/platform/**

Deployment and preview rules are documented in [`docs/PLATFORM-ACCESS.md`](./docs/PLATFORM-ACCESS.md).

---

## Canonical Product Model

### Lifecycle

```text
Identity → Create → Launch → Operate → Measure → Improve → Identity
```

### Module responsibilities

| Lifecycle stage | Module | Responsibility |
|---|---|---|
| Identity | BrandOS | Brand identity, audience, positioning, voice, and messaging context |
| Create | ContentOS | Brand-aware structured content assets and reusable library records |
| Launch | LaunchOS | Campaign sequence, timing, channels, and launch-plan persistence |
| Operate | ManagementOS | Tasks, publishing, ownership, deadlines, and execution evidence |
| Measure | AnalyticsOS | Performance signals, evidence, interpretation, and next actions |
| Improve | Feedback layer | Human-approved learning routed back to the stage able to act on it |

### Core architecture promise

> Context should travel farther than the user has to repeat it.

Modules are distinct boundaries, not isolated islands. Cross-module exchange must use explicit, validated contracts.

---

## CreatorOS Stabilization Sprint 1

### Objective

Prove the first honest lifecycle slice:

```text
BrandOS → ContentOS → LaunchOS
```

### Required gate

1. Create or load a Brand Profile.
2. Confirm ContentOS loads the same brand context.
3. Create an editable content asset.
4. Save it to the canonical Content Library.
5. Continue from ContentOS to LaunchOS.
6. Confirm the saved asset is selectable in LaunchOS.
7. Create and save a launch plan.
8. Reload and recover the plan at the declared persistence level.
9. Record the exact commit, deployment, test evidence, and known limitations.

LaunchOS remains unpromoted until this gate is complete.

See [`docs/STABILIZATION-SPRINT-1.md`](./docs/STABILIZATION-SPRINT-1.md) and [`docs/PRODUCT-MAP.md`](./docs/PRODUCT-MAP.md).

---

## Documentation Authority

Start here:

- [`docs/CONSTITUTION.md`](./docs/CONSTITUTION.md) — non-negotiable governance
- [`docs/CREATOROS-PRODUCT-PHILOSOPHY.md`](./docs/CREATOROS-PRODUCT-PHILOSOPHY.md) — why the product exists
- [`docs/LIFECYCLE-ARCHITECTURE.md`](./docs/LIFECYCLE-ARCHITECTURE.md) — lifecycle and contract architecture
- [`docs/REPOSITORY-GOVERNANCE.md`](./docs/REPOSITORY-GOVERNANCE.md) — repository roles
- [`docs/STABILIZATION-PLAN.md`](./docs/STABILIZATION-PLAN.md) — consolidation program
- [`docs/CAPABILITY-INVENTORY.md`](./docs/CAPABILITY-INVENTORY.md) — evidence-oriented current-state audit
- [`docs/PRODUCT-MAP.md`](./docs/PRODUCT-MAP.md) — current product map and next gates
- [`docs/PLATFORM-ACCESS.md`](./docs/PLATFORM-ACCESS.md) — production and preview access
- [`docs/DOCUMENTATION-POLICY.md`](./docs/DOCUMENTATION-POLICY.md) — documentation completion rules

When older documents conflict with verified code or the documents above, treat them as historical until explicitly revalidated.

---

## Repository Governance

| Repository | Role |
|---|---|
| `Soleil-Sophia/creatoros-platform` | **Canonical product repository** |
| `Soleil-Sophia/creatoros-insight` | Migration source; no independent product expansion |
| older CreatorOS repositories | Legacy reference pending archive or explicit classification |

GitHub `main` is the source of truth. Lovable and Replit are development or preview environments and do not independently define release state.

---

## Quick Start

### Requirements

- Node.js 18+
- pnpm

```bash
git clone https://github.com/Soleil-Sophia/creatoros-platform.git
cd creatoros-platform
pnpm install
pnpm dev
```

The Vite application is mounted with the `/platform/` base path in deployed environments.

### Validation commands

```bash
pnpm build
pnpm typecheck
```

Existing tests and CI coverage are being reconciled during Stabilization Sprint 1. Never claim a gate passed unless the exact command or browser workflow was executed against an identifiable commit.

---

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI / shadcn-style components
- Lucide React
- Vercel deployments
- Supabase dependencies and infrastructure exist, but production lifecycle usage must be proven before being described as active cloud persistence

---

## Development Rules

Every meaningful change must answer:

1. Which lifecycle stage and module own it?
2. Which contract, route, persistence behavior, or product state changes?
3. What evidence validates it?
4. Which documentation must change in the same pull request?

A feature is not complete until code, tests or validation evidence, README where affected, module/architecture documentation, product map, and release notes agree.

Do not:

- create parallel CreatorOS repositories,
- mark modules active from file presence alone,
- present local persistence as cloud sync,
- add generic research features that belong to SOREYA,
- merge architecture changes without a decision record,
- use visual polish to hide incomplete functionality.

---

## License

Proprietary — All Rights Reserved.

---

**Built with precision. Designed as a lifecycle. Structured to learn.**
