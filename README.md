## Fulcrum Expressions

This implements the runtime for javascript expressions in Fulcrum.

### IMPORTANT!
Currently all projects pull the expression.js lib produced by this repo from https://assets.fulcrumapp.com/expv1/expressions.js. Until we are able to move projects over to using the published npm library, we will need to manually deploy by copying the dist/expressions.js file to that S3 bucket for others to see changes.
```
yarn build:dist
aws sso login --profile fulcrum (or however you login to the readonly fulcrum aws account)
aws s3 cp --cache-control "no-cache, no-store, max-age=0, must-revalidate" --expires "Mon, 01 Jan 1990 00:00:00 GMT" --content-type "text/html" dist/expressions.js s3://fulcrum-assets/expv1/expressions.js

```
**Please be careful while doing this, as there aren't many guardrails in place at the moment. If unsure, ask.**

### Setup

Install dependencies

```sh
yarn
```

### Build

```sh
yarn build
```

### Generate Documentation

Make changes to `docs.js` and `event_docs.js`.

```sh
yarn build:docs
```

### Distribute

Builds the final output along with docs and help

```sh
yarn build:dist
```

### Documentation

Documentation is handled using [jsdoc](http://usejsdoc.org/), with functions documented in the [source file here](https://github.com/fulcrumapp/fulcrum-expressions/blob/master/docs/docs.js).

### Tests

```sh
yarn test
```

### Console

Starts an interactive node terminal with the functions available to call

```sh
yarn console
```

### Copy files to other repositories (NOT USED, BUT LEFT FOR REFERENCE)

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
