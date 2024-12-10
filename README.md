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
Build expressions.js and sandbox (expressions-proxy.js and expressions.html)
```sh
yarn build
```
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

### Console
Starts an interactive node terminal with the functions available to call
```sh
yarn console
```

### Deploy
Currently all projects pull the expression.js lib produced by this repo from https://assets.fulcrumapp.com/expv1/expressions.js. Until we are able to move projects over to using the published npm library, we will need to manually deploy by copying the dist/expressions.js file to that S3 bucket for others to see changes.

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
aws sso login (or however you login to the readonly fulcrum aws account)
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
