# FLCRM-22122 — Add headless expression checker

## Summary

Implements the approved transport-neutral pure validator from
[FLCRM-22116](https://fulcrumapp.atlassian.net/browse/FLCRM-22116) comment
205727. The checker analyzes deployable JavaScript for Fulcrum Data Events and
calculations without evaluating candidate source or changing the existing
CoffeeScript runtime.

## What changed

- Adds the CommonJS `./checker` subpath to
  `@fulcrumapp/fulcrum-expressions`.
- Exports `validate`, `checkDataEvent`, and `checkCalculation`, plus exact
  version/limit/policy metadata.
- Uses TypeScript 4.9.5 `allowJs`/`checkJs`/`noEmit` with a fixed in-memory
  compiler host and bundled generated `ts/api.ts`/standard-library declarations.
- Adds distinct Data Event and calculation profiles, nullable form variables,
  repeatable scope, literal AST field/hook checks, calculation restrictions,
  and explicit dynamic unverified coverage.
- Returns the approved v1 envelope and outcome direction:
  error → `invalid`, checker/dependency failure → `unavailable`, missing or
  unsupported/unverified requested coverage → `incomplete`, otherwise `valid`.
- Adds adversarial nonexecution, limits, invalid-call, repeatable, dynamic
  reference, nullable, redaction, and provenance tests.
- Adds public checker documentation without changing `runtime.coffee`,
  `dist/expressions.js`, browser assets, or the unscoped report-generator
  package boundary.

## Jira

- FLCRM-22122
- Contract/coordinator approval: FLCRM-22116#205727

## Validation

- `yarn install --frozen-lockfile`
- `yarn build`
- `yarn test` — 397 passing
- Focused checker tests — 12 passing
- `node --check checker/index.js`
- `npm pack --dry-run --json` — package includes checker entry point and excludes
  `.agents` lifecycle artifacts
- `make types` reached dts-generator but is blocked at `script/build.rb` by the
  unavailable configured Ruby 3.2.0 asdf tool; checked-in `ts/api.ts` is unchanged.
- No repository lint script exists.

## Release and safety gates

This PR does not publish, tag, deploy, configure HTTP/auth, add a worker
adapter, or change production assets. Package publication and deployment remain
separate approvals.
