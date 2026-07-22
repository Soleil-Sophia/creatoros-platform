# CreatorOS Documentation Policy

**Status:** Canonical Completion Rule

Documentation is part of the product. A change is incomplete when code, routes, status, architecture, or release truth changes without the corresponding documentation update.

## Pull Request Documentation Gate

Every meaningful PR must mark each item as updated or not applicable:

- README
- module documentation
- architecture or contract documentation
- Product Map
- Capability Inventory
- Platform Access or deployment record
- release notes
- ADR when architecture changes
- known limitations

## Update Triggers

Update README when product status, setup, supported modules, lifecycle, repository, or deployment access changes.

Update Product Map when a gate, blocker, sprint, module status, or authorized next step changes.

Update Capability Inventory when code presence, routes, persistence, integration, or runtime evidence changes.

Update Architecture when module boundaries, contracts, persistence ownership, routing, feedback, or intelligence placement changes.

Create an ADR when repository authority, cross-module contracts, storage or authentication architecture, product placement, or a major rejected alternative changes.

Update release notes for every merged PR affecting behavior, access, status, or validation.

## Current vs Historical

Current documents must state `Canonical`, `Active`, or `Current`. Outdated documents must be marked `SUPERSEDED`, `HISTORICAL`, `NEEDS REVALIDATION`, or `LEGACY DRAFT`.

## Evidence Rule

Documentation must distinguish code presence, runtime validation, inference, planned work, completed work, and release-approved behavior. A successful build does not prove a complete user workflow.

## Definition of Done

A change is done only when implementation, validation, limitations, current documentation, Product Map, and release notes agree.
