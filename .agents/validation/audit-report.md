# FLCRM-22122 — Fulcrum Auditor report

**Audit status:** `PR_READY`
**Overall result:** `PASS` with recorded environment/evidence limitations.

## Scope and revisions

- Repository: `fulcrumapp/fulcrum-expressions`
- Branch: `treyhyde-psychic-system`
- Audited implementation/test HEAD: `21c9295bd3dd7dc0a8113ad3fba2d33ce8bc0f32`
- Parent: `c36eb3abd671d42bc5a6264f8bdfad637db206b6`
- Jira: `FLCRM-22122`
- Locked specification: `.agents/specs/active-spec.md`
- QA scenarios: `.agents/validation/qa-scenarios.md`
- Pinned app-mcp contract fixture used by this checker:
  `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4`
- Live app-mcp PR 34 head observed by the integration coordinator:
  `473ffe8545d6cb56d1acf43b9a6b8cc27aa6a6fa`
  (the live head differs from the pinned fixture; fixture consumers must not
  treat the fixture SHA as the live PR head)

This report replaces the stale report for `c36eb3a` and audits the exact current
HEAD. Earlier SHAs in the revision history are superseded implementation
checkpoints, not alternate audited heads. No production file was changed by the
audit; only this report and `.agents/state.json` are lifecycle metadata.

## Narrow delta audit: `a884917` -> `d1c8186` -> `39ad1bd` -> `8149841` -> `e2c1306` -> `70882f9` -> `da19385` -> `db4d14f` -> `3689dd2` -> `1fe4835` -> `58657fe` -> `27a0d99` -> `ebdc72c` -> `1d4faf6` -> `179c100` -> `21c9295`

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
focused suite passed **67 tests** on the committed implementation/test head; the
full suite passed **452 tests**. The AST budget regression confirms suppressed
API policies do not bypass traversal limits. Chained calls are no longer mislabeled as dynamic API
references, the valid local `$` identifier is not treated as a form field, and
the pinned compiler is present in devDependencies for deterministic builds.
Change-geometry messaging now explicitly describes the authoritative repeatable
target rule. TypeScript-only diagnostics use the probe source for ranges,
version mismatch skips are emitted only for requested checks, form identifiers
are recognized only in reference positions, and semantic form diagnostics are
gated by fields/dependencies coverage. Provably non-function hook callbacks
(including numeric, boolean, null, array, and no-substitution template literals)
are rejected, while syntax and TypeScript-only diagnostics are emitted only
when `syntax` is requested.
Hook policies now reject extra arguments beyond the supported two- and
three-argument overloads, and calculation wrappers preserve object-shaped
repeatable scopes. The published README includes the minimal checker entry
point while detailed checker documentation remains repository-side.
Form byte accounting now has an explicit depth bound, the TypeScript probe is
skipped when syntax is not requested and shares source AST limits when active,
and global-state isolation cleanup is exception-safe.
Version metadata now accepts only explicit version fields, form byte accounting
is consolidated into structural collection, and extensionless runtime asset
subpaths are explicitly exported.
The package explicitly preserves the bare `dist` subpath, and source AST and
form traversal use separately named resource limits. The duplicate TypeScript
declarations are documented as intentional: optional at runtime, pinned in
devDependencies for deterministic repository builds.

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
| `git rev-parse HEAD` | `36e8bad1b767836edc3570e8cc4da536e9b4d9d1` |
| pinned app-mcp contract fixture | `0bbd776019c79b2aa1cf0a2e6da287d8a7b767f4` (fixture snapshot; not the live PR head) |
| live app-mcp PR 34 head observed by coordinator | `473ffe8545d6cb56d1acf43b9a6b8cc27aa6a6fa` |
| focused checker Mocha | **67 passing** |
| `yarn test` | **452 passing** |
| `yarn build:checker` | passed |
| `yarn build` | passed, `Done in 2.87s` |
| `node --check checker/index.js checker/api.js checker/generate-api.js` | passed |
| committed package export smoke | passed; `@fulcrumapp/fulcrum-expressions/checker` resolves the three public functions and no broad `./*` export exists |
| `npm pack --dry-run --json` | passed; 298 files; checker and runtime entries present; no archive |
| installed packed-package smoke | passed from tarball SHA-256 `a73251238865ecaacabf8823cf22267a89871ed9f6e30e2401e33def98d5575d`; checker exports, `checker/api.js`, `checker/lib.js`, `dist/expressions.js`, bare `dist`, and version metadata resolved |
| current-head installed packed-package smoke | passed from tarball SHA-256 `8fcbacccd06d4d8107c27279e6cc2f5ab8e2374dfca05b701db7f1b506b8a65e`; all four public checker invocations and installed assets resolved |
| latest-head installed packed-package smoke | passed from tarball SHA-256 `3918e09d2fe83adc32d09a68e30805c053ba23eb91d2fc533e8d55b26a565f07`; checker, bare `dist`, and extensionless runtime asset subpaths resolved |
| current clean-source installed packed-package smoke | passed from source commit `a7a5936cdedd14c94e4b7bf56ecabd9fe924de24` and tarball SHA-256 `2110d837c0dd3190509cf5aa20a74f678613182ce08306cfdb6c55114ff053ae`; seven full-response fixtures, named version metadata, exact form boundary, checker exports, declarations, and runtime assets resolved |
| review-fix clean-source installed packed-package smoke | passed from source commit `36e8bad1b767836edc3570e8cc4da536e9b4d9d1` and tarball SHA-256 `2381a0ebea6483f0cc583c5246e3d161264f0f71d91fc3a18c81595abbed595b`; eight full-response fixtures, canonical and shorthand repeatable scopes, named version metadata, exact form boundary, checker exports, declarations, and runtime assets resolved |
| `git diff --check` | passed; only lifecycle metadata modified |
| `make types` | **environment-blocked**, exit 2 after dts-generator; asdf has no configured Ruby 3.2.x, so `script/build.rb` could not run |

After `make types`, checked-in `ts/api.ts` was restored unchanged. The Ruby
3.2.x regeneration limitation remains explicit; it is not a checker runtime
failure.

## Gate result

`PR_READY` for audited implementation/test HEAD
`36e8bad1b767836edc3570e8cc4da536e9b4d9d1`.
Environment limitations are explicitly recorded and do not identify an
implementation defect. Publication, deployment, tagging, and merging remain
outside this audit and were not performed. Formal GitHub approval remains a
human-controlled blocker.
