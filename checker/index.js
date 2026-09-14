'use strict'

/*
 * Transport-neutral, source-only checker for Fulcrum Data Events and
 * calculations.  This module deliberately does not import runtime.coffee:
 * runtime.coffee evaluates submitted expressions and is not part of the
 * analysis boundary.
 */

const crypto = require('crypto')
const ts = require('typescript')
const packageMetadata = require('../package.json')
const apiDeclarations = require('./api')
const standardLibrary = require('./lib')

const CONTRACT_VERSION = 'v1'
const CHECKER_VERSION = packageMetadata.version
const RUNTIME_VERSION = `@fulcrumapp/fulcrum-expressions@${packageMetadata.version}`
const DECLARATION_VERSION = `ts/api.ts@${packageMetadata.version}`
const DECLARATION_IDENTITY = `${DECLARATION_VERSION}:${crypto
  .createHash('sha256')
  .update(apiDeclarations)
  .digest('hex')
  .slice(0, 16)}`

const LIMITS = Object.freeze({
  sourceBytes: 256 * 1024,
  formBytes: 128 * 1024,
  astNodes: 20000,
  astDepth: 200,
  diagnostics: 100,
})

const DEFAULT_CHECKS = Object.freeze({
  data_event: ['syntax', 'api', 'hooks', 'fields'],
  calculation: ['syntax', 'api', 'scope', 'dependencies'],
})

const SUPPORTED_CHECKS = new Set([
  'syntax',
  'api',
  'hooks',
  'fields',
  'scope',
  'dependencies',
])

/*
 * This list intentionally mirrors Runtime.setupFunctions' calculation guard
 * in runtime.coffee.  It is kept here as a policy table rather than inferred
 * from the TypeScript declarations: declarations describe callable APIs while
 * the deployed runtime defines calculation restrictions.
 */
const CALCULATION_FORBIDDEN_APIS = new Set([
  'ALERT',
  'APPLYFIELDEFFECTS',
  'CURRENTLOCATION',
  'INFERENCE',
  'INVALID',
  'LOADFILE',
  'LOADFORM',
  'LOADRECORDS',
  'MESSAGEBOX',
  'OFF',
  'ON',
  'OPENURL',
  'OPENEXTENSION',
  'PROGRESS',
  'RECOGNIZETEXT',
  'REQUEST',
  'SETCHOICEFILTER',
  'SETCHOICES',
  'SETCONFIGURATION',
  'SETGEOMETRY',
  'SETLOCATION',
  'SETSTATUS',
  'SETSTATUSFILTER',
  'SETPROJECT',
  'SETDESCRIPTION',
  'SETDISABLED',
  'SETHIDDEN',
  'SETLABEL',
  'SETMAXLENGTH',
  'SETMINLENGTH',
  'SETREQUIRED',
  'SETTIMEOUT',
  'CLEARTIMEOUT',
  'SETINTERVAL',
  'CLEARINTERVAL',
  'SETVALUE',
  'SETFORMATTRIBUTES',
  'SETRESULT',
  'SETASSIGNMENT',
  'SETREADONLY',
  'SETSTATUSHIDDEN',
  'SETSTATUSREADONLY',
  'SETPROJECTHIDDEN',
  'SETPROJECTREADONLY',
  'STORAGE',
])

const EVENT_NAMES = new Set([
  'load-record',
  'unload-record',
  'new-record',
  'edit-record',
  'save-record',
  'cancel-record',
  'validate-record',
  'change-geometry',
  'change-project',
  'change-status',
  'change-assignment',
  'change',
  'focus',
  'blur',
  'click',
  'load-repeatable',
  'unload-repeatable',
  'new-repeatable',
  'edit-repeatable',
  'save-repeatable',
  'cancel-repeatable',
  'validate-repeatable',
  'add-photo',
  'remove-photo',
  'replace-photo',
  'add-video',
  'remove-video',
  'add-audio',
  'remove-audio',
  'extension-message',
])

const FORM_EVENTS = new Set([
  'load-record',
  'unload-record',
  'new-record',
  'edit-record',
  'save-record',
  'cancel-record',
  'validate-record',
  'change-project',
  'change-status',
  'change-assignment',
])

const REPEATABLE_EVENTS = new Set([
  'load-repeatable',
  'unload-repeatable',
  'new-repeatable',
  'edit-repeatable',
  'save-repeatable',
  'cancel-repeatable',
  'validate-repeatable',
])

const MEDIA_EVENT_TYPES = Object.freeze({
  'add-photo': 'PhotoField',
  'remove-photo': 'PhotoField',
  'replace-photo': 'PhotoField',
  'add-video': 'VideoField',
  'remove-video': 'VideoField',
  'add-audio': 'AudioField',
  'remove-audio': 'AudioField',
})

const FIELD_FUNCTIONS = new Set([
  'FIELD',
  'FIELDS',
  'FIELDNAMES',
  'FIELDTYPE',
  'LABEL',
  'VALUE',
  'SETVALUE',
  'SETDESCRIPTION',
  'SETDISABLED',
  'SETHIDDEN',
  'SETLABEL',
  'SETMAXLENGTH',
  'SETMINLENGTH',
  'SETREADONLY',
  'SETREQUIRED',
  'SETCHOICEFILTER',
  'SETCHOICES',
  'REPEATABLEVALUES',
  'REPEATABLESUM',
])

const TS_ONLY_KINDS = new Set([
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.ModuleDeclaration,
  ts.SyntaxKind.TypeAssertionExpression,
  ts.SyntaxKind.AsExpression,
  ts.SyntaxKind.NonNullExpression,
  ts.SyntaxKind.TypeParameter,
  ts.SyntaxKind.TypeQuery,
  ts.SyntaxKind.TypeLiteral,
  ts.SyntaxKind.IndexedAccessType,
  ts.SyntaxKind.MappedType,
  ts.SyntaxKind.ConditionalType,
  ts.SyntaxKind.InferType,
  ts.SyntaxKind.ImportType,
  ts.SyntaxKind.Decorator,
])

function byteLength(value) {
  return Buffer.byteLength(value, 'utf8')
}

function normalizePath(fileName) {
  const value = String(fileName).replace(/\\/g, '/')
  return value.startsWith('/') ? value : `/${value}`
}

function isStringLiteral(node) {
  return Boolean(node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)))
}

