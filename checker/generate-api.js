'use strict'

/*
 * Build-time only: package the checked-in generated declaration string as a
 * fixed module.  The checker never reads source files or resolves imports at
 * analysis time; it receives this generated in-memory declaration bundle.
 */

const fs = require('fs')
const path = require('path')
const ts = require('typescript')

const sourcePath = path.join(__dirname, '..', 'ts', 'api.ts')
const outputPath = path.join(__dirname, 'api.js')
const source = fs.readFileSync(sourcePath, 'utf8')

function writeIfChanged(filePath, content) {
  let current = null
  try {
    current = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  if (current !== content) fs.writeFileSync(filePath, content, 'utf8')
}

if (!source.startsWith('export default `') || !source.trim().endsWith('`;')) {
  throw new Error('ts/api.ts is not in the expected generated declaration format')
}

const body = source
  .replace(/^export default /, 'module.exports = ')
  .replace(/[ \t]+$/gm, '')
  .replace(/;\s*$/, ';')

writeIfChanged(
  outputPath,
  `'use strict'\n\n// Generated from ts/api.ts by checker/generate-api.js.\n${body}\n`,
)

const libraryDirectory = path.dirname(require.resolve('typescript'))
const library = {}
for (const filePath of ts.sys.readDirectory(libraryDirectory, ['.d.ts'])) {
  const fileName = path.basename(filePath)
  if (/^lib\..+\.d\.ts$/.test(fileName)) {
    library[`/${fileName}`] = fs.readFileSync(filePath, 'utf8')
  }
}

writeIfChanged(
  path.join(__dirname, 'lib.js'),
  `'use strict'\n\n// Generated from the pinned TypeScript 4.9.5 standard library.\nmodule.exports = ${JSON.stringify(library)}\n`,
)
