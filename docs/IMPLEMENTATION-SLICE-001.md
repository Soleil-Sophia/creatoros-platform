# Implementation Slice 001 — CreatorOS Recommendation Core

**Status:** Authorized for implementation  
**Depends on:** ADR-003  
**Scope:** Pure typed domain logic only  
**No UI, route, storage, LaunchOS, or module-label changes**

## Objective

Add the deterministic, explainable core that turns a governed Brand Playbook plus request context into a production-ready Next Best Content Action.

## Files to add

- `src/core/creator-intelligence/types.ts`
- `src/core/creator-intelligence/policyCheck.ts`
- `src/core/creator-intelligence/recommendationBuilder.ts`
- `src/core/creator-intelligence/index.ts`

## Required contracts

- `GovernanceState`
- `BrandPlaybook`
- `CreatorRequestContext`
- `EvidenceItem`
- `MeasurementPlan`
- `BrandPolicyCheck`
- `ContentRecommendation`

## Required behavior

1. Pure deterministic recommendation builder.
2. Same inputs always produce the same output.
3. Brand-policy check evaluates tone, preferred CTA, allowed claims, and prohibited claims.
4. Prohibited claims produce `needs_review` with exact reasons.
5. No mutation of BrandOS input.
6. No external AI, network, browser storage, UI, or side effects.
7. Output includes format, audience, goal, hook, core message, structure/script, visual direction, CTA, caption guidance, policy check, reasoning, evidence, expected impact, confidence, and measurement plan.

## Deferred

- Brand Profile schema migration
- BrandOS UI fields
- Create UI
- Content Library snapshot persistence
- IntelligenceOS live analytics connection
- LaunchOS handoff validation

## Validation truth

This repository currently has no canonical unit-test runner in `package.json`. This slice therefore must not claim automated test execution until a dedicated test baseline is approved. The implementation remains pure and structured for later unit testing.