function literalText(node) {
  return isStringLiteral(node) ? node.text : null
}

function isFunctionLike(node) {
  return Boolean(node && (ts.isFunctionExpression(node) || ts.isArrowFunction(node)))
}

function sourceRange(sourceFile, node) {
  const start = sourceFile.getLineAndCharacterOfPosition(
    Math.max(0, Math.min(node.getStart(sourceFile), sourceFile.end)),
  )
  const end = sourceFile.getLineAndCharacterOfPosition(
    Math.max(0, Math.min(node.getEnd(), sourceFile.end)),
  )
  return {
    start: { line: start.line + 1, column: start.character + 1 },
    end: { line: end.line + 1, column: end.character + 1 },
  }
}

function diagnosticPath(profile) {
  // Never put a source value, field name, or source excerpt in a diagnostic
  // path.  The source range is sufficient for editor/agent navigation.
  if (profile !== 'data_event' && profile !== 'calculation') return '$'
  return profile === 'calculation' ? '$.expression' : '$.source'
}

function makeDiagnostic(sourceFile, node, code, severity, message, fix, profile) {
  const diagnostic = {
    code,
    severity,
    message,
    path: diagnosticPath(profile),
    range: sourceRange(sourceFile, node || sourceFile),
  }
  if (fix) diagnostic.fix = fix
  return diagnostic
}

function makeCoverage(requestedChecks, profile, checksProvided) {
  const defaults = DEFAULT_CHECKS[profile] || []
  const requested = Array.from(new Set(
    checksProvided
      ? requestedChecks.filter((check) => typeof check === 'string')
      : defaults,
  ))
  const coverage = {
    requested,
    completed: [],
    skipped: [],
    unsupported: requested
      .filter((check) => !SUPPORTED_CHECKS.has(check))
      .map((check) => ({ check, reason_code: 'UNSUPPORTED_CHECK' })),
    unverified: [],
    failures: [],
  }
  Object.defineProperty(coverage, '_profile', { value: profile, enumerable: false })
  return coverage
}

const uniqueListKeys = new WeakMap()

function pushUnique(list, value) {
  const key = JSON.stringify(value)
  let keys = uniqueListKeys.get(list)
  if (!keys) {
    keys = new Set(list.map((item) => JSON.stringify(item)))
    uniqueListKeys.set(list, keys)
  }
  if (!keys.has(key)) {
    keys.add(key)
    list.push(value)
  }
}

function addCoverageSkipped(coverage, check, reasonCode) {
  const entry = { reason_code: reasonCode }
  if (check) entry.check = canonicalCheck(coverage, check)
  pushUnique(coverage.skipped, entry)
}

function addCoverageUnsupported(coverage, check, reasonCode) {
  const entry = { reason_code: reasonCode }
  if (check) entry.check = canonicalCheck(coverage, check)
  pushUnique(coverage.unsupported, entry)
}

function markCoverageComplete(coverage, check) {
  const canonical = canonicalCheck(coverage, check)
  if (!coverage.completed.includes(canonical)) coverage.completed.push(canonical)
}

function canonicalCheck(coverage, check) {
  if (check === 'typecheck') return 'api'
  if (check === 'field_references') {
    return coverage._profile === 'calculation' ? 'dependencies' : 'fields'
  }
  if (check === 'profile') {
    return coverage._profile === 'calculation' ? 'scope' : 'hooks'
  }
  return check
}

function isCheckEnabled(state, check) {
  const canonical = canonicalCheck(state.coverage, check)
  return state.coverage.requested.includes(canonical) &&
    !state.coverage.skipped.some((item) => item.check === canonical) &&
    !state.coverage.unsupported.some((item) => item.check === canonical) &&
    !state.coverage.failures.some((item) => item.check === canonical)
}

function addCoverageUnverified(coverage, check, reasonCode, location) {
  const entry = {
    check: canonicalCheck(coverage, check),
    reason_code: reasonCode,
  }
  if (location && location.path) entry.path = location.path
  if (location && location.range) entry.range = location.range
  pushUnique(coverage.unverified, entry)
}

function addCoverageFailure(coverage, check, reasonCode) {
  const entry = { reason_code: reasonCode }
  if (check) entry.check = canonicalCheck(coverage, check)
  pushUnique(coverage.failures, entry)
}

function addCoverageToRequested(coverage, bucket, reasonCode) {
  for (const check of coverage.requested) {
    if (
      coverage.completed.includes(check) ||
      coverage.skipped.some((item) => item.check === check) ||
      coverage.unsupported.some((item) => item.check === check) ||
      coverage.unverified.some((item) => item.check === check) ||
      coverage.failures.some((item) => item.check === check)
    ) continue
    pushUnique(coverage[bucket], { check, reason_code: reasonCode })
  }
}

function clearCoverageForInvalidRequest(coverage) {
  coverage.requested = []
  coverage.completed = []
  coverage.skipped = []
  coverage.unsupported = []
  coverage.unverified = []
  coverage.failures = []
}

function formType(field) {
  return field && typeof field.type === 'string' ? field.type : ''
}

function normalizeFieldType(field) {
  return formType(field).replace(/[\s_-]/g, '').toLowerCase()
}

function normalizedTypeName(type) {
  return String(type).replace(/[\s_-]/g, '').toLowerCase()
}

function typeForField(field) {
  const type = normalizeFieldType(field)
  if (type.includes('number') || type.includes('numeric') || type === 'calculated') {
    return 'number | null | undefined'
  }
  if (type.includes('yesno') || type === 'boolean') return 'boolean | null | undefined'
  if (type.includes('repeatable')) return 'any[] | null | undefined'
  return 'string | null | undefined'
}

