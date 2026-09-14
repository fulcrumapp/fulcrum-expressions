# FLCRM-22122 — Fulcrum Auditor report

**Audit status:** `PR_READY`
**Overall result:** `PASS` with recorded environment/evidence limitations.

## Scope and revisions

- Repository: `fulcrumapp/fulcrum-expressions`
- Branch: `treyhyde-psychic-system`
- Audited implementation/test HEAD: `58657fe1d04507be4367352eb45bc24f2875fd4f`
- Parent: `c36eb3abd671d42bc5a6264f8bdfad637db206b6`
- Jira: `FLCRM-22122`
- Locked specification: `.agents/specs/active-spec.md`
- QA scenarios: `.agents/validation/qa-scenarios.md`
- Canonical app-mcp PR 34 head: `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4`
  (`git ls-remote` and `gh api` both resolved this exact SHA)

This report replaces the stale report for `c36eb3a` and audits the exact current
HEAD. Earlier SHAs in the revision history are superseded implementation
checkpoints, not alternate audited heads. No production file was changed by the
audit; only this report and `.agents/state.json` are lifecycle metadata.

## Narrow delta audit: `a884917` -> `d1c8186` -> `39ad1bd` -> `8149841` -> `e2c1306` -> `70882f9` -> `da19385` -> `db4d14f` -> `3689dd2` -> `1fe4835` -> `58657fe`

The registered PR head adds only requested-check normalization, hook-target type
normalization, requested-coverage gating, required Data Event callbacks, and
nested coverage traversal, bounded form accounting, version provenance,
profile-specific hook validation, target arity validation, and efficient
coverage uniqueness, plus focused regressions and lifecycle evidence updates.
Duplicate requested checks are de-duplicated in first-seen order before
coverage accounting. Hook target comparisons use the existing normalized
field-type representation, covering casing, spaces, and separators. Profile,
field, API, semantic, and AST-limit policies now emit coverage or diagnostics
only for enabled requested checks; AST-limit failures remain unscoped until
requested coverage is populated. Hooks now reject missing or literal
non-function callbacks, and form-level hooks reject field targets. API-policy
suppression no longer returns early from AST traversal, so requested
field/dependency checks still inspect nested arguments inside `require`,
dynamic imports, and forbidden calculation APIs. Form traversal truncation and
conservative serialized-size limits now return bounded unavailability instead
of producing partial-form diagnostics. Context-limit diagnostics use the
checker-level `$` path. Convenience wrappers normalize missing v1 envelope
defaults. Runtime and declaration versions derive from package metadata, the
TypeScript compiler remains pinned but is optional for runtime-only installs,
and the non-standard package `checker` field was removed. Coverage buckets and
requested checks are bounded, missing optional TypeScript returns a structured
unavailable result, semantic diagnostics are skipped when API coverage is not
requested, explicit empty check selections remain incomplete, and missing hook
names are invalid. No runtime or public transport boundary changed. The
focused suite passed **49 tests** on the committed implementation/test head; the
full suite passed **434 tests**. The AST budget regression confirms suppressed
API policies do not bypass traversal limits. Chained calls are no longer mislabeled as dynamic API
references, the valid local `$` identifier is not treated as a form field, and
the pinned compiler is present in devDependencies for deterministic builds.
Change-geometry messaging now explicitly describes the authoritative repeatable
target rule. TypeScript-only diagnostics use the probe source for ranges,
version mismatch skips are emitted only for requested checks, form identifiers
are recognized only in reference positions, and semantic form diagnostics are
gated by fields/dependencies coverage.

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
- **Package boundary:** `npm pack --dry-run --json` passed with 298 files,
  including `checker/index.js` and `dist/expressions.js`; no archive was
  created and the scoped runtime package was not aliased to another package.
  The explicit `./checker`, `./dist/*`, and `./package.json` exports preserve
  the supported checker and runtime compatibility paths without a broad
  wildcard export.
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
- **No release actions:** PR #114 exists and targets `main`; no package
  publication, deployment, tag, merge, Jira mutation, HTTP/auth adapter, or
  worker integration was created or run.

## Commands and exact results

| Command/check | Result |
| --- | --- |
| `git rev-parse HEAD` | `58657fe1d04507be4367352eb45bc24f2875fd4f` |
| `git ls-remote https://github.com/fulcrumapp/app-mcp.git refs/pull/34/head` | `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4` |
| `gh api repos/fulcrumapp/app-mcp/pulls/34 --jq .head.sha` | `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4` |
| focused checker Mocha | **54 passing** |
| `yarn test` | **439 passing** |
| `yarn build:checker` | passed |
| `yarn build` | passed, `Done in 2.87s` |
| `node --check checker/index.js checker/api.js checker/generate-api.js` | passed |
| committed package export smoke | passed; `@fulcrumapp/fulcrum-expressions/checker` resolves the three public functions and no broad `./*` export exists |
| `npm pack --dry-run --json` | passed; 298 files; checker and runtime entries present; no archive |
| `git diff --check` | passed; only lifecycle metadata modified |
| `make types` | **environment-blocked**, exit 2 after dts-generator; asdf has no configured Ruby 3.2.x, so `script/build.rb` could not run |

After `make types`, checked-in `ts/api.ts` was restored unchanged. The Ruby
3.2.x regeneration limitation remains explicit; it is not a checker runtime
failure.

## Gate result

`PR_READY` for audited implementation/test HEAD
`58657fe1d04507be4367352eb45bc24f2875fd4f`.
Environment limitations are explicitly recorded and do not identify an
implementation defect. Publication, deployment, tagging, and merging remain
outside this audit and were not performed. Formal GitHub approval remains a
human-controlled blocker.
