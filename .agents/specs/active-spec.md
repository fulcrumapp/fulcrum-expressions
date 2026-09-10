# FLCRM-22122 — Active Specification

**Summary:** Implement headless TypeScript checks for Data Events and calculations
**Repository:** `fulcrumapp/fulcrum-expressions`
**Jira:** [FLCRM-22122](https://fulcrumapp.atlassian.net/browse/FLCRM-22122)
**Epic:** FLCRM-22115, MCP preflight validation for forms, data events, calculations, and reports
**Owner:** Trey Hyde / Alchemy
**Base commit:** `cf51876`
**Planning state:** `APPROVED_FOR_PURE_VALIDATOR`
**Implementation state:** Implemented in the transport-neutral checker subpath; audit and PR gates remain.

> **Approval record:** FLCRM-22116 comment `205727` explicitly approved the
> complete-candidate/common v1 baseline and unblocked pure-validator implementation.
> The approved scope includes common diagnostics/coverage/version fields, explicit
> invalid/incomplete/unavailable outcomes, and static/non-writing/no-execution
> analysis. HTTP/auth configuration, package publication, deployment, and optional
> follow-on integration remain separate gates.

## 1. Jira refresh and intake record

Jira was refreshed during planning on 2026-09-08. The current observed records are:

| Issue | Summary | Status | Updated |
| --- | --- | --- | --- |
| FLCRM-22122 | Implement headless TypeScript checks for Data Events and calculations | Backlog | 2026-09-08 17:51:44 -0700 |
| FLCRM-22115 | MCP preflight validation for forms, data events, calculations, and reports | Backlog | 2026-09-08 17:52:42 -0700 |
| FLCRM-22116 | Define shared validation contracts and coordinate MCP preflight integration | Backlog | 2026-09-08 17:52:13 -0700 |
| FLCRM-22118 | Wire structured preflight validation tools into app-mcp | Backlog | 2026-09-08 17:52:33 -0700 |
| FLCRM-21371 | validate.mjs for data-events skill — secrets detection | Backlog | 2026-09-08 17:36:44 -0700 |

FLCRM-22122 is a Medium-priority Task, labeled `app-mcp` and `validation`, assigned
to Trey Hyde (`70121:aba238e9-4c30-4a4a-b3fd-f91c7b2c9069`). The ticket acceptance
criteria require reusable TypeScript/checkJs analysis of deployable JavaScript,
form-derived nullable declarations, distinct Data Event and calculation profiles,
version reporting, non-execution, bounded execution at the worker boundary,
adversarial tests, documentation, and a PR in the owning repository. It explicitly
does not authorize a production runtime rewrite or package publication.

The most recent FLCRM-22122 dependency comment confirms:

* diagnostics must use the shared v1 codes, severity, locations, coverage, and
  explicit runtime/declaration versions;
* Data Events and calculations remain separate profiles;
* calculations reject statically detectable disallowed APIs and mark dynamic
  references unverified;
* submitted source is never executed, imported, fetched, or echoed; and
* independent checker research/specification may proceed, while public interface
  locking waits for contract approval.

FLCRM-22116 comment `205727` supersedes that planning gate. It approves complete
candidate artifacts (not update patches), the common v1 envelope, pure validator
implementation/export, and the parent outcome direction: confirmed error =>
`invalid`; otherwise checker/dependency failure => `unavailable`; otherwise
missing/unsupported/unverified requested coverage => `incomplete`; otherwise
`valid`. Coverage and diagnostics are retained for every outcome.

## 2. Sentinel result: scope and boundaries

### Goal

Provide a reusable, headless static-analysis core in this repository that can check
Data Event JavaScript and calculated expressions against pinned Fulcrum declarations
and a declared expression-runtime profile. The result must be deployable JavaScript,
transport-neutral, deterministic for the same inputs and versions, and consumable by
the approved shared v1 preflight contract.

### In scope

1. Parse deployable JavaScript and reject TypeScript-only syntax rather than
   accepting a browser editor's TypeScript model.
2. Reuse the existing `allowJs` / `checkJs` / `noEmit` approach with fixed,
   in-memory Fulcrum declarations and form-derived `$data_name` declarations.
3. Report resolvable syntax, API signature, event hook, callback, and field-reference
   diagnostics with source ranges.
4. Apply a separate calculation profile for forbidden side effects, permitted APIs,
   repeatable scope, and statically resolvable dependencies.
5. Represent unknown dynamic references as explicit unverified/incomplete coverage,
   never as guessed errors or unqualified success.
6. Return contract-compatible outcome, diagnostics, coverage, and version metadata
   after FLCRM-22116 approves the exact public schema.
7. Enforce or consume worker-boundary resource limits without allowing the compiler
   host to access the filesystem, network, arbitrary imports, or submitted
   dependencies.
8. Add fixtures, adversarial tests, and package/API documentation without changing
   production expression execution.

### Out of scope

* Rewriting or replacing `runtime.coffee`, the deployed CoffeeScript bundle, or
  expression evaluation behavior.
* Running submitted JavaScript, EJS, expressions, callbacks, getters, imports,
  network requests, generated SQL, or report rendering.
* Browser/Monaco automation, editor integration, or a browser-only checker.
* Authoritative form, report, schema-service, or app-mcp validator implementations.
* A new gateway, write-time enforcement, artifact writes, or an execution preview.
* Duplicating or reparenting FLCRM-21371's toolkit secret scanning.
* Publishing an npm/GitHub package, creating tags, deploying a worker, or changing
  production assets without separate authorization.
* Choosing HTTP, stdio, an embedded worker, or a sidecar before the shared design
  gate is cleared.

## 3. Repository discovery

### Existing package and build boundary

* `package.json` is the scoped package `@fulcrumapp/fulcrum-expressions` at version
  `3.0.1`, with `main: dist/expressions.js` and GitHub Packages as its registry.
  It has no `types` or `exports` entry.
* `yarn build:expressions` browserifies and minifies `runtime.coffee`; the normal
  package artifact is therefore the CoffeeScript runtime, not a headless checker.
  `yarn build:dist` runs clean, build, tests, and `make types`.
* `make types` removes and regenerates `ts/api.ts` through `dts-generator`, then
  `script/build.rb` flattens declarations into a global declaration string. The
  generated file is suitable as an editor/runtime declaration input, but it is not
  currently a separately exported checker API.
* Current `package.json` is copied into `dist` by the runtime build. A checker
  artifact must not silently replace the existing `main` or browser bundle.
* There is no repository lint script in `package.json` and `ci/config.yaml` only
  identifies an npm output type. The implementation plan must use the existing
  build/test/type-generation commands and document the absence of a dedicated lint
  command rather than inventing one.

### Declaration and runtime evidence

The parent supplied cross-repository evidence that the Fulcrum web
`data-events-editor/monaco.tsx` path configures TypeScript with `allowJs`,
`checkJs`, and `noEmit`, using the `main.ts` model; that
`loaders/types.ts` generates nullable `$data_name` declarations while retaining
permissive `FieldName | string` behavior; and that the web editor consumes the
`ts/api.ts` declarations. Those web files were not copied or modified in this
worktree; they are treated as integration evidence, not as a new dependency on
Monaco.

* `ts/api.ts` contains generated global declarations for functions such as `ON`,
  `OFF`, `REQUEST`, `LOADFORM`, `LOADRECORDS`, `SETVALUE`, `OPENURL`, and
  repeatable helpers. Its overloads expose callback and event types.
* The checked-in declaration string is not proof that every declaration has a
  matching TypeScript implementation: the current `ts/functions` inventory does
  not contain every API represented in `ts/api.ts` (notably several loading/
  host-era surfaces). Declaration availability, TypeScript implementation
  availability, and deployed CoffeeScript behavior must be reconciled before a
  checker profile is called authoritative.
* `ts/types/events.d.ts` models form, field, repeatable, media, geometry, and
  extension-message events. `ts/types/fields.d.ts` intentionally aliases the
  field-name categories to `string`; this is permissive and cannot prove that a
  literal target exists in a particular form.
* `runtime.coffee` initializes `$data_name` variables, evaluates expressions, and
  executes scripts with `eval`. It sets `isCalculation` while evaluating
  calculations and uses a special-function guard for calculation-time calls.
* The CoffeeScript guard includes event registration, host I/O, asynchronous
  loading, UI/result mutation, timers, storage, and other side-effectful APIs.
  `ts/runtime/index.ts` has a related but not identical `specialFunctions` list.
  The checker must therefore use an explicit policy matrix reconciled with the
  authoritative deployed runtime, not infer calculation policy from one list.
* `functions.coffee` validates runtime hook names/field kinds and callback
  presence at execution time. Static checks should catch literal, resolvable
  violations earlier but must not claim coverage for computed names.
* `ts/test/fixtures/repeatable.ts` demonstrates nested repeatable form data and is
  a useful fixture source for scope/dependency tests.
* The README states that the CoffeeScript runtime remains the current implementation
  while TypeScript is used for editor types. This task must preserve that boundary.

### Locked toolchain observed in this worktree

The repository declares ranges in `package.json`; the lockfile currently resolves:

| Tool/dependency | Observed version | Planning consequence |
| --- | --- | --- |
| Node.js | 20.20.2 (`.tool-versions`) | Worker/package compatibility must be declared |
| Yarn | 1.22.22 (`.tool-versions`) | Preserve existing install/build workflow |
| Ruby | 3.2.0 (`.tool-versions`) | Required by declaration generation |
| TypeScript | 4.9.5 (`yarn.lock`) | Pin for checker/compiler metadata unless approved otherwise |
| `dts-generator` | 3.0.0 (`yarn.lock`) | Pin declaration-generation provenance |
| CoffeeScript | 1.12.7 (`yarn.lock`) | Identifies current runtime build lineage |
| Browserify | 13.0.1 (`package.json`/lockfile) | Do not use browser bundling as the checker boundary |
| `coffeeify` | 2.1.0 (`yarn.lock`) | Existing runtime build only |
| Mocha | 11.7.5 (`yarn.lock`) | Existing test runner |
| Terser | 5.46.1 (`yarn.lock`) | Existing runtime minification only |

The checker must report the exact compiler/declaration/runtime versions used for a
run. A semver range in `package.json` alone is not sufficient evidence of
reproducibility.

### Package compatibility finding

The current web-facing package is scoped (`@fulcrumapp/fulcrum-expressions`) and
runtime-oriented. The report-generator ecosystem has a different unscoped legacy
package boundary. They must not be aliased, renamed, or treated as equivalent
without owner approval. The pure checker is exposed as the owner-approved CommonJS
`./checker` subpath; package publication remains separately gated.

## 4. Proposed checker design (transport-neutral)

### Core boundary

The implementation should expose a pure, in-memory analysis operation internally:

* input: source text, artifact profile, form/declaration context, requested checks,
  and declared runtime/declaration versions;
* fixed compiler options: JavaScript input, `allowJs`, `checkJs`, `noEmit`, a
  pinned target/lib set, and the approved strictness policy;
* virtual compiler host: only the submitted source, generated declarations, fixed
  standard-library declarations, and approved Fulcrum declarations;
* output: the approved shared v1 envelope with explicit diagnostics, coverage,
  outcome, and version provenance.

The host must return no arbitrary module/file resolution and make network access
impossible. It must not call `require` on submitted values, load user packages,
evaluate AST nodes, invoke TypeScript emit, or import a submitted module. Source
text must remain data throughout analysis.

The worker/process/HTTP/stdio adapter remains intentionally unspecified. The
implemented invariant is a deployable `.js` checker entry point with no browser
globals, submitted-code execution, arbitrary resolution, or side effects. Worker
limits, authentication, transport configuration, publication, and release order
remain separate gates.

### Data Event profile

The profile should:

1. Accept deployable JavaScript, including ordinary callbacks and global script
   forms used by the runtime.
2. Reject TypeScript-only constructs, module/dependency loading, and syntax that
   cannot be deployed to the current expression runtime.
3. Type-check against the pinned generated API declarations and form-derived
   nullable `$data_name` values.
4. Validate literal event names and overloads for form, field, repeatable, geometry,
   media, and extension-message hooks.
5. Validate literal field targets against the supplied form, supplementing the
   permissive `FieldName | string` declarations.
6. Validate callback shapes for hooks and declared asynchronous APIs without
   executing callbacks.
7. Identify literal field reads/writes/dependencies such as `$foo`, `FIELD("foo")`,
   `VALUE("foo")`, hook field arguments, and setter targets.
8. Return an explicit unverified/incomplete coverage item for computed field names,
   computed hook names, dynamic property access, and other unresolved references.

### Calculation profile

The profile should:

1. Analyze the expression as deployable JavaScript against the same pinned
   declaration lineage, but with a calculation-specific scope.
2. Reject statically detectable calls to APIs forbidden by the deployed calculation
   runtime, including hook registration, host/network/file/record loading, UI
   operations, timers, storage, and record/form mutation.
3. Preserve pure calculation functions and permitted field/value/repeatable helpers.
4. Track literal field dependencies and repeatable scope. A child-field reference
   outside its available repeatable context is a diagnostic when statically
   provable.
5. Report `REPEATABLEID`, `REPEATABLENUMBER`, `REPEATABLEVALUES`, and
   `REPEATABLESUM` with scope-dependent diagnostics only where the supplied context
   proves a violation.
6. Distinguish a forbidden literal call (error) from a dynamic call or computed
   reference (unverified coverage), and never infer that a dynamic reference is
   safe.
7. Keep calculation result compatibility separate from Data Event side effects.

The pure-core allow/deny matrix mirrors the authoritative `runtime.coffee`
calculation guard plus its result/form mutation surfaces. The approved outcome
direction is: error => `invalid`, checker/dependency failure => `unavailable`,
missing/unsupported/unverified requested coverage => `incomplete`, otherwise
`valid`.

### Provisional diagnostics and coverage model

The checker maps to the approved v1 shape:

* `contract_version`;
* `outcome`: `valid`, `invalid`, `incomplete`, or `unavailable`;
* diagnostics with stable code, severity, message, source range/path, and optional
  fix guidance;
* requested, completed, skipped, and unsupported checks with reason codes; and
* concrete validator, declaration/schema, compiler, and runtime versions.

`valid` is only available when every requested check completes under the approved
profile. Invalid input is not the same as checker failure, dependency outage,
unsupported runtime version, or unresolved dynamic coverage. Diagnostics and
telemetry must not include raw submitted source, candidate secret values, tokens,
record payloads, or credentials.

Implemented code families include syntax,
TypeScript-only syntax, API signature, hook, callback, field reference,
calculation restriction, repeatable scope, dynamic/unverified coverage,
unsupported-version, limit, and checker-unavailable categories. Do not publish
these names as a public contract before coordinator approval.

### Version and declaration provenance

Every result must identify:

* checker/validator build version;
* exact TypeScript compiler version (`4.9.5` unless changed through approval);
* declaration bundle version or content identity, including the generated API
  provenance and form-declaration schema version;
* expression runtime lineage (`@fulcrumapp/fulcrum-expressions` `3.0.1` plus the
  deployed CoffeeScript artifact/build identity until a newer pairing is approved);
* profile (`data_event` or `calculation`); and
* shared contract version `v1`.

A declaration/runtime mismatch must be an explicit unavailable/incomplete result,
not a best-effort valid result. Web and report-generator consumers must retain
their separate package/version identities.

### Resource and security boundary

The worker boundary must establish approved limits for input bytes, form/declaration
size, AST/depth or compiler work, wall-clock time, memory, concurrency, diagnostic
count, and serialized output size. It must support cancellation and return a
bounded limit outcome. Exact values are pending the coordinator's worker/transport
decision; they must not be hidden constants in a public interface.

The virtual host must:

* never execute source or generated code;
* never resolve arbitrary filesystem paths, imports, URLs, or packages;
* never install dependencies or use submitted dependency metadata;
* avoid browser/DOM and production runtime initialization;
* deny or bound compiler library/module resolution outside the fixed virtual set;
* avoid logging source and redact any secret-like diagnostic context; and
* make repeated calls deterministic and isolated from prior analysis state.

## 5. Ownership and coordination

| Owner | Responsibility | Required handoff |
| --- | --- | --- |
| `fulcrum-expressions` / Alchemy | Headless checker core, declaration integration, profile rules, fixtures, package/build docs | Report package boundary, compiler/declaration/runtime matrix, coverage limits, and no-execution guarantees |
| FLCRM-22116 / shared coordinator (`29aa86e7-9f72-40df-aad6-ca44d766da1c`) | v1 response contract, codes/severity/ranges/coverage/version keys, worker/transport and release order | Approve or amend contract and transport before public interface lock |
| FLCRM-22118 / MCP owner | Thin app-mcp adapter/tool integration and auth/tenant behavior | Consume a real compatible artifact/service; do not embed a separate TypeScript implementation |
| Merge agent (`993ec2b0-fa89-4183-b93a-068e152ec009`) | Merge/release sequencing after compatibility evidence | Wait for contract approval and real versions |
| FLCRM-21371 owner | Existing toolkit secret scanning and feedback loop | Coordinate/reuse; do not duplicate or reparent |

Parent/sibling agent IDs were not supplied in this session. No sibling ownership,
approval, or implementation status is inferred. The missing context is a review
gate, not a reason to create a session, project, Jira issue, or duplicate validator.

## 6. Open decisions and explicit gates

| ID | Decision | Status | Required approver |
| --- | --- | --- | --- |
| D1 | Approve the shared v1 envelope, outcome semantics, codes, ranges/paths, coverage, and version keys | **Approved in FLCRM-22116#205727** | FLCRM-22116/coordinator |
| D2 | Choose HTTP service, worker/sidecar, stdio, or another adapter boundary | **Pending** | Coordinator + parent |
| D3 | Choose CJS/ESM entry point, package/subpath ownership, and whether a deployable `.js` is internal or published | **Pure CJS `./checker` subpath implemented; publication remains separately gated** | Repository/package owner + coordinator |
| D4 | Approve authoritative declaration/runtime pairing and version/identity format | **Approved for `ts/api.ts` + runtime `3.0.1`, TypeScript `4.9.5`** | Repository owner + coordinator |
| D5 | Approve Data Event/calculation API allow/deny matrix, repeatable scope semantics, and unverified outcome rule | **Approved for pure core by FLCRM-22116#205727 and parent direction** | Repository owner + contract coordinator |
| D6 | Set worker input/time/memory/concurrency/output limits and cancellation behavior | **Pending** | Worker/transport owner |
| D7 | Confirm whether declaration generation remains `dts-generator`/`script/build.rb` based or moves to a pinned emitted bundle | **Pinned `dts-generator`/`script/build.rb`; checker bundles generated `ts/api.ts` and TypeScript standard libs** | Repository owner |
| D8 | Authorize any package publication, tag, deployment, or app-mcp integration release | **Not authorized** | User/release owner |

Until D2 and the release gates are resolved, implementation remains limited to the
approved pure checker and its local evidence. No HTTP/auth adapter, publication,
tag, deployment, or production-asset change is authorized.

## 7. Implementation sequencing after approval

1. Record the approved contract/version decisions in this spec and Jira; identify
   parent/sibling owners. **Completed from FLCRM-22116#205727.**
2. Freeze the declaration/compiler/runtime matrix and generate a reproducible
   declaration fixture from the approved source. **Completed.**
3. Add the transport-neutral virtual compiler host and source-only analysis path.
   **Completed in `checker/index.js`.**
4. Add the Data Event profile and literal hook/callback/field-reference checks.
   **Completed.**
5. Add the calculation profile, explicit restriction matrix, repeatable scope, and
   dependency coverage. **Completed.**
6. Keep HTTP/worker/stdio adapters outside this repository change until D2 and
   auth/release gates are approved; the pure checker subpath is the only public
   implementation seam in this PR.
7. Add adversarial fixtures, package/docs, and no-execution/resource-limit tests.
   **Completed.**
8. Run the existing build, test, type-generation, and any repository lint command;
   record results and limitations. **Build/test completed; `make types` is blocked
   by the unavailable local Ruby 3.2 asdf toolchain.**
9. Prepare one repository PR with Jira linkage. Do not publish, tag, or deploy
   until separately authorized and the merge agent confirms compatible releases.

## 8. Definition of done for implementation

* The checker consumes deployable JavaScript and rejects TypeScript-only syntax.
* Data Event diagnostics cover the approved static syntax/API/hook/callback and
  literal field-reference checks.
* Calculation diagnostics use a distinct approved restriction/scope/dependency
  profile and do not inherit all Data Event APIs.
* Dynamic references are explicitly represented as unverified/incomplete coverage.
* No submitted code, import, filesystem path, URL, dependency, report, callback,
  or runtime function is executed by analysis.
* Pure-core source/form/AST/diagnostic limits are enforced and reflected in
  bounded outcomes; worker wall-clock/memory/concurrency limits remain a D2
  adapter responsibility.
* Results carry the approved contract and concrete compiler/declaration/runtime
  versions, with no sensitive-value logging.
* The artifact is deployable JavaScript and its package boundary does not replace
  the current runtime `main` or conflate scoped web and unscoped legacy packages.
* Existing CoffeeScript runtime behavior remains unchanged and existing checks pass.
* Tests include invalid calls, wrong hooks/signatures, nullable fields, repeatables,
  dynamic references, limits, repeated calls, declaration mismatch, and
  non-execution canaries.
* Documentation states the coverage limits and publication/deployment prerequisites.

## 9. Publication strategy

**Strategy:** single PR in `fulcrumapp/fulcrum-expressions`, as recorded in agent
state. The current app-managed branch is retained; branch renames are not performed
with git.

The eventual PR should be narrowly scoped to checker source/build/test/docs and
approved package metadata. It should not include runtime rewrites, generated
production assets, package publication, tags, S3 deployment, or app-mcp changes.
The PR description must link FLCRM-22122, identify the approved contract and exact
version matrix, document the unresolved/unsupported coverage, and attach QA/build
evidence. A separate release authorization is required for any package publication
or worker deployment. Release order is contract/fixtures, compatible checker
artifact, then the consuming adapter/tool; the exact transport order remains
pending D2.

Rollback is a PR revert or adapter pin to the prior compatible artifact. Existing
expression runtime consumers and write behavior remain the rollback baseline.