function collectForm(form) {
  const fields = new Map()
  const parents = new Map()
  let nodeCount = 0
  let truncated = false
  const seen = new Set()

  function visit(value, parentRepeatable, depth) {
    if (!value || typeof value !== 'object') return
    if (depth > LIMITS.astDepth) {
      truncated = true
      return
    }
    if (seen.has(value)) return
    seen.add(value)
    nodeCount += 1
    if (nodeCount > LIMITS.astNodes) {
      truncated = true
      return
    }

    const dataName =
      typeof value.data_name === 'string'
        ? value.data_name
        : typeof value.dataName === 'string'
          ? value.dataName
          : null
    const key =
      typeof value.key === 'string'
        ? value.key
        : typeof value.element_key === 'string'
          ? value.element_key
          : dataName
    if (dataName) {
      fields.set(dataName, value)
      if (parentRepeatable) parents.set(dataName, parentRepeatable)
    }

    const type = normalizeFieldType(value)
    const nextParent = type === 'repeatable' ? key || parentRepeatable : parentRepeatable
    if (Array.isArray(value.elements)) {
      value.elements.forEach((child) => visit(child, nextParent, depth + 1))
    }
    if (Array.isArray(value.fields)) {
      value.fields.forEach((child) => visit(child, nextParent, depth + 1))
    }
    if (Array.isArray(value.children)) {
      value.children.forEach((child) => visit(child, nextParent, depth + 1))
    }
    if (Array.isArray(value.sections)) {
      value.sections.forEach((child) => visit(child, nextParent, depth + 1))
    }
  }

  visit(form, null, 0)
  return { fields, parents, nodeCount, truncated }
}

function fieldDeclaration(formInfo) {
  const lines = []
  for (const [dataName, field] of formInfo.fields) {
    const identifier = `$${dataName}`
    if (/^[$A-Z_a-z][$\w]*$/.test(identifier)) {
      lines.push(`declare const ${identifier}: ${typeForField(field)};`)
    }
  }
  return lines.join('\n')
}

function repeatableScopeNames(scope) {
  if (!scope) return []
  if (typeof scope === 'string') return [scope]
  if (Array.isArray(scope)) return scope.filter((name) => typeof name === 'string')
  const values = []
  for (const key of ['current', 'repeatable', 'repeatable_data_name']) {
    if (typeof scope[key] === 'string') values.push(scope[key])
  }

  for (const key of ['ancestors', 'repeatables']) {
    if (Array.isArray(scope[key])) {
      values.push(...scope[key].filter((name) => typeof name === 'string'))
    }
  }
  return values
}

function boundedObjectBytes(value, limit, seen = new Set(), total = 0) {
  if (total > limit) return total
  if (value === null) return total + 4
  if (value === undefined) return total + 9
  if (typeof value === 'string') return total + byteLength(JSON.stringify(value))
  if (typeof value === 'boolean') return total + (value ? 4 : 5)
  if (typeof value === 'number') {
    const serialized = JSON.stringify(value)
    return total + byteLength(serialized === undefined ? 'null' : serialized)
  }
  if (typeof value !== 'object') return limit + 1
  if (seen.has(value)) return limit + 1
  seen.add(value)
  if (Array.isArray(value)) {
    total += 1
    for (let index = 0; index < value.length; index += 1) {
      total = boundedObjectBytes(value[index], limit, seen, total + (index ? 1 : 0))
      if (total > limit) return total
    }
    return total + 1
  }
  total += 1
  let index = 0
  for (const [key, child] of Object.entries(value)) {
    total = boundedObjectBytes(key, limit, seen, total + (index ? 1 : 0))
    total = boundedObjectBytes(child, limit, seen, total + 1)
    if (total > limit) return total
    index += 1
  }
  return total + 1
}

function requestParts(request) {
  const input = request && typeof request === 'object' ? request : {}
  const artifact = input.artifact && typeof input.artifact === 'object' ? input.artifact : input
  const context = input.context && typeof input.context === 'object' ? input.context : {}
  const profileValue =
    input.artifact_type ||
    artifact.artifact_type ||
    input.profile ||
    artifact.profile ||
    artifact.type ||
    null
  const profile =
    profileValue === 'data-event' || profileValue === 'dataEvent'
      ? 'data_event'
      : profileValue === 'calculation'
        ? 'calculation'
        : profileValue
  const source =
    profile === 'calculation'
      ? typeof artifact.expression === 'string'
        ? artifact.expression
        : typeof input.expression === 'string'
          ? input.expression
          : null
      : typeof artifact.source === 'string'
        ? artifact.source
        : typeof input.source === 'string'
          ? input.source
          : typeof input.code === 'string'
            ? input.code
            : typeof artifact.code === 'string'
              ? artifact.code
              : null
  const form =
    context.form !== undefined
      ? context.form
      : input.form !== undefined
        ? input.form
        : artifact.form !== undefined
          ? artifact.form
          : null
  const rawChecks = input.checks !== undefined ? input.checks : input.requested_checks
  const checksProvided = rawChecks !== undefined
  return {
    input,
    artifact,
    context,
    source,
    profile,
    form,
    repeatableScope:
      context.repeatable !== undefined
        ? context.repeatable
        : input.repeatable_scope !== undefined
          ? input.repeatable_scope
          : artifact.repeatable_scope,
    featureIndex:
      context.feature_index !== undefined
        ? context.feature_index
        : input.feature_index,
    requestedChecks: Array.isArray(rawChecks) ? rawChecks : [],
    checksProvided,
    checksValid:
      rawChecks === undefined ||
      (Array.isArray(rawChecks) && rawChecks.every((check) => typeof check === 'string')),
  }
}

function declaredVersion(value) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    if (typeof value.version === 'string') return value.version
    if (typeof value.name === 'string') return value.name
  }
  return null
}

function makeVersions(profile) {
  return {
    validator: CHECKER_VERSION,
    schema: DECLARATION_VERSION,
    runtime: RUNTIME_VERSION,
    compiler: ts.version,
    declarations: DECLARATION_IDENTITY,
    profile,
  }
}

