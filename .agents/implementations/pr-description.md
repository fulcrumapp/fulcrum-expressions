# FLCRM-22122 — Add headless expression checker

## Why

The app-MCP integration needs reusable static preflight for Data Events and
calculations without executing submitted artifacts or rewriting the production
runtime. This PR implements the approved transport-neutral pure validator from
[FLCRM-22116](https://fulcrumapp.atlassian.net/browse/FLCRM-22116) comment
205727, against canonical app-mcp PR 34 head
`0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4`.

## Public API and package boundary

The exact exported API from
`@fulcrumapp/fulcrum-expressions/checker` is:

- `validate`
- `checkDataEvent`
- `checkCalculation`

The package adds only the additive `exports["./checker"]` subpath; the existing
`main: dist/expressions.js` is preserved. The explicit `exports["./dist/*"]`
compatibility entry keeps runtime deep imports resolvable without exposing
checker build internals. No production runtime asset or unscoped package
boundary is changed.

## Canonical requests

`validate(request)` accepts the common v1 request envelope. Data Event requests
use `artifact.source` and `context.form`; their default checks are
`syntax`, `api`, `hooks`, and `fields`. Calculation requests use
`artifact.expression`, `context.form`, the actual repeatable element key in
`context.repeatable`, and `context.feature_index`; their default checks are
`syntax`, `api`, `scope`, and `dependencies`. The repeatable value is the
runtime repeatable element key, not an enum describing scope.

## Semantics and isolation

- Diagnostic errors produce `invalid`.
- Operational checker/dependency failures produce `unavailable`.
- Missing, unsupported, unverified, or version-mismatched requested coverage
  produces `incomplete`.
- A result is `valid` only when all requested coverage is complete and
  error-free.
- Coverage explicitly records `requested`, `completed`, `skipped`,
  `unsupported`, `unverified`, and `failures`.

The checker uses a fixed in-memory TypeScript 4.9.5 host with
`allowJs`/`checkJs`/`noEmit`, pinned `ts/api.ts` declaration identity, and
runtime lineage `3.0.1`. Submitted code is never executed or imported; the
host has no filesystem, network, arbitrary module, or dependency loading.
Unknown literal fields are rejected, dynamic references remain incomplete, and
calculation restrictions and repeatable scope are checked separately from the
Data Event profile.

## Validation evidence

- `yarn build:checker` — passed
- `yarn build` — passed
- `yarn test` — **436 passing**
- Focused checker tests — **51 passing**
- `node --check` — passed
- `npm pack --dry-run` — passed; package boundary verified without creating an
  archive
- `git diff --check` — passed
- `make types` — explicitly environment-blocked after dts-generator because
  the configured Ruby 3.2 asdf install is missing; checked-in `ts/api.ts`
  remained unchanged
- No repository lint script exists

## Scope exclusions

This PR does not publish a package, add an HTTP/auth adapter, deploy a worker,
create a tag, merge code, or change production runtime assets. Package
publication and deployment remain separate approvals.

## Jira

- [FLCRM-22122](https://fulcrumapp.atlassian.net/browse/FLCRM-22122)
- Coordinator and common v1 approval:
  [FLCRM-22116](https://fulcrumapp.atlassian.net/browse/FLCRM-22116), comment
  `205727`
