## Fulcrum Expressions
This implements the runtime for javascript expressions in Fulcrum.

The current implementation uses coffeescript.

There is a typescript implementation (latest version is likely in fulcrum-components/src/expressions, but there is also a typescript branch on this repo) that is currently being used in fulcrum-components to provide types to the monaco editor used to edit data events, calculations, etc.
Eventually, this repo should contain that implementation, and ideally move off the coffeescript implementation once we are confident the typescript implementation works.
Right now, we haven't determined the best way to distribute those types from this package. Until then, any type updates that need to be made (new public facing functions or otherwise) will need to be made in the typescript implementation.

### Setup
Install dependencies
```sh
yarn
```

### Build
Build the legacy and hybrid expression channels, the backwards-compatible
`dist/expressions.js` legacy entry point, and the sandbox
(`expressions-proxy.js` and `expressions.html`).
```sh
yarn build
```
The channel entry points are `dist/legacy/expressions.js` and
`dist/hybrid/expressions.js`. The hybrid channel starts from the full CoffeeScript
runtime and applies TypeScript implementations for same-named functions;
functions without a TypeScript override remain CoffeeScript-backed. The isolated
strict TypeScript check for migration-owned sources is independent of the
existing project-wide `ts/tsconfig.json` baseline.

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
Builds everything for distribution
```sh
yarn build:dist
```

### Tests
```sh
yarn test
```

The migration gates run the CoffeeScript unit suite, the isolated migration
typecheck, legacy and hybrid contract suites, hybrid-versus-legacy differential
checks, and deterministic artifact verification:
```sh
yarn test:migration-gates
```
Contract results are reported by function group. Failures exit nonzero and fail
the `Expression migration gates` workflow on every pull request and push to
`main`. A successful run on `main` then builds the release bundles and runs the
production S3 deploy script, publishing the compatibility bundle, legacy
channel, and hybrid channel together.

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

The `Expression migration gates` workflow publishes after all gates pass on
`main`. The GitHub `production` environment must provide the
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