function createHost(files) {
  const normalizedFiles = new Map()
  for (const [fileName, text] of Object.entries(files)) {
    normalizedFiles.set(normalizePath(fileName), text)
  }

  const options = {
    allowJs: true,
    checkJs: true,
    noEmit: true,
    noLib: false,
    // Resolution is constrained below to the fixed virtual file map.  Do not
    // enable noResolve: TypeScript must follow only its bundled lib references.
    skipLibCheck: true,
    strict: false,
    strictNullChecks: true,
    noImplicitAny: false,
    target: ts.ScriptTarget.ES2020,
    lib: ['lib.es2020.d.ts'],
    module: ts.ModuleKind.None,
    moduleResolution: ts.ModuleResolutionKind.Classic,
    allowNonTsExtensions: true,
  }
  const defaultHost = ts.createCompilerHost(options, false)
  const host = {
    ...defaultHost,
    getSourceFile(fileName, languageVersion) {
      const normalized = normalizePath(fileName)
      const text = normalizedFiles.get(normalized)
      if (text === undefined) return undefined
      const kind = normalized.endsWith('.js') ? ts.ScriptKind.JS : ts.ScriptKind.TS
      return ts.createSourceFile(normalized, text, languageVersion, true, kind)
    },
    getSourceFileByPath(fileName, _path, languageVersion) {
      return this.getSourceFile(fileName, languageVersion)
    },
    getDefaultLibFileName() {
      return '/lib.es2020.d.ts'
    },
    getDefaultLibLocation() {
      return '/'
    },
    fileExists(fileName) {
      return normalizedFiles.has(normalizePath(fileName))
    },
    readFile(fileName) {
      return normalizedFiles.get(normalizePath(fileName))
    },
    readDirectory() {
      return []
    },
    getDirectories() {
      return []
    },
    directoryExists() {
      return false
    },
    getEnvironmentVariable() {
      return undefined
    },
    realpath(fileName) {
      return normalizePath(fileName)
    },
    resolveModuleNames(moduleNames) {
      return moduleNames.map(() => undefined)
    },
    resolveTypeReferenceDirectives(typeDirectiveNames) {
      return typeDirectiveNames.map(() => undefined)
    },
    writeFile() {},
    getCurrentDirectory() {
      return '/'
    },
    getCanonicalFileName(fileName) {
      return fileName
    },
    useCaseSensitiveFileNames() {
      return true
    },
    getNewLine() {
      return '\n'
    },
  }
  return { options, host }
}

function semanticMessage(code) {
  switch (code) {
    case 2304:
      return 'A referenced name is not declared by the approved environment.'
    case 2345:
    case 2322:
      return 'A call or assignment does not match the approved declaration.'
    case 2554:
    case 2555:
    case 2556:
      return 'A call has an invalid argument count.'
    case 2339:
      return 'A property is not present on the approved type.'
    case 2531:
    case 2532:
      return 'A nullable form value is used without narrowing.'
    case 7006:
      return 'A callback parameter requires an approved type.'
    default:
      return 'Static type checking reported an error.'
  }
}

function addDiagnostic(state, node, code, severity, message, fix) {
  if (state.diagnostics.length >= LIMITS.diagnostics) {
    state.limitFailure = true
    return
  }
  const diagnostic = makeDiagnostic(
    state.sourceFile,
    node,
    code,
    severity,
    message,
    fix,
    state.profile,
  )
  const key = JSON.stringify(diagnostic)
  if (!state.diagnosticKeys.has(key)) {
    state.diagnosticKeys.add(key)
    state.diagnostics.push(diagnostic)
  }
}

function addFailure(state, check, reasonCode, code, message) {
  state.failure = true
  addCoverageFailure(state.coverage, check, reasonCode)
  addDiagnostic(state, state.sourceFile, code, 'warning', message)
}

function addFieldCheck(state, dataName, node, context) {
  const fieldCheck = state.profile === 'calculation' ? 'dependencies' : 'fields'
  if (!isCheckEnabled(state, fieldCheck)) return
  if (!state.hasForm) {
    addCoverageSkipped(state.coverage, 'field_references', 'CONTEXT_REQUIRED')
    return
  }
  if (!state.formInfo.fields.has(dataName)) {
    addDiagnostic(
      state,
      node,
      'FORM.UNKNOWN_FIELD_REFERENCE',
      'error',
      'A literal field reference is not present in the supplied form.',
      'Use a field data name from the supplied form.',
    )
    state.artifactError = true
    return
  }

  const parent = state.formInfo.parents.get(dataName)
  if (parent && state.profile === 'calculation' && isCheckEnabled(state, 'profile')) {
    const scopes = repeatableScopeNames(state.repeatableScope)
    if (!scopes.includes(parent)) {
      addDiagnostic(
        state,
        node,
        scopes.length ? 'CALCULATION.REPEATABLE_SCOPE_MISMATCH' : 'CALCULATION.REPEATABLE_SCOPE_REQUIRED',
        'error',
        scopes.length
          ? 'The field reference is outside the supplied repeatable scope.'
          : 'A repeatable scope is required for this field reference.',
        'Supply the containing repeatable scope.',
      )
      state.artifactError = true
    }
  }
  if (context === 'dynamic') {
    addCoverageUnverified(state.coverage, 'field_references', 'UNVERIFIED_DYNAMIC_REFERENCE', {
      path: state.profile === 'calculation' ? '$.expression' : '$.source',
      range: sourceRange(state.sourceFile, node || state.sourceFile),
    })
  }
}

function addDynamicCoverage(state, check, reasonCode, node) {
  if (!isCheckEnabled(state, check)) return
  addCoverageUnverified(state.coverage, check, reasonCode, {
    path: state.profile === 'calculation' ? '$.expression' : '$.source',
    range: sourceRange(state.sourceFile, node || state.sourceFile),
  })
  addDiagnostic(
    state,
    node || state.sourceFile,
    'COVERAGE.UNVERIFIED_REFERENCE',
    'warning',
    'A dynamic reference could not be verified statically.',
    'Use a literal field, event, or API reference for complete coverage.',
  )
}

