## 1. Channel sandbox assets and build verification

- [x] 1.1 Add hybrid/legacy source pages and release/debug build copies; verify outputs, script order, and unchanged comparison page.
- [x] 1.2 Extend build integrity to assert artifacts, path resolution, and stable inventories; run `yarn build:verify` and the debug build.
- [x] 1.3 Update the roadmap and contract-testing guide to distinguish expression assets from separate Rails integration; verify URLs and scope.

## 2. Deployment and migration gates

- [x] 2.1 Deploy both paths in preview/production with `text/html`; assert targets, metadata, page contents, preserved channel uploads, and no frozen runtime upload in AWS-stub tests; run `yarn test:deploy`.
- [x] 2.2 Run `yarn build` and `yarn test:migration-gates`.
