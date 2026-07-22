# CreatorOS Constitution

**Status:** Proposed Canonical Governance
**Version:** 1.0
**Owner:** Soleil Sophia Lucestella Voggenreiter
**Operating Area:** LXST SYSTEMS
**Canonical Repository:** `Soleil-Sophia/creatoros-platform`

---

## 1. Purpose

This constitution defines the non-negotiable product, repository, architecture, development, documentation, and release rules for CreatorOS.

Its purpose is to prevent:

- parallel product truths,
- contradictory repository states,
- undocumented architecture drift,
- duplicated modules,
- status labels that do not match reality,
- migrations without evidence,
- design work disconnected from functional product substance.

When another document, branch, repository, prototype, screenshot, Lovable project, Replit preview, or agent statement conflicts with this constitution, this constitution and the current canonical repository state take priority unless the Founder explicitly approves a replacement.

---

## 2. Product Identity

CreatorOS is a modular creator operating system for structured creator work.

Its canonical core flow is:

`BrandOS → ContentOS → LaunchOS → ManagementOS → AnalyticsOS`

Each module must provide standalone value while supporting a clean exchange of data with adjacent modules.

CreatorOS is not:

- a generic SaaS dashboard,
- a collection of disconnected AI tools,
- a public umbrella for all LXST or SOREYA products,
- a general-purpose knowledge system,
- a facade made of planned module cards without functioning workflows.

General learning, knowledge management, deep research, personal development, and orientation belong to SOREYA. CreatorOS may contain only creator-specific research capabilities that directly support brand, content, launch, management, or analytics workflows.

---

## 3. Canonical Repository Rule

The only canonical product repository is:

`Soleil-Sophia/creatoros-platform`

The `main` branch of that repository is the single source of truth for:

- production code,
- product architecture,
- module status,
- routes,
- data contracts,
- migrations,
- design system,
- documentation,
- release state.

No other repository may independently claim to represent the current CreatorOS product.

---

## 4. Repository Classification

Every CreatorOS-related repository must have one explicit classification:

### Canonical

Actively developed source of truth.

Current assignment:

- `creatoros-platform`

### Migration Source

Contains capabilities that may be migrated into the canonical repository. It must not receive independent product expansion.

Current assignment:

- `creatoros-insight`

### Legacy Reference

May contain historical designs, experiments, or implementation ideas. It is read-only for product decisions unless a capability is explicitly selected for migration.

Examples include older CreatorOS, Creator Hub, Creator Spark, or CreatorGlow repositories.

### Archived

Migration is complete or the project is superseded. No further development is allowed.

A repository may change classification only through an explicit architecture decision record.

---

## 5. Product Truth Hierarchy

When sources disagree, use this order:

1. Founder-approved constitution and architecture decisions.
2. Verified code on canonical `main`.
3. Passing automated and manual validation evidence.
4. Canonical architecture and module documentation.
5. Open pull requests and migration ledgers.
6. Lovable or Replit previews.
7. Screenshots, agent summaries, old roadmaps, and legacy repository documentation.

A preview is evidence of rendering, not proof of architecture, persistence, integration, security, or release readiness.

---

## 6. Module Constitution

A module belongs in CreatorOS only when all of the following are true:

1. **Standalone value** — it solves a complete creator problem independently.
2. **System position** — its responsibility and boundaries are explicit.
3. **Data contract** — its inputs and outputs are defined.
4. **Integration path** — its handoff to adjacent modules is known.
5. **Truthful status** — its displayed status matches verified implementation.
6. **Ownership** — its code, routes, storage, and documentation have a canonical location.

No module may be called active merely because a card, page shell, mock screen, or document exists.

---

## 7. Status Definitions

Only these statuses may be used:

### Planned

Approved concept or specification exists, but no verified functional workflow exists in canonical `main`.

### In Migration

Capability exists in a source repository and is being transferred through an approved migration plan.

### Implemented

Code exists in canonical `main`, but full functional validation or integration is incomplete.

