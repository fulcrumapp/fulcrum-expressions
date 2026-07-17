# Fulcrum Expressions

This repository contains the Fulcrum expression runtime and its related distribution assets.

The runtime that ships today is still built from CoffeeScript. This repository also contains the TypeScript source used to generate the published API and type definitions consumed by Fulcrum tooling.

In the main Fulcrum app today:

- `@fulcrumapp/fulcrum-expressions` is installed as a package and used for TypeScript APIs and type definitions.
- The sandbox runtime is still loaded from `expressions.html` and its related assets via Fulcrum's `expression_sandbox_url` configuration.

If you add or change public expression APIs, update both the runtime behavior and the TypeScript definitions in this repository.

## Setup

Install dependencies:

```sh
yarn
```

## Build

Build `expressions.js` and the sandbox assets (`expressions-proxy.js` and `expressions.html`):

```sh
yarn build
```

Build debug versions:

```sh
yarn build:debug
```

## Generate Documentation

Make changes in `docs/docs.js` and `docs/event_docs.js`, then rebuild the generated docs:

```sh
yarn build:docs
```

## Distribute

Build everything needed for distribution, including generated types:

```sh
yarn build:dist
```

## Tests

```sh
yarn test
```

## Console

Start an interactive node terminal with the expression functions available to call:

```sh
yarn console
```

## Deploy

Fulcrum currently uses this repository in two ways:

- the published npm package for TypeScript APIs and type definitions
- hosted sandbox assets for runtime evaluation in the browser

Deploying from this repository is primarily about publishing updated sandbox assets.

To deploy to your preview environment:

```sh
awslogin
yarn deploy
```

Then update Fulcrum to point at your sandbox assets by uncommenting the `fulcrum.rails.config.expression_sandbox_url` override in `skaffold.yaml`.

To deploy to production (requires Fulcrum production access):

```sh
yarn
yarn build:dist
aws sso login
mongoose
yarn deploy production
```

Please be careful while doing this. There are limited guardrails around production deploys.

## Documentation

Documentation is generated with [JSDoc](http://usejsdoc.org/). Function docs live in [docs/docs.js](https://github.com/fulcrumapp/fulcrum-expressions/blob/main/docs/docs.js).

## Deprecated Info

This section is left for reference and is probably not used anymore.

## Copy Files To Other Repositories

Copies the build output and docs to other repositories. Each destination is optional, but at least one is needed.

You can define the paths to the Fulcrum repositories in your shell config:

```sh
export FULCRUM_ANDROID=/path/to/android/app
export FULCRUM_IOS=/path/to/ios/app
export FULCRUM_WEB=/path/to/web/app
export FULCRUM_DEV_SITE=/path/to/website
```

Or you can assign them in the command:

```sh
FULCRUM_DEV_SITE=$HOME/dev/fulcrumapp.com yarn build:dist && yarn copy
```

Once you have the environment variables set, you can run:

```sh
yarn copy
```

or:

```sh
yarn build:dist && yarn copy
```
