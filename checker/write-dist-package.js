'use strict'

const fs = require('fs')
const path = require('path')

const packageMetadata = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'),
)
const distPath = path.join(__dirname, '..', 'dist')
const distCheckerPath = path.join(distPath, 'checker')

fs.mkdirSync(distCheckerPath, { recursive: true })
for (const fileName of ['index.js', 'api.js', 'lib.js']) {
  fs.copyFileSync(path.join(__dirname, fileName), path.join(distCheckerPath, fileName))
}

fs.writeFileSync(
  path.join(distPath, 'package.json'),
  `${JSON.stringify({
    name: packageMetadata.name,
    version: packageMetadata.version,
    main: './expressions.js',
    license: packageMetadata.license,
    exports: {
      '.': './expressions.js',
      './checker': './checker/index.js',
      './package.json': './package.json',
    },
    optionalDependencies: packageMetadata.optionalDependencies,
  }, null, 2)}\n`,
)
