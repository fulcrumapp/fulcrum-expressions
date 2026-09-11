'use strict'

const fs = require('fs')
const path = require('path')

const packageMetadata = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'),
)

fs.writeFileSync(
  path.join(__dirname, '..', 'dist', 'package.json'),
  `${JSON.stringify({
    name: packageMetadata.name,
    version: packageMetadata.version,
    main: './expressions.js',
    license: packageMetadata.license,
  }, null, 2)}\n`,
)
