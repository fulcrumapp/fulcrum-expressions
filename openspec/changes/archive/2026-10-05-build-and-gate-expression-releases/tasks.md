# Tasks

## 1. Shared adapter contract

- [x] 1.1 Define one adapter contract for legacy and hybrid invocation inputs, success/error results, lifecycle probes, and observable host effects; verify contract tests exercise both channels against the same assertions.

## 2. Side-by-side release build

- [x] 2.1 Build complete CoffeeScript legacy and hybrid channels in the same migration-release flow at `dist/legacy/expressions.js` and `dist/hybrid/expressions.js`, preserving `dist/expressions.js` as the legacy-compatible entry point; verify both channel artifacts exist and load independently.
- [x] 2.2 Compose hybrid from the complete CoffeeScript runtime plus same-name TypeScript overrides, with no per-function routing manifest; verify an overridden function uses TypeScript and a function without an override remains CoffeeScript-backed.
- [x] 2.3 Define and enforce a strict, explicit migration-owned TypeScript dependency closure for hybrid builds; verify its diagnostics block hybrid while legacy output does not require or claim a passing `yarn tsc --project ts --noEmit`.
- [x] 2.4 Publish independently addressable legacy and hybrid artifacts together for each migration release, including each passing batch as it is merged/released; document that Rails maps `expressions-ts-migration=true` to hybrid and `false` or unreadable to legacy without implementing flag evaluation, targeting, or startup fallback here.

## 3. CI gate foundation

- [x] 3.1 Run the existing CoffeeScript suite, isolated strict TypeScript check, legacy and hybrid contract suites, unchanged-function differential checks, and migrated-function parity checks for each batch; verify results include actionable function-group diagnostics.
- [x] 3.2 Verify required channel entry points, the legacy-compatible entry point, and expected artifact inventories across repeated builds; fail the build when artifacts are missing or inventories are unstable.
- [x] 3.3 Add the `Expression migration gates` CI job and make it fail on any required gate failure with actionable output; verify each gate failure produces a failed job. Treat any requirement to enforce the status check through repository branch protection as a separate administrator setting.
- [x] 3.4 Run migration gates on every pull request and publish the compatibility, legacy, and hybrid bundles to production S3 only after all gates pass on `main`; keep pull-request runs non-deploying and use the production GitHub environment with OIDC role configuration.
