# FLCRM-22122 — Fulcrum Auditor report

**Audit status:** `PR_READY`
**Overall result:** `PASS` with recorded environment/evidence limitations.

## Scope and revisions

- Repository: `fulcrumapp/fulcrum-expressions`
- Branch: `treyhyde-psychic-system`
- Audited HEAD: `463393c22cb72818d80ee2c0eb76dcfb7e517579`
- Parent: `c36eb3abd671d42bc5a6264f8bdfad637db206b6`
- Jira: `FLCRM-22122`
- Locked specification: `.agents/specs/active-spec.md`
- QA scenarios: `.agents/validation/qa-scenarios.md`
- Canonical app-mcp PR 34 head: `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4`
  (`git ls-remote` and `gh api` both resolved this exact SHA)

This report replaces the stale report for `c36eb3a` and audits the exact current
HEAD. The two implementation changes in this HEAD are the final version-mismatch
partition and checker-wide request-path fixes. No production file was changed by
the audit; only this report and `.agents/state.json` are lifecycle metadata.

## Prior findings F-01 through F-06

### F-01 — Version mismatch partition: PASS

`checker/index.js:1197-1204` now skips `api` for compiler, declaration-schema,
and runtime mismatches, and skips the profile check for runtime mismatches:

- calculation: `api` and `scope`;
- Data Event: `api` and `hooks`.

Focused and direct probes show the unaffected checks still complete and the
outcome is `incomplete`, with no artifact diagnostic. For both profiles, the
runtime-mismatch result retained `syntax` and the profile-specific
field/dependency check in `coverage.completed`; the two mismatch domains were
in `coverage.skipped` with `reason_code: VERSION_MISMATCH`. The calculation
partition matches canonical PR34 `docs/validation-fixtures/version-mismatch.json`
(`syntax` complete, `api`/`scope` skipped, `incomplete`).

### F-02 — Invalid-artifact requested-check partition: PASS

Unknown literal fields, invalid callbacks, and a calculation field without the
required repeatable scope returned `invalid` with an artifact diagnostic and
each requested check exactly once in `coverage.skipped` as
`INVALID_ARTIFACT`. No requested check was duplicated or omitted; unsupported
requested names remain only in `coverage.unsupported`.

### F-03 — Operational-limit and cancellation partition: PASS

Source limit, form/declaration limit, and pre-cancelled requests returned
`unavailable`, warning-only diagnostics, and one `coverage.failures` entry per
requested check. Source/form limits use `INPUT_LIMIT_EXCEEDED`; cancellation
uses `CHECK_TIMEOUT`. Operational failures are not converted into artifact
errors and do not appear in invalid-artifact buckets.

### F-04 — Canonical diagnostic/artifact paths: PASS

`diagnosticPath()` now emits checker-wide `$` unless the profile is exactly
`data_event` or `calculation`. Verified paths are:

- Data Event artifact diagnostics and unverified coverage: `$.source`;
- calculation artifact diagnostics and unverified coverage: `$.expression`;
- malformed/non-object requests, invalid operation/check arrays, unsupported
  profile, invalid feature index, and form-limit diagnostics: `$`.

`validate(null)` and `validate([])` both return `VALIDATION.INVALID_REQUEST` at
`$`; no non-object request falls back to `$.source`.

### F-05 — Deterministic diagnostic ordering: PASS

The comparator in `checker/index.js:1337-1349` sorts by JSON path, range start
line, range start column, severity (`error`, `warning`, `info`), code, and
message, with an unknown-severity fallback. Repeated identical analyses
returned byte-identical diagnostic arrays. A multi-diagnostic calculation probe
was ordered by source position and severity as required.

### F-06 — Strict operation/check validation: PASS

Non-`validate` operations, scalar `checks`, and arrays containing non-string
entries return `invalid`, empty requested coverage, and
`VALIDATION.INVALID_REQUEST` at `$`. An explicitly empty string array remains
the distinct valid-envelope `incomplete`/`MISSING_CHECK` case. Named but
unsupported checks remain explicitly unsupported and produce `incomplete`.

## Required contract/security/package evidence

- **Signatures:** `checker` exports `validate`, `checkDataEvent`, and
  `checkCalculation`, plus version/limit metadata; `package.json` preserves
  `main: dist/expressions.js` and exposes only the owner-approved
  `./checker: ./checker/index.js` subpath.
- **Package boundary:** `npm pack --dry-run --json` passed with 297 files,
  including `checker/index.js` and `dist/expressions.js`; no archive was
  created and the scoped runtime package was not aliased to another package.
- **Isolation:** focused/full tests passed throwing and global-mutation canaries,
  filesystem/module-resolution rejection, profile separation, redaction, and
  deterministic repeated analysis. The checker uses a fixed virtual host and
  does not initialize `runtime.coffee`, execute submitted source, resolve
  arbitrary files/packages, or make network calls.
- **Version provenance:** results report validator `3.0.1` (derived from the
  package version), TypeScript `4.9.5`,
  `ts/api.ts@3.0.1` declarations, runtime
  `@fulcrumapp/fulcrum-expressions@3.0.1`, declaration identity, profile, and
  contract `v1`.
- **No lint script:** `package.json` has no dedicated lint script. This is
  recorded as an evidence limitation; build, syntax, focused, and full tests
  were run instead.
- **No release actions:** no PR, publication, deployment, tag, merge, Jira
  mutation, HTTP/auth adapter, or worker integration was created or run.

## Commands and exact results

| Command/check | Result |
| --- | --- |
| `git rev-parse HEAD` | `463393c22cb72818d80ee2c0eb76dcfb7e517579` |
| `git ls-remote https://github.com/fulcrumapp/app-mcp.git refs/pull/34/head` | `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4` |
| `gh api repos/fulcrumapp/app-mcp/pulls/34 --jq .head.sha` | `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4` |
| focused checker Mocha | **30 passing** |
| `yarn test` | **415 passing** |
| `yarn build:checker` | passed |
| `yarn build` | passed, `Done in 2.87s` |
| `node --check checker/index.js checker/api.js checker/generate-api.js` | passed |
| `npm pack --dry-run --json` | passed; 297 files; no archive |
| `git diff --check` | passed; only lifecycle metadata modified |
| `make types` | **environment-blocked**, exit 2 after dts-generator; asdf has no configured Ruby 3.2.x, so `script/build.rb` could not run |

After `make types`, checked-in `ts/api.ts` was restored unchanged. The final
tracked working tree contains only `.agents/state.json` and this audit report.

## Gate result

`PR_READY` for audited HEAD `1d54e8684fa40143cf064fa54cc4aaf5207bb5c4`.
Environment limitations are explicitly recorded and do not identify an
implementation defect. Publication, deployment, tagging, merging, and PR
creation remain unauthorized and were not performed.
