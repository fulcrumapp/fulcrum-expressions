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
functions without a TypeScript override remain CoffeeScript-backed. The isolated
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
checks, public declaration scope/consumer checks, and deterministic artifact verification:
```sh
yarn test:migration-gates
```
`yarn test:types` checks that the generated declaration inventory contains only
public modules, every expression has a declaration, representative consumers
accept valid calls and reject incorrect result types, and regeneration is
byte-identical. CI also fails if regeneration changes the checked-in
`ts/api.ts`.

Contract results are reported by function group. Failures exit nonzero and fail
the `Expression migration gates` workflow on every pull request and push to
`main`. A successful run on `main` then builds the release bundles and runs the
production S3 deploy script, publishing the legacy and hybrid channels
side-by-side.

### Console
Starts an interactive node terminal with the functions available to call
```sh
yarn console
```

### Deploy
Currently all projects pull the legacy expression bundle from
https://assets.fulcrumapp.com/expv1/expressions.js. `yarn deploy` keeps that
backwards-compatible URL and publishes both independently addressable channels
alongside it:

- `https://assets.fulcrumapp.com/expv1/legacy/expressions.js`
- `https://assets.fulcrumapp.com/expv1/hybrid/expressions.js`

Rails owns the LaunchDarkly `expressions-ts-migration` flag and selects hybrid
when `true`, or legacy when `false` or unreadable. This repository builds and
deploys both channels but does not read the flag or target customers.

The `Expression migration gates` workflow publishes the legacy and hybrid
channels after the unified runtime-and-typings build and all gates pass on
`main`. Generated typings are checked in `ts/api.ts`; this S3 publisher does
not upload them. It deliberately leaves the existing
`/expv1/expressions.js` compatibility URL untouched so it remains the current
comparison baseline. Manual `yarn deploy` continues to publish that URL by
default. The GitHub `production` environment must provide the
`EXPRESSION_RELEASE_AWS_ROLE_ARN` and `EXPRESSION_RELEASE_AWS_REGION` variables,
and the AWS role must trust GitHub Actions OIDC for this repository's
`production` environment. Scope the role to the required objects under
`fulcrum-assets/expv1/` and invalidation of the existing expression
CloudFront distribution. Configure any desired production environment
approvals in GitHub; pull-request runs never receive the production deployment
job.

To deploy to your user's preview environment:
```sh
aws sso login (or however you login to the chaos aws account)
yarn deploy
```
You will need to update fulcrum's config to point at your S3 bucket's files. The
[skaffold.yaml file in fulcrum](https://github.com/fulcrumapp/fulcrum/blob/main/skaffold.yaml)
has a configuration for the "fulcrum.rails.config.expression_sandbox_url" value which can
be uncommented.

To deploy to production (requires fulcrum production access):
```sh
yarn
yarn build:dist   # Not strictly necessary, it's done in the deploy.  But it's better to know it builds and passes tests before doing that.
aws sso login (or however you login to the readonly fulcrum aws account)
mongoose
yarn deploy production
```
**Please be careful while doing this, as there aren't many guardrails in place at the moment. If unsure, ask.**

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