function validateHookCall(state, call) {
  if (state.profile !== 'data_event' || !isCheckEnabled(state, 'hooks')) return
  const name = call.expression.text
  if (name !== 'ON' && name !== 'OFF') return
  const args = Array.from(call.arguments)
  const eventName = literalText(args[0])
  if (eventName === null) {
    addDynamicCoverage(state, 'profile', 'UNVERIFIED_DYNAMIC_HOOK', args[0])
    return
  }
  if (!EVENT_NAMES.has(eventName)) {
    addDiagnostic(
      state,
      args[0],
      'DATA_EVENT.UNKNOWN_HOOK',
      'error',
      'The literal event hook is not supported by the authoritative declarations.',
      'Use an event name from the approved Data Event API.',
    )
    state.artifactError = true
  }

  if (args.length < 2) {
    addDiagnostic(
      state,
      call,
      'DATA_EVENT.CALLBACK_SIGNATURE',
      'error',
      'A Data Event hook requires a callback function.',
    )
    state.artifactError = true
    return
  }

  const hasTarget = args.length >= 3
  if (hasTarget) {
    const target = args[1]
    const targetAllowed = !FORM_EVENTS.has(eventName) && eventName !== 'extension-message'
    if (!targetAllowed) {
      addDiagnostic(
        state,
        target,
        'DATA_EVENT.INVALID_HOOK_TARGET',
        'error',
        'This event hook does not accept a field target.',
      )
      state.artifactError = true
    } else {
      const fieldName = literalText(target)
      if (fieldName === null) {
        addDynamicCoverage(state, 'field_references', 'UNVERIFIED_DYNAMIC_FIELD', target)
      } else if (fieldName.startsWith('@')) {
        if (eventName !== 'change') {
          addDiagnostic(
            state,
            target,
            'DATA_EVENT.INVALID_HOOK_TARGET',
            'error',
            'A magic field target is only supported for change hooks.',
          )
          state.artifactError = true
        }
      } else {
        addFieldCheck(state, fieldName, target, 'literal')
        const field = state.formInfo.fields.get(fieldName)
        const expectedType = MEDIA_EVENT_TYPES[eventName]
        if (field && expectedType && normalizeFieldType(field) !== normalizedTypeName(expectedType)) {
          addDiagnostic(
            state,
            target,
            'DATA_EVENT.INVALID_HOOK_TARGET',
            'error',
            'The hook target field type does not match the event hook.',
          )
          state.artifactError = true
        }
        if (field && REPEATABLE_EVENTS.has(eventName) && normalizeFieldType(field) !== normalizedTypeName('Repeatable')) {
          addDiagnostic(
            state,
            target,
            'DATA_EVENT.INVALID_HOOK_TARGET',
            'error',
            'The repeatable hook target must be a repeatable field.',
          )
          state.artifactError = true
        }
        if (
          field &&
          eventName === 'click' &&
          !['HyperlinkField', 'ButtonField'].map(normalizedTypeName).includes(normalizeFieldType(field))
        ) {
          addDiagnostic(
            state,
            target,
            'DATA_EVENT.INVALID_HOOK_TARGET',
            'error',
            'The click hook target must be a hyperlink or button field.',
          )
          state.artifactError = true
        }
        if (field && eventName === 'change-geometry' && normalizeFieldType(field) !== normalizedTypeName('Repeatable')) {
          addDiagnostic(
            state,
            target,
            'DATA_EVENT.INVALID_HOOK_TARGET',
            'error',
            'The geometry hook target must be a repeatable field.',
          )
          state.artifactError = true
        }
      }
    }
  }

  const callback = args[args.length - 1]
  if (callback && isFunctionLike(callback) && callback.parameters.length > 1) {
    addDiagnostic(
      state,
      callback,
      'DATA_EVENT.CALLBACK_SIGNATURE',
      'error',
      'A Data Event callback accepts at most one event argument.',
    )
    state.artifactError = true
  } else if (callback && ts.isObjectLiteralExpression(callback)) {
    addDiagnostic(
      state,
      callback,
      'DATA_EVENT.CALLBACK_SIGNATURE',
      'error',
      'A Data Event callback must be a function.',
    )
    state.artifactError = true
  } else if (callback && literalText(callback) !== null) {
    addDiagnostic(
      state,
      callback,
      'DATA_EVENT.CALLBACK_SIGNATURE',
      'error',
      'A Data Event callback must be a function.',
    )
    state.artifactError = true
  }
}

function checkLiteralFieldCall(state, call) {
  if (!isCheckEnabled(state, 'field_references')) return
  const name = call.expression.text
  if (!FIELD_FUNCTIONS.has(name)) return
  const args = Array.from(call.arguments)
  const fieldArgument =
    name === 'REPEATABLEVALUES' || name === 'REPEATABLESUM' ? args[1] : args[0]
  if (!fieldArgument) return
  const dataName = literalText(fieldArgument)
  if (dataName === null) {
    addDynamicCoverage(state, 'field_references', 'UNVERIFIED_DYNAMIC_FIELD', fieldArgument)
  } else {
    addFieldCheck(state, dataName, fieldArgument, 'literal')
  }
}

function validateAst(state) {
  let nodeCount = 0
  let tooDeep = false

  function visit(node, depth) {
    if (!node || state.limitFailure) return
    nodeCount += 1
    if (nodeCount > LIMITS.astNodes || depth > LIMITS.astDepth) {
      tooDeep = true
      state.limitFailure = true
      return
    }

    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
      if (isCheckEnabled(state, 'api')) {
        addDiagnostic(
          state,
          node,
          'JAVASCRIPT.MODULE_NOT_DEPLOYABLE',
          'error',
          'Module imports and exports are not available in deployable expressions.',
        )
        state.artifactError = true
      }
    }

    if (ts.isCallExpression(node)) {
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        if (isCheckEnabled(state, 'api')) {
          addDiagnostic(
            state,
            node,
            'JAVASCRIPT.MODULE_NOT_DEPLOYABLE',
            'error',
            'Dynamic module imports are not available in deployable expressions.',
          )
          state.artifactError = true
        }
      } else if (ts.isIdentifier(node.expression)) {
        const name = node.expression.text
        if (name === 'require') {
          if (isCheckEnabled(state, 'api')) {
            addDiagnostic(
              state,
              node,
              'JAVASCRIPT.MODULE_NOT_DEPLOYABLE',
              'error',
              'Filesystem and dependency imports are not available to the checker or expression runtime.',
            )
            state.artifactError = true
          }
        }
        if (state.profile === 'calculation' && CALCULATION_FORBIDDEN_APIS.has(name)) {
          if (isCheckEnabled(state, 'api')) {
            addDiagnostic(
              state,
              node,
              'CALCULATION.FORBIDDEN_API',
              'error',
              'This API is forbidden by the authoritative calculation runtime policy.',
            )
            state.artifactError = true
          }
        }
        validateHookCall(state, node)
        checkLiteralFieldCall(state, node)
      } else if (
        ts.isElementAccessExpression(node.expression) ||
        ts.isCallExpression(node.expression)
      ) {
        addDynamicCoverage(state, 'api', 'UNVERIFIED_DYNAMIC_CALL', node)
      }
    }

    if (ts.isIdentifier(node) && node.text.startsWith('$') && !node.text.startsWith('$$')) {
      if (!isCheckEnabled(state, 'field_references')) {
        ts.forEachChild(node, (child) => visit(child, depth + 1))
        return
      }
      const dataName = node.text.slice(1)
      if (state.hasForm && !state.formInfo.fields.has(dataName)) {
        addDiagnostic(
          state,
          node,
          'FORM.UNKNOWN_FIELD_REFERENCE',
          'error',
          'A literal form variable is not present in the supplied form.',
          'Use a nullable form variable generated from the supplied form.',
        )
        state.artifactError = true
      } else if (!state.hasForm) {
        addCoverageSkipped(state.coverage, 'field_references', 'CONTEXT_REQUIRED')
      }
    }

    ts.forEachChild(node, (child) => visit(child, depth + 1))
  }

  visit(state.sourceFile, 0)
  if (tooDeep) {
    addFailure(
      state,
      null,
      'INPUT_LIMIT_EXCEEDED',
      'CHECKER.LIMIT_EXCEEDED',
      'The source exceeded the checker AST work limit.',
    )
  }
}

