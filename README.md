## Fulcrum Expressions
This implements the runtime for javascript expressions in Fulcrum.

The legacy runtime uses CoffeeScript. The hybrid channel starts from that
runtime and can adopt TypeScript function overrides incrementally.

The existing TypeScript sources in `ts/functions` and `ts/types` also generate
the public API declaration string in `ts/api.ts` for editor consumers. Public
API changes must update those sources and regenerate the checked-in declaration
file. This is not a conventional package `types` entry; distribution to
consumers remains separate from the runtime S3 publisher.

### Setup
Install Node.js/Yarn (see `.tool-versions`), Ruby, and Make, then install dependencies.
Ruby is used by the public declaration generator; CI explicitly sets it up.
```sh
yarn
```

### Build
Build the legacy and hybrid expression channels, the backwards-compatible
`dist/expressions.js` legacy entry point, the sandbox
(`expressions-proxy.js` and `expressions.html`), and the public API typings.
```sh
yarn build
```
The channel entry points are `dist/legacy/expressions.js` and
`dist/hybrid/expressions.js`. The hybrid channel starts from the full CoffeeScript
runtime and applies TypeScript implementations for same-named functions;
functions without a TypeScript override remain CoffeeScript-backed. The first
prepared migration batch contains same-name overrides for `PI`, `TRUE`, and
`FALSE`; every other expression remains CoffeeScript-backed. This is local
preparation only: Rails Phase 1b readiness is still required before the batch
can be exposed, and passing repository gates will not constitute
application-runtime acceptance. The isolated
strict TypeScript check for migration-owned sources is independent of the
existing project-wide `ts/tsconfig.json` baseline.
Release bundles retain the original Terser `--mangle` settings; debug bundles
remain unmangled.

Both CI and manual releases use this same build command. Public typings are
generated from the existing `ts/functions` and supporting public types through
`dts-generator` (`dist/api.raw.d.ts`), then flattened by `script/build.rb` into
the declaration string exported by `ts/api.ts` for editor consumers. Test
helpers, fixtures, runtime/host internals, and the generated `ts/api.ts` itself
are excluded from the declaration output. Regenerate typings alone with
`yarn build:types` (equivalently `make types`), and commit intentional changes
to `ts/api.ts` alongside their source changes.

Declaration generation is not a project-wide TypeScript check and does not
claim the existing baseline diagnostics are resolved. The strict
`migration/tsconfig.json` check remains separate and mandatory for hybrid.

Build debug versions
```sh
yarn build:debug
```

### Generate Documentation
Make changes to `docs.js` and `event_docs.js`.
```sh
yarn build:docs
```

### Distribute
Clean and run the unified build plus all migration gates, without deploying.
```sh
yarn build:dist
```

### Tests
```sh
yarn test
```

The migration gates run the CoffeeScript unit suite, the isolated migration
typecheck, legacy and hybrid contract suites, hybrid-versus-legacy differential
checks, public declaration scope/consumer checks, deployment-path assertions,
and deterministic artifact verification:
```sh
yarn test:migration-gates
```
The gates also use mocked AWS commands to assert that preview and production
deploys upload the two channel bundles and existing sandbox assets without ever
uploading the frozen compatibility bundle.

`yarn test:types` generates declarations and checks that their inventory
contains only public modules, every expression has a declaration, representative consumers
accept valid calls and reject incorrect result types, and regeneration is
byte-identical. CI also fails if regeneration changes the checked-in
`ts/api.ts`. After a unified build has generated declarations, CI and the
migration gates use `yarn test:types:check` directly to avoid regenerating them
before the same reproducibility check.
The exported declaration string is flattened for the editor's global scope:
geometry types are used as `Point`, `Feature<Point>`, `GeoJSONGeometry` and
`GeoJSON`, not as members of a UMD `GeoJSON` namespace.

The `Expression migration gates` job runs on pull requests and pushes to `main`
(including merges) and reports contract results by function group. The separate
`Deploy to S3 (main only)` job depends on successful migration gates and is
guarded to run only on pushes to `main`; it appears as **skipped** for pull
requests. A successful main push then publishes the legacy and hybrid channels
side-by-side; it never overwrites the frozen compatibility bundle.

### Console
Starts an interactive node terminal with the functions available to call
```sh
yarn console
```

### Deploy
**Frozen comparison:** the existing
`https://assets.fulcrumapp.com/expv1/expressions.js` object is the original
production runtime and is intentionally never uploaded or replaced by this
repository's manual or automated deploy scripts. It remains frozen for
side-by-side comparison. `dist/expressions.js` is still built as a local,
legacy-compatible package entry point, but it is not published to that URL.

Deployments publish these independently addressable bundles:

- `https://assets.fulcrumapp.com/expv1/legacy/expressions.js`
- `https://assets.fulcrumapp.com/expv1/hybrid/expressions.js`

