# FLCRM-22122 — Audit evidence

## Scope

Manual Fulcrum OS audit of the approved pure-validator implementation at
`526cf2d54e4cb3c11945fa058030a251bb60ce37`, against the locked specification,
FLCRM-22116#205727, and the QA scenarios. No transport, HTTP/auth, package
publication, deployment, tag, merge, or production-asset scope was introduced.

## Findings

No high-confidence implementation, isolation, or contract defects remain.

* The checker exports a CommonJS `./checker` subpath while preserving
  `main: dist/expressions.js`.
* The compiler host contains only candidate source, generated form declarations,
  generated `ts/api.ts`, bundled pinned standard-library text, and fixed globals.
  Module resolution, host filesystem methods, candidate imports, source execution,
  network calls, and runtime initialization are not available to submitted code.
* Data Event and calculation rules are separate. Literal field/hook references
  are checked against the supplied form; computed references are skipped as
  unverified and cannot return unqualified `valid`.
* Result precedence, coverage retention, nullable declarations, repeatable scope,
  limits, diagnostics caps, version mismatch handling, and redaction were tested.
* The existing CoffeeScript runtime and generated production assets are
  unchanged.

## Evidence limitations

* `make types` completed dts-generator but could not run the Ruby declaration
  flattening step because the configured Ruby 3.2.0 asdf installation is absent.
  The checked-in generated `ts/api.ts` was restored unchanged and the bundled
  checker declaration was regenerated from it.
* The repository has no dedicated lint command.
* Worker wall-clock/memory/concurrency enforcement and HTTP/auth behavior remain
  explicitly outside this pure-core PR.

## Gate result

`PR_READY` for the implementation commit, pending the explicit protected
publisher/PR approval. Package publication, merge, tag, and deployment remain
unauthorized.
