# CreatorOS Repository Governance

**Status:** Proposed Canonical
**Owner:** Soleil Sophia Lucestella Voggenreiter
**Canonical Repository:** `Soleil-Sophia/creatoros-platform`

---

## 1. Objective

This document removes ambiguity about which CreatorOS repository is used, what each related repository is allowed to contain, and how capabilities move into the canonical product.

---

## 2. Repository Registry

| Repository | Classification | Allowed Use | New Product Development | End State |
|---|---|---|---:|---|
| `Soleil-Sophia/creatoros-platform` | **CANONICAL** | Product code, architecture, routes, releases, documentation | Yes | Permanent source of truth |
| `Soleil-Sophia/creatoros-insight` | **MIGRATION SOURCE** | Capability comparison and controlled migration | No | Archive after migration closure |
| `Soleil-Sophia/creator-os` | **LEGACY REFERENCE** | Historical module and UX reference only | No | Archive or retain read-only |
| `Soleil-Sophia/creator-spark-ai-82` | **LEGACY / EXPERIMENT** | Selective idea reference only | No | Archive |
| `Soleil-Sophia/CreatorGlow-WebApp-main` | **SEPARATE LEGACY PRODUCT** | Use only through an explicit capability decision | No CreatorOS work | Review separately |
| `Soleil-Sophia/creator_hub` | **UNRELATED / TUTORIAL** | No CreatorOS authority | No | Archive when safe |
| `Soleil-Sophia/creator-hub` | **LEGACY / UNCLASSIFIED** | No CreatorOS authority until audited | No | Audit, then archive or reclassify |

A new repository must not be created for a CreatorOS module, redesign, experiment, migration, or beta unless an Architecture Decision Record explicitly proves why a branch or project variant is insufficient.

---

## 3. Canonical Repository Responsibilities

`creatoros-platform` owns:

- the CreatorOS product shell,
- canonical module definitions,
- functional module implementations,
- cross-module contracts,
- routing,
- shared core logic,
- persistence adapters,
- AI connector contracts,
- tests and validation,
- design tokens and shared components,
- deployment configuration,
- current documentation,
- release decisions.

Only canonical `main` may be described as the current CreatorOS product.

---

## 4. Tool Roles

### GitHub

GitHub is the product truth and change record.

### Lovable

Lovable is an implementation and design environment. A Lovable project is not an independent product authority. Work intended for CreatorOS must target the canonical repository or be treated as a temporary migration source.

Canonical Lovable-related rule:

- Existing `CreatorOS Insight` is a source of capabilities.
- New features must not expand it independently.
- The preferred future Lovable workspace must operate against `creatoros-platform`.

### Replit

Replit is a runtime, development, or preview environment. Its displayed module statuses and UI are not authoritative unless they are generated from the current canonical commit.

### Claude Code, Codex, Copilot, and other agents

Agents are execution tools. Their summaries are not product truth without code, commit, and validation evidence.

---

## 5. Branch Policy

Use short-lived branches with a single purpose.

Recommended prefixes:

- `docs/` — governance and documentation,
- `audit/` — evidence collection without product changes,
- `migration/` — capability transfer,
- `feat/` — new canonical functionality,
- `fix/` — defects,
- `refactor/` — behavior-preserving structural change,
- `release/` — release preparation.

No long-running parallel product branch may become a hidden second main branch.

---

## 6. Pull Request Policy

Every pull request must answer:

1. What problem does this solve?
2. Which canonical module owns it?
3. Which source capability, issue, or decision authorizes it?
4. What exact files and contracts change?
5. What was tested?
6. What remains incomplete?
7. Which documentation and status records must change?

Architecture-changing pull requests remain draft until the decision record is approved.

---

## 7. Capability Migration Record

Every migrated capability must have one row in the canonical migration ledger with:

- capability ID,
- source repository and commit,
- source paths,
- target module,
- target paths,
- action: migrate, merge, verify, rewrite, keep, defer, or remove,
- dependencies,
- validation gates,
- PR number,
- merged commit,
- current status,
- source disposition.

A capability is not considered migrated merely because a similar file exists.

Migration closes only after:

- target behavior is reachable,
- validation passes,
- route and navigation state are correct,
- documentation is updated,
- source capability is marked superseded.

---

## 8. Repository Labels

Each related repository README should eventually display one of these notices at the top:

### Canonical Notice

> **CANONICAL REPOSITORY** — This repository is the single source of truth for CreatorOS product development and releases.

### Migration Source Notice

> **MIGRATION SOURCE — NO INDEPENDENT DEVELOPMENT** — Capabilities are being evaluated and migrated into `Soleil-Sophia/creatoros-platform`.

### Legacy Notice

> **LEGACY / SUPERSEDED** — This repository is retained for historical reference only. Do not use it as the current CreatorOS product.

### Archived Notice

> **ARCHIVED** — Migration or deprecation is complete. No further development is permitted.

Repository descriptions and GitHub archive state should match these notices.

---

## 9. Documentation Authority

The following order applies inside `creatoros-platform`:

1. `docs/CONSTITUTION.md`
2. approved ADRs and change records
3. verified canonical code
4. `docs/ARCHITECTURE.md`
5. module definitions
6. migration and stabilization records
7. historical audits and roadmaps

Outdated documents must carry a visible `SUPERSEDED`, `HISTORICAL`, or `NEEDS REVALIDATION` banner.

---

## 10. Immediate Governance Actions

1. Merge the constitution and governance documentation.
2. Add canonical and legacy notices to repository READMEs.
3. Freeze independent development in `creatoros-insight`.
4. Audit all remaining CreatorOS-related repositories.
5. Update `creatoros-platform` module statuses from verified evidence.
6. Continue migration only through scoped PRs.
7. Archive source repositories after capability closure and Founder approval.
