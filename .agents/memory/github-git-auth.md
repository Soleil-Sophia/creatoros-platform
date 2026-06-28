---
name: GitHub git auth from agent shell
description: Why git network ops (fetch/checkout/push) fail from the agent's bash but work in the user's terminal
---

# GitHub git operations fail from agent bash

`git fetch` / `git ls-remote` / `git push` run from the agent's `bash` tool against
`https://github.com/Soleil-Sophia/creatoros-platform` fail with:
`remote: Invalid username or token. Password authentication is not supported for Git operations.`
or hang to timeout with no output.

The **user's interactive Replit terminal** has the GitHub credentials wired up and
the same commands succeed there.

**Why:** the agent bash sandbox does not carry the user's GitHub credential helper /
token, so any authenticated git network operation against the private repo fails.

**How to apply:** do not retry git network ops from bash hoping they'll work. Read-only
*local* git (e.g. `git --no-optional-locks status`, `git log HEAD..origin/<branch>`,
`git branch -a`) is fine and reflects the last state the user fetched manually. When a
fresh fetch/checkout/push is needed, ask the user to run it in their terminal, then
continue with local operations (npm install, build, restart workflow).