function collectTsOnlyDiagnostics(source, sourceFile, state) {
  const probe = ts.createSourceFile(
    '/probe.ts',
    source,
    ts.ScriptTarget.ES2020,
    true,
    ts.ScriptKind.TS,
  )
  function visit(node) {
    if (TS_ONLY_KINDS.has(node.kind) || (ts.isTypeNode(node) && !TS_ONLY_KINDS.has(node.kind))) {
      addDiagnostic(
        state,
        node,
        'JAVASCRIPT.TYPESCRIPT_SYNTAX',
        'error',
        'TypeScript-only syntax is not deployable expression JavaScript.',
        'Submit deployable JavaScript without TypeScript annotations or declarations.',
      )
      state.artifactError = true
    }
    ts.forEachChild(node, visit)
  }
  visit(probe)

  // Parsing is already complete and in-memory.  Reading parseDiagnostics
  // avoids creating a second synthetic Program (and avoids any host calls).
  if (sourceFile.parseDiagnostics && sourceFile.parseDiagnostics.length > 0) {
    addDiagnostic(
      state,
      sourceFile,
      'JAVASCRIPT.SYNTAX',
      'error',
      'The source is not valid deployable JavaScript.',
    )
    state.artifactError = true
  }
}

function addSemanticDiagnostics(state, diagnostics) {
  if (!isCheckEnabled(state, 'api')) return
  for (const diagnostic of diagnostics) {
    if (!diagnostic.file || normalizePath(diagnostic.file.fileName) !== '/source.js') continue
    const node = diagnostic.start === undefined
      ? state.sourceFile
      : findNodeAt(state.sourceFile, diagnostic.start)
    if (
      !state.hasForm &&
      node &&
      ts.isIdentifier(node) &&
      node.text.startsWith('$')
    ) {
      addCoverageSkipped(state.coverage, 'field_references', 'CONTEXT_REQUIRED')
      continue
    }
    const code = diagnostic.code === 2531 || diagnostic.code === 2532
      ? 'FORM.NULLABLE_VALUE'
      : diagnostic.code === 2304 && node && ts.isIdentifier(node) && node.text.startsWith('$')
        ? 'FORM.UNKNOWN_FIELD_REFERENCE'
        : diagnostic.code === 2304
          ? 'JAVASCRIPT.UNDECLARED_NAME'
          : 'TYPESCRIPT.TYPE_ERROR'
    addDiagnostic(
      state,
      node,
      code,
      'error',
      semanticMessage(diagnostic.code),
    )
    state.artifactError = true
  }
}

