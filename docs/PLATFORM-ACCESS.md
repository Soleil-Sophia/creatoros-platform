# CreatorOS Platform Access

**Status:** Canonical Access Guide
**Canonical Repository:** `Soleil-Sophia/creatoros-platform`
**Production Branch:** `main`

## 1. Latest Production Platform

Use the stable Vercel branch alias:

`https://creatoros-platform-git-main-lxst.vercel.app/platform/`

This URL follows the current deployment of the canonical `main` branch. After an approved pull request is merged and the production deployment succeeds, the same URL should show the new canonical platform state.

## 2. Latest Verified Production Deployment

Current deployment for merge commit `d2d193e65be4a6b6513aa60215ca2fbac43b4afc`:

`https://creatoros-platform-al76wsc50-lxst.vercel.app/platform/`

Unlike the branch alias, this deployment URL is immutable and remains tied to that specific commit.

## 3. Preview Deployments

Each pull request receives a Vercel preview deployment.

Preview deployments are used for:

- browser validation before merge,
- route checks,
- interaction tests,
- mobile and desktop review,
- visual review against the exact proposed commit.

A preview is not the canonical product state until its pull request is approved, merged into `main`, and successfully deployed to production.

## 4. Truth Rule

When environments disagree, use this order:

1. canonical GitHub `main` commit,
2. successful production deployment for that commit,
3. stable `main` branch alias,
4. pull-request preview,
5. Replit or Lovable preview.

Replit and Lovable may show useful development states, but they do not define the current canonical release.

## 5. Required Release Record

Every beta or release verdict must record:

- Git commit SHA,
- Vercel deployment URL,
- environment type,
- validation date,
- tested routes and workflows,
- known limitations.
