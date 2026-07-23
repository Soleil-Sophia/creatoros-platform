# ADR-003 — CreatorOS OS Family and Controlled Migration

**Status:** Proposed — Founder direction recorded; implementation and merge require explicit approval  
**Date:** 2026-07-23  
**Owner:** Soleil Sophia Lucestella Voggenreiter  
**Operating Area:** LXST SYSTEMS  
**Canonical Repository:** `Soleil-Sophia/creatoros-platform`

## Problem

The current canonical CreatorOS architecture uses the lifecycle:

`BrandOS → ContentOS → LaunchOS → ManagementOS → AnalyticsOS → Feedback`

This model contains valuable implemented capabilities, but it no longer expresses the approved product vision precisely enough.

The approved strategic direction is a brand-governed content intelligence and execution platform with clear single-responsibility systems:

- BrandOS
- DesignOS
- CreatorOS
- IntelligenceOS
- SalesOS
- GrowthOS

The platform must recommend and produce the next best content action using brand identity, audience fit, business goals, channel context, performance evidence, and measurable lead/conversion potential. BrandOS and DesignOS remain controlled sources of truth. IntelligenceOS may recommend changes but must never silently alter canonical brand or design rules.

A second functional prototype currently exists in Lovable (`Creator Signal Hub`). It includes a Brand Playbook, deterministic Next Best Content Action, Brand Policy Check, explainable recommendation output, and an Insights Command Center. It is a migration source only and must not become a parallel canonical product.

## Decision

1. `Soleil-Sophia/creatoros-platform` remains the only canonical CreatorOS product repository.
2. GitHub `main` remains the product source of truth. Lovable projects are development or migration sources, not independent release truth.
3. The future canonical OS family is:
   - **BrandOS** — brand identity, positioning, audience, values, voice, policies, claims, no-gos, offers, and communication rules.
   - **DesignOS** — visual identity, typography, color, layout, imagery, motion, assets, product presentation, and channel-specific design rules.
   - **CreatorOS** — next-best content decisions and production-ready creative execution.
   - **IntelligenceOS** — evidence, interpretation, learning, confidence, and controlled recommendations.
   - **SalesOS** — leads, opportunities, pipeline, conversion, and revenue workflows.
   - **GrowthOS** — experiments, opportunity prioritization, investment, scaling, and strategic growth.
4. Each OS owns exactly one primary responsibility and one source of truth.
5. The OS is the platform; apps and workflows are tools within an OS.
6. Existing capabilities will be migrated by capability, not renamed or copied blindly:
   - ContentOS capabilities become CreatorOS apps/workflows where their responsibility is content decision, creation, library, or campaign preparation.
   - AnalyticsOS capabilities migrate into IntelligenceOS where they provide evidence, interpretation, confidence, measurement, or recommendations.
   - LaunchOS capabilities are evaluated individually. Campaign sequencing and launch planning likely become CreatorOS apps; execution ownership and operational scheduling may belong to a separate operational boundary only if justified by a later ADR.
   - ManagementOS capabilities are evaluated individually rather than automatically preserved as an OS.
   - LeadFabrik / lead and conversion capabilities become migration sources for SalesOS and future CreatorOS-to-SalesOS contracts.
7. No existing working capability is deleted solely because its module name changes.
8. IntelligenceOS recommends; humans decide. It may create `recommended` or `experimental` proposals but cannot write canonical BrandOS or DesignOS rules.
9. All migrations must follow the Constitution’s capability-based migration sequence and occur through focused pull requests.

## Naming and Governance States

Canonical governance states:

- **Canonical** — approved active rule.
- **Experimental** — temporary test hypothesis.
- **Recommended** — evidence-based proposal awaiting human approval.

## Alternatives Considered

### Keep the existing lifecycle unchanged

Rejected because ContentOS, LaunchOS, ManagementOS, and AnalyticsOS describe execution stages but do not fully express the approved brand-governed intelligence, sales, and growth architecture.

### Build a new CreatorOS repository from scratch

Rejected because the canonical repository already contains implemented capabilities, contracts, documentation, deployment configuration, and stabilization work. A rewrite would create duplicate truth and discard evidence.

### Continue building the Lovable prototype as the main product

Rejected because it would violate the canonical repository rule and create parallel architecture. The prototype remains a capability migration source.

### Rename all modules immediately

Rejected because naming changes without capability audits would hide boundary mistakes and risk breaking working flows.

## Consequences

### Positive

- Preserves existing working code and evidence.
- Aligns the platform with the approved strategic product vision.
- Creates a consistent LXST OS language.
- Prevents duplicate truths and automatic brand drift.
- Enables a focused release slice: BrandOS → CreatorOS → IntelligenceOS.

### Costs and Risks

- Existing documentation and UI labels will temporarily describe legacy module names.
- Some capabilities may need contract changes rather than simple moves.
- LaunchOS and ManagementOS responsibilities require careful decomposition.
- Migration may temporarily increase documentation overhead.

## Migration Impact

No production code is changed by this ADR alone.

The initial migration program will:

1. inventory current capabilities and routes,
2. map each capability to its future owning OS,
3. define canonical BrandOS, CreatorOS, and IntelligenceOS contracts,
4. migrate pure logic and types from the Lovable prototype where superior,
5. connect existing analytics evidence to the CreatorOS recommendation engine,
6. preserve Content Library and Launch planning behavior until replacement contracts pass validation,
7. update canonical documentation in the same pull requests,
8. mark superseded module documents as legacy only after their capabilities have a verified destination.

## Rollback Strategy

- Keep the current lifecycle code and routes intact until replacement workflows pass their gates.
- Implement migrations on isolated branches and draft PRs.
- Do not delete old module code in the same PR that introduces new contracts.
- If a migration fails validation, revert the focused PR and retain the prior canonical module behavior.

## Initial Release Target

The first product proof under the new architecture is:

`BrandOS → CreatorOS Next Best Content Action → IntelligenceOS Evidence and Recommendation`

The output must include at minimum:

- recommended format,
- target audience,
- business goal,
- hook,
- core message,
- script or content structure,
- shot list or visual direction,
- CTA,
- caption guidance,
- brand-policy check,
- reasoning,
- evidence,
- expected impact,
- confidence,
- measurement plan.

## Founder Approval

**Direction approved in product discussion by Soleil Sophia Lucestella Voggenreiter.**  
**Merge state:** Not yet authorized. This ADR must be reviewed together with the capability mapping before merge.