function findNodeAt(sourceFile, position) {
  let best = sourceFile
  function visit(node) {
    if (position < node.getStart(sourceFile) || position >= node.getEnd()) return
    best = node
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return best
}

function emptyResult(profile, diagnostics, coverage, outcome, versions) {
  return {
    contract_version: CONTRACT_VERSION,
    outcome,
    diagnostics: diagnostics.slice(0, LIMITS.diagnostics),
    coverage,
    versions,
  }
}

function makeRequestDiagnostic(code, message, profile = 'unknown', severity = 'error') {
  const sourceFile = ts.createSourceFile(
    '/request.js',
    '',
    ts.ScriptTarget.ES2020,
    true,
    ts.ScriptKind.JS,
  )
  return makeDiagnostic(sourceFile, null, code, severity, message, undefined, profile)
}

function validate(request) {
  const parts = requestParts(request)
  const coverage = makeCoverage(parts.requestedChecks, parts.profile, parts.checksProvided)
  const profile = parts.profile
  const versions = makeVersions(profile || 'unknown')
  const diagnostics = []

  if (!request || typeof request !== 'object' || Array.isArray(request)) {
    clearCoverageForInvalidRequest(coverage)
    return emptyResult(
      'unknown',
      [makeRequestDiagnostic(
        'VALIDATION.INVALID_REQUEST',
        'A complete validation request object is required.',
      )],
      coverage,
      'invalid',
      versions,
    )
  }

  const hasRequiredEnvelope =
    parts.input.contract_version === CONTRACT_VERSION &&
    typeof parts.input.artifact_type === 'string' &&
    typeof parts.input.operation === 'string' &&
    parts.input.artifact &&
    typeof parts.input.artifact === 'object' &&
    !Array.isArray(parts.input.artifact)
  if (!hasRequiredEnvelope) {
    diagnostics.push(makeRequestDiagnostic(
      'VALIDATION.INVALID_REQUEST',
      'The validation request must include the v1 contract, operation, artifact type, and artifact.',
    ))
    clearCoverageForInvalidRequest(coverage)
    return emptyResult(profile || 'unknown', diagnostics, coverage, 'invalid', versions)
  }

  if (parts.input.operation !== 'validate' || !parts.checksValid) {
    diagnostics.push(makeRequestDiagnostic(
      'VALIDATION.INVALID_REQUEST',
      'The operation must be validate and checks must be an array of strings.',
    ))
    clearCoverageForInvalidRequest(coverage)
    return emptyResult(profile || 'unknown', diagnostics, coverage, 'invalid', versions)
  }

  if (!['data_event', 'calculation'].includes(profile)) {
    diagnostics.push(makeRequestDiagnostic(
      'REQUEST.UNSUPPORTED_PROFILE',
      'The request must select the data_event or calculation profile.',
    ))
    clearCoverageForInvalidRequest(coverage)
    return emptyResult(profile || 'unknown', diagnostics, coverage, 'invalid', versions)
  }

  if (parts.source === null) {
    diagnostics.push(makeRequestDiagnostic(
      'REQUEST.MISSING_SOURCE',
      'A complete candidate must include deployable source JavaScript or an expression.',
      profile,
    ))
    addCoverageToRequested(coverage, 'skipped', 'INVALID_ARTIFACT')
    return emptyResult(profile, diagnostics, coverage, 'invalid', versions)
  }

  if (parts.featureIndex !== undefined &&
    (!Number.isInteger(parts.featureIndex) || parts.featureIndex < 0)) {
    diagnostics.push(makeRequestDiagnostic(
      'VALIDATION.INVALID_REQUEST',
      'The repeatable feature index must be a non-negative integer.',
    ))
    clearCoverageForInvalidRequest(coverage)
    return emptyResult(profile, diagnostics, coverage, 'invalid', versions)
  }

  if (parts.checksProvided && parts.requestedChecks.length === 0) {
    addCoverageSkipped(coverage, null, 'MISSING_CHECK')
    return emptyResult(profile, diagnostics, coverage, 'incomplete', versions)
  }

  const sourceBytes = byteLength(parts.source)
  if (sourceBytes > LIMITS.sourceBytes) {
    addCoverageToRequested(coverage, 'failures', 'INPUT_LIMIT_EXCEEDED')
    return emptyResult(
      profile,
      [makeRequestDiagnostic(
        'CHECKER.SOURCE_LIMIT',
        'The source exceeds the bounded checker input limit.',
        profile,
        'warning',
      )],
      coverage,
      'unavailable',
      versions,
    )
  }

  if (parts.input.signal && parts.input.signal.aborted) {
    addCoverageToRequested(coverage, 'failures', 'CHECK_TIMEOUT')
    return emptyResult(
      profile,
      [makeRequestDiagnostic(
        'CHECKER.CANCELLED',
        'Static checking was cancelled before analysis started.',
        profile,
        'warning',
      )],
      coverage,
      'unavailable',
      versions,
    )
  }

  const runtimeVersion = declaredVersion(
    parts.input.runtime_version ||
    parts.input.runtime ||
    parts.input.declared_runtime ||
    parts.artifact.runtime_version ||
    parts.artifact.runtime,
  )
  const compilerVersion = declaredVersion(
    parts.input.compiler_version ||
    parts.input.compiler ||
    parts.input.declared_compiler,
  )
  const schemaVersion = declaredVersion(
    parts.input.schema_version ||
    parts.input.schema ||
    parts.input.declared_schema ||
    parts.artifact.schema_version ||
    parts.artifact.schema,
  )
  const compilerMismatch = compilerVersion && compilerVersion !== ts.version
  const schemaMismatch = schemaVersion && schemaVersion !== DECLARATION_VERSION
  const runtimeMismatch = runtimeVersion && runtimeVersion !== RUNTIME_VERSION
  const apiMismatch = Boolean(compilerMismatch || schemaMismatch || runtimeMismatch)
  if (compilerMismatch || schemaMismatch || runtimeMismatch) {
    addCoverageSkipped(coverage, 'api', 'VERSION_MISMATCH')
  }
  if (runtimeMismatch) {
    addCoverageSkipped(coverage, 'profile', 'VERSION_MISMATCH')
  }

  const hasForm = parts.form !== null && parts.form !== undefined
  const formInfo = hasForm ? collectForm(parts.form) : { fields: new Map(), parents: new Map(), nodeCount: 0 }
  const formCheck = profile === 'calculation' ? 'dependencies' : 'fields'
  if (hasForm && formInfo.truncated && coverage.requested.includes(formCheck)) {
    addCoverageFailure(coverage, formCheck, 'INPUT_LIMIT_EXCEEDED')
    return emptyResult(
      profile,
      [makeRequestDiagnostic(
        'CHECKER.FORM_LIMIT',
        'The form context exceeds the bounded checker declaration traversal limit.',
        'unknown',
        'warning',
      )],
      coverage,
      'unavailable',
      versions,
    )
  }
  if (hasForm && boundedObjectBytes(parts.form, LIMITS.formBytes) > LIMITS.formBytes) {
    addCoverageToRequested(coverage, 'failures', 'INPUT_LIMIT_EXCEEDED')
    return emptyResult(
      profile,
      [makeRequestDiagnostic(
        'CHECKER.FORM_LIMIT',
        'The form context exceeds the bounded checker declaration limit.',
        'unknown',
        'warning',
      )],
      coverage,
      'unavailable',
      versions,
    )
  }

  const files = {
    ...standardLibrary,
    '/source.js': parts.source,
    '/fulcrum/api.d.ts': apiDeclarations,
    '/fulcrum/form.d.ts': fieldDeclaration(formInfo),
    '/fulcrum/globals.d.ts': `
      declare var window: any;
      declare var console: any;
    `,
  }
  const { options, host } = createHost(files)
  const sourceFile = host.getSourceFile('/source.js', options.target)
  const state = {
    profile,
    sourceFile,
    hasForm,
    formInfo,
    repeatableScope: parts.repeatableScope,
    coverage,
    diagnostics,
    diagnosticKeys: new Set(),
    artifactError: false,
    failure: false,
    limitFailure: false,
  }

  try {
    collectTsOnlyDiagnostics(parts.source, sourceFile, state)
    if (!state.artifactError) {
      const program = ts.createProgram(
        ['/source.js', '/fulcrum/api.d.ts', '/fulcrum/form.d.ts', '/fulcrum/globals.d.ts'],
        options,
        host,
      )
      // Always use the Program-owned SourceFile for semantic diagnostics.
      // Passing a separately-created SourceFile makes TypeScript 4.9's
      // contextual callback checker dereference an unbound symbol.
      state.sourceFile = program.getSourceFile('/source.js')
      const sourceSyntactic = program.getSyntacticDiagnostics(state.sourceFile)
      if (sourceSyntactic.length) {
        addDiagnostic(
          state,
          sourceFile,
          'JAVASCRIPT.SYNTAX',
          'error',
          'The source is not valid deployable JavaScript.',
        )
        state.artifactError = true
      }
      validateAst(state)
      if (!state.artifactError && !state.failure && !apiMismatch) {
        addSemanticDiagnostics(state, program.getSemanticDiagnostics(state.sourceFile))
      }
    }
  } catch (_error) {
    // Deliberately discard compiler exception text; it can contain source
    // fragments or dependency paths.  The caller receives a bounded outcome.
    state.failure = true
    addDiagnostic(
      state,
      sourceFile,
      'CHECKER.UNAVAILABLE',
      'warning',
      'The static checker could not complete analysis.',
    )
  }

  if (state.failure) {
    addCoverageToRequested(
      coverage,
      'failures',
      state.limitFailure ? 'INPUT_LIMIT_EXCEEDED' : 'DEPENDENCY_UNAVAILABLE',
    )
  }

  if (state.artifactError) {
    addCoverageToRequested(coverage, 'skipped', 'INVALID_ARTIFACT')
  }

  const fieldCheck = canonicalCheck(coverage, 'field_references')
  const profileCheck = canonicalCheck(coverage, 'profile')
  const typeCheck = canonicalCheck(coverage, 'typecheck')

  if (!hasForm && coverage.requested.includes(fieldCheck)) {
    addCoverageSkipped(coverage, 'field_references', 'CONTEXT_REQUIRED')
  }

  if (
    coverage.requested.includes(fieldCheck) &&
    !state.artifactError &&
    !state.failure &&
    !coverage.skipped.some((item) => item.check === fieldCheck) &&
    !coverage.unverified.some((item) => item.check === fieldCheck) &&
    !coverage.failures.some((item) => item.check === fieldCheck)
  ) {
    markCoverageComplete(coverage, 'field_references')
  }
  if (!state.artifactError && !state.failure) {
    for (const check of ['syntax', typeCheck, profileCheck]) {
      if (
        coverage.requested.includes(check) &&
        !coverage.skipped.some((item) => item.check === check)
        && !coverage.unverified.some((item) => item.check === check)
        && !coverage.failures.some((item) => item.check === check)
      ) {
        markCoverageComplete(coverage, check)
      }
    }
  } else {
    if (!state.failure) addCoverageToRequested(coverage, 'skipped', 'INVALID_ARTIFACT')
  }

  const severityOrder = { error: 0, warning: 1, info: 2 }
  diagnostics.sort((left, right) => {
    const pathOrder = String(left.path || '').localeCompare(String(right.path || ''))
    if (pathOrder) return pathOrder
    const leftLine = left.range ? left.range.start.line : Number.MAX_SAFE_INTEGER
    const rightLine = right.range ? right.range.start.line : Number.MAX_SAFE_INTEGER
    if (leftLine !== rightLine) return leftLine - rightLine
    const leftColumn = left.range ? left.range.start.column : Number.MAX_SAFE_INTEGER
    const rightColumn = right.range ? right.range.start.column : Number.MAX_SAFE_INTEGER
    if (leftColumn !== rightColumn) return leftColumn - rightColumn
    const severity = (severityOrder[left.severity] ?? 99) - (severityOrder[right.severity] ?? 99)
    if (severity) return severity
    return String(left.code || '').localeCompare(String(right.code || '')) ||
      String(left.message || '').localeCompare(String(right.message || ''))
  })
  coverage.completed.sort(
    (left, right) => coverage.requested.indexOf(left) - coverage.requested.indexOf(right),
  )

  const hasCoverageGap =
    coverage.unsupported.length > 0 ||
    coverage.skipped.some((item) => item.check === undefined || coverage.requested.includes(item.check)) ||
    coverage.unverified.some((item) => item.check === undefined || coverage.requested.includes(item.check)) ||
    coverage.failures.some((item) => item.check === undefined || coverage.requested.includes(item.check)) ||
    coverage.requested.some((check) => !coverage.completed.includes(check))
  const outcome = state.artifactError
    ? 'invalid'
    : state.failure
      ? 'unavailable'
      : hasCoverageGap
        ? 'incomplete'
        : 'valid'

  return emptyResult(profile, diagnostics, coverage, outcome, versions)
}

function checkDataEvent(input) {
  const request = input && typeof input === 'object' && input.artifact
    ? {
        ...input,
        contract_version: input.contract_version === undefined
          ? CONTRACT_VERSION
          : input.contract_version,
        operation: input.operation === undefined ? 'validate' : input.operation,
        artifact_type: 'data_event',
      }
    : input && typeof input === 'object'
      ? {
          contract_version: CONTRACT_VERSION,
          artifact_type: 'data_event',
          operation: 'validate',
          artifact: {
            source: input.source !== undefined
              ? input.source
              : input.code !== undefined
                ? input.code
                : undefined,
          },
          context: { form: input.form },
          checks: input.checks || input.requested_checks,
          runtime_version: input.runtime_version || input.runtime,
          schema_version: input.schema_version || input.schema,
        }
      : input
  return validate(request)
}

function checkCalculation(input) {
  const request = input && typeof input === 'object' && input.artifact
    ? {
        ...input,
        contract_version: input.contract_version === undefined
          ? CONTRACT_VERSION
          : input.contract_version,
        operation: input.operation === undefined ? 'validate' : input.operation,
        artifact_type: 'calculation',
      }
    : input && typeof input === 'object'
      ? {
          contract_version: CONTRACT_VERSION,
          artifact_type: 'calculation',
          operation: 'validate',
          artifact: {
            expression: input.expression !== undefined
              ? input.expression
              : input.source !== undefined
                ? input.source
                : input.code !== undefined
                  ? input.code
                  : undefined,
          },
          context: {
            form: input.form,
            repeatable: input.repeatable_scope && typeof input.repeatable_scope === 'string'
              ? input.repeatable_scope
              : input.repeatable_scope && input.repeatable_scope.current,
            feature_index: input.feature_index,
          },
          checks: input.checks || input.requested_checks,
          runtime_version: input.runtime_version || input.runtime,
          schema_version: input.schema_version || input.schema,
        }
      : input
  return validate(request)
}

module.exports = Object.freeze({
  CONTRACT_VERSION,
  CHECKER_VERSION,
  RUNTIME_VERSION,
  DECLARATION_VERSION,
  LIMITS,
  CALCULATION_FORBIDDEN_APIS: Object.freeze(Array.from(CALCULATION_FORBIDDEN_APIS)),
  validate,
  checkDataEvent,
  checkCalculation,
})