### Beta

The primary workflow is reachable, functional, persistent at the defined beta level, and has passed its beta gate.

### Active

Production-ready for the intended user group with validated persistence, error handling, security, documentation, and monitoring.

### Labs

Experimental or internal capability that is intentionally excluded from the supported product contract.

Status must be based on evidence, not optimism.

---

## 8. Architecture Change Rule

A change requires an Architecture Decision Record when it affects any of the following:

- canonical repository,
- module boundaries,
- product hierarchy,
- route structure,
- persistence model,
- cross-module contracts,
- authentication or authorization,
- AI execution model,
- deployment architecture,
- removal or renaming of a canonical capability.

The decision record must include:

- problem,
- decision,
- alternatives considered,
- consequences,
- migration impact,
- rollback strategy,
- Founder approval state.

No agent may silently redefine the architecture while implementing a feature.

---

## 9. Migration Rule

Repository migration is capability-based, not repository-based.

The required order for each capability is:

1. identify source and target,
2. define canonical contract,
3. compare existing implementations,
4. migrate types and pure logic,
5. migrate persistence and integrations,
6. migrate UI,
7. connect routes,
8. validate behavior,
9. update status and documentation,
10. mark the source capability superseded.

Blind copying, whole-repository merging, and parallel rewrites are forbidden unless explicitly approved.

---

## 10. Development Rule

All meaningful work must occur through a named branch and pull request unless it is an emergency repair explicitly approved by the Founder.

Each pull request must state:

- scope,
- affected module,
- files changed,
- functional behavior added or changed,
- validation performed,
- architecture and documentation impact,
- known limitations.

A pull request must not combine unrelated architecture, feature, design, and cleanup work.

---

## 11. Documentation Rule

Documentation is part of the product, not optional commentary.

A change is incomplete when it changes product truth without updating the corresponding canonical documentation.

Required canonical documents are:

- `CONSTITUTION.md` — non-negotiable governance,
- `ARCHITECTURE.md` — current product and technical architecture,
- `REPOSITORY-GOVERNANCE.md` — repository roles and lifecycle,
- `STABILIZATION-PLAN.md` — current consolidation and release program,
- module definitions — scope and contracts,
- decision records — approved changes,
- migration ledger — capability transfer state,
- release checklist — evidence for release decisions.

Historical documents must be marked as superseded when they no longer describe reality.

---

## 12. AI and Agent Rule

AI agents may propose and implement work, but may not independently:

- redefine the product hierarchy,
- create a new canonical repository,
- mark a module beta or active,
- delete migration sources,
- merge architectural changes,
- claim validation that was not executed,
- replace truthful limitations with marketing language.

Agents must distinguish between:

- observed fact,
- inferred state,
- proposed decision,
- completed implementation,
- validated result.

---

## 13. Release Constitution

CreatorOS may not be called beta solely because it looks complete.

The minimum closed-beta proof is:

1. A user creates or loads a Brand Profile.
2. ContentOS receives and uses that profile.
3. A real content asset is generated or deterministically produced.
4. The asset is saved and survives reload.
5. The asset can enter a LaunchOS plan.
6. The workflow has truthful loading, empty, success, and error states.
7. Critical routes are reachable from the product navigation.
8. The tested commit is identifiable.
9. Known beta limitations are documented.

Public self-service beta additionally requires authentication, user isolation, production persistence, security review, privacy requirements, and operational monitoring.

---

## 14. Founder Authority

The Founder is the final product and architecture authority.

The Founder may approve exceptions, but each exception must be documented with:

- the rule being overridden,
- the reason,
- the duration or scope,
- the resulting risk.

Silence, an old prompt, or an agent assumption is not approval.

---

## 15. Amendment Rule

This constitution may be changed only through a dedicated pull request titled as a constitutional amendment.

Every amendment must include:

- exact sections changed,
- reason for change,
- expected consequences,
- Founder approval.

Version history must be preserved.