They also publish the existing sandbox HTML and proxy assets. The sandbox HTML
still references the frozen `/expv1/expressions.js`; publishing the channels
does not switch the running Rails application or sandbox to either channel.
Changing Rails URL selection and wiring the `expressions-ts-migration` flag is
a separate consumer prerequisite ([Phase 1b: Rails consumer readiness](docs/typescript-migration-roadmap.md#phase-1b-rails-consumer-readiness-task-7-prerequisite)),
which must be implemented and exercised before exposing Phase 2 migrated batches,
not after all functions have been migrated.

**Planned sandbox endpoints (not yet built or deployed):** add
`dist/expressions-hybrid.html` at
`https://assets.fulcrumapp.com/expv1/expressions-hybrid.html`, loading
`hybrid/expressions.js` then `expressions-proxy.js`, and a sibling
`dist/expressions-legacy.html` at
`https://assets.fulcrumapp.com/expv1/expressions-legacy.html`, loading
`legacy/expressions.js` then the same root proxy. Keeping both HTML files at
the `/expv1/` root makes those relative paths resolve correctly. Release/debug
builds and manual/automated deploys must add these assets and verify their
script URLs before Phase 2 exposure. Preserve the original `expressions.html`
contents and frozen runtime as the comparison endpoint; do not repoint it.
Rails must select the hybrid sandbox URL for flag true and the legacy sandbox
URL for false/unreadable or rollback, and exercise both actual endpoints,
required lifecycle/host wiring and fallback before batches proceed.

**Current migration state and [plan](docs/typescript-migration-roadmap.md):** the hybrid override registry is empty;
no expression has been migrated and no customer is selected for hybrid by this
repository. First, the separate Rails integration must load the deployed channels
through those parallel sandbox endpoints under the flag and verify required
lifecycle/host wiring, fallback and rollback;
the empty-override hybrid can exercise that baseline wiring. For each future
batch, add same-name TypeScript overrides, pass the automated gates, release
alongside complete legacy, and exercise the deployed hybrid sandbox and runtime
in the flagged application. Record and review actual runtime results before the next
batch; roll back to legacy and correct/revalidate any failing batch. Publication
and isolated contracts alone are not runtime acceptance.
Rails owns customer targeting and selection: the planned flag contract
is `true` → hybrid, `false` or unreadable → legacy. Until Rails is changed to
request those channel URLs, existing runtime consumers continue to use the
frozen compatibility URL. No all-functions-complete promotion is planned.

**Manual deployment:** `yarn deploy` builds and gates the release, then uploads
the two channels and sandbox assets to the bucket for the current `$USER`
(falling back to `id -un` when `$USER` is unset or empty).
`yarn deploy <environment>` selects a preview bucket. `yarn deploy production`
prompts for confirmation and requires production AWS access. Neither form
uploads or replaces `/expv1/expressions.js`; production deployment still
invalidates cached `/expv1/*` objects. You can run `yarn build:dist` separately
to build and test without uploading.

**Automated production deployment:** after `Expression migration gates`
passes on a push to `main`, the production-environment job builds and uploads
the legacy and hybrid bundles and sandbox assets, leaving the frozen
compatibility object untouched. Pull requests never run this deployment job.
The GitHub `production` environment must provide
`EXPRESSION_RELEASE_AWS_ROLE_ARN` and `EXPRESSION_RELEASE_AWS_REGION`, and the
AWS role must trust this repository's production-environment GitHub Actions
OIDC identity. Scope the role to the required `fulcrum-assets/expv1/` objects
and invalidation of the existing expression CloudFront distribution. Any
environment approval requirement is configured by administrators. This
repository's deployment path has only been tested locally with mocked AWS
commands; real AWS configuration and live publication are not verified here.

To deploy to your user's preview environment (after configuring AWS credentials
for that bucket):
```sh
yarn deploy
```

For production, use an authorized production AWS identity and explicitly
confirm the prompt:
```sh
yarn deploy production
```

### Documentation
Documentation is handled using [jsdoc](http://usejsdoc.org/), with functions documented in the [source file here](https://github.com/fulcrumapp/fulcrum-expressions/blob/master/docs/docs.js).

## Deprecated Info (NOT USED, AND PROBABLY DOESN'T WORK, BUT LEFT FOR REFERENCE)

### Copy files to other repositories
Copies the build output and docs to the other repositories (each are optional, but at least one is needed).

You can define the paths to the Fulcrum repos using environment variables in your shell config:

```sh
export FULCRUM_ANDROID=/path/to/android/app
export FULCRUM_IOS=/path/to/ios/app
export FULCRUM_WEB=/path/to/web/app
export FULCRUM_DEV_SITE=/path/to/website
```

Or you can assign them in the yarn command:

```sh
FULCRUM_DEV_SITE=$HOME/dev/fulcrumapp.com yarn build:dist && yarn copy
```

Once you have the environment variables set, you can run:

```sh
yarn copy

or

yarn build:dist && yarn copy # clean, build and deploy everything
```
