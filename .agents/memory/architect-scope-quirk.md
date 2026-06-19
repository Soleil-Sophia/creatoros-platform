---
name: Architect scope hallucination
description: code_review architect can falsely flag out-of-scope changes
---
The `architect` code-review subagent (called with `includeGitDiff: true`) has
repeatedly flagged files as "out of scope" that were actually from prior,
already-merged commits — not part of the current uncommitted change set.

**Why:** Its diff view can include committed history, not just the working-tree
changes you authored this turn.

**How to apply:** Before acting on any architect "scope adherence" complaint,
run `git --no-optional-locks status --porcelain` (or `git diff --name-only`).
Trust that as the source of truth for what *you* changed. Stage/commit only the
intended paths (e.g. `git add -A creatoros-site`) so the actual commit stays
scoped regardless of what the architect reports.
