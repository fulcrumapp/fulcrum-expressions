'use strict'

/*
 * Build-time only: package the checked-in generated declaration string as a
 * fixed module.  The checker never reads source files or resolves imports at
 * analysis time; it receives this generated in-memory declaration bundle.
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
let ts
try {
  ts = require('typescript')
} catch (_error) {
  console.warn(
    'TypeScript is not installed; using the checked-in checker/api.js and checker/lib.js payloads.',
  )
  process.exit(0)
}

const PINNED_TYPESCRIPT_VERSION = '4.9.5'
if (ts.version !== PINNED_TYPESCRIPT_VERSION) {
  throw new Error(
    `TypeScript ${PINNED_TYPESCRIPT_VERSION} is required to regenerate checker payloads; found ${ts.version}.`,
  )
}

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

const apiContent =
  `'use strict'\n\n// Generated from ts/api.ts by checker/generate-api.js.\n${body}\n`
writeIfChanged(
  outputPath,
  apiContent,
)
delete require.cache[require.resolve(outputPath)]
const declarationPayload = require(outputPath)
writeIfChanged(
  path.join(__dirname, 'metadata.js'),
  `'use strict'\n\n// Generated from ts/api.ts by checker/generate-api.js.\nmodule.exports = ${JSON.stringify({
    hash: crypto.createHash('sha256').update(declarationPayload).digest('hex').slice(0, 16),
  }, null, 2)}\n`,
)

const libraryDirectory = path.dirname(require.resolve('typescript'))
const library = {}
const libraryFiles = ts.sys
  .readDirectory(libraryDirectory, ['.d.ts'])
  .slice()
  .sort()
for (const filePath of libraryFiles) {
  const fileName = path.basename(filePath)
  if (/^lib\..+\.d\.ts$/.test(fileName)) {
    library[`/${fileName}`] = fs.readFileSync(filePath, 'utf8')
  }
}

writeIfChanged(
  path.join(__dirname, 'lib.js'),
  `'use strict'\n\n// Generated from the pinned TypeScript 4.9.5 standard library.\nmodule.exports = ${JSON.stringify(library)}\n`,
)
