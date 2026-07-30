# 3. Site stays at repo root for GitHub Pages (no monorepo move)

- Date: 2026-07-30
- Status: Accepted

## Context

The vision sketches a monorepo tree (`apps/`, `case-studies/`, `playbook/`,
`website/`). But the live site is served by GitHub Pages from the repository
root (`index.html` + `CNAME` at root, custom domain mondspace.com). Moving
`index.html` into a `website/` subfolder would break the deployed site unless
Pages is reconfigured, and offers no visitor-facing benefit today.

## Decision

Keep the deployable site at the repository root. Organise *content* into
folders/modules instead of relocating the site. Treat "apps" and "case studies"
as content categories and, where interactive, as self-contained modules under
`js/` — not as separately deployed packages.

## Consequences

- The live site keeps working with no Pages/DNS changes.
- We get the vision's organisational clarity via `js/content/` modules and
  `docs/`, without the risk and churn of a physical monorepo move.
- If Mondspace ever needs independently built/deployed apps, revisit this with a
  new ADR (e.g. adopt a build step + `docs/` publish dir, or a subpath deploy).
