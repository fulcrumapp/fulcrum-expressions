checker = require '../checker'

form = {
  elements: [
    { data_name: 'status', type: 'TextField' }
    {
      data_name: 'items'
      type: 'Repeatable'
      elements: [
        { data_name: 'amount', type: 'NumberField' }
      ]
    }
  ]
}

codes = (result) -> result.diagnostics.map (diagnostic) -> diagnostic.code

formAtBytes = (target, value) ->
  value.padding = ''
  value.padding = 'x'.repeat(target - Buffer.byteLength(JSON.stringify(value)))
  value

describe 'headless expression checker', ->
  it 'accepts a deployable Data Event without executing its callback', ->
    result = checker.checkDataEvent({
      source: 'ON("change", "status", (event) => { throw new Error("canary"); });'
      form
    })

    result.outcome.should.eql('valid')
    codes(result).should.eql([])

  it 'rejects TypeScript-only syntax', ->
    result = checker.checkDataEvent({ source: 'const value = 1 as number;', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('JAVASCRIPT.TYPESCRIPT_SYNTAX')

  it 'rejects TypeScript type annotations', ->
    result = checker.checkDataEvent({ source: 'const value: number = 1;', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('JAVASCRIPT.TYPESCRIPT_SYNTAX')

  it 'catches unknown literal fields despite permissive declarations', ->
    result = checker.checkDataEvent({ source: 'VALUE("not_in_form")', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('FORM.UNKNOWN_FIELD_REFERENCE')

  it 'does not run field policies for syntax-only requests', ->
    result = checker.checkDataEvent({
      source: 'VALUE("not_in_form"); ON("not-an-event", () => {});'
      form
      checks: ['syntax']
    })

    result.outcome.should.eql('valid')
    result.diagnostics.should.eql([])
    result.coverage.requested.should.eql(['syntax'])

  it 'does not report calculation API policies outside requested coverage', ->
    result = checker.checkCalculation({
      source: 'SETVALUE("not_in_form", "changed");'
      form
      checks: ['syntax']
    })

    result.outcome.should.eql('valid')
    result.diagnostics.should.eql([])
    result.coverage.failures.should.eql([])

  it 'does not run syntax policies outside requested coverage', ->
    result = checker.checkDataEvent({
      source: 'const value: number = 1;'
      form
      checks: ['fields']
    })

    result.outcome.should.eql('valid')
    result.diagnostics.should.eql([])

  it 'continues field analysis inside unrequested module calls', ->
    result = checker.checkDataEvent({
      source: 'require($missing);'
      form
      checks: ['fields']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('FORM.UNKNOWN_FIELD_REFERENCE')

  it 'continues dependency analysis inside unrequested forbidden APIs', ->
    result = checker.checkCalculation({
      source: 'SETVALUE($missing, 1);'
      form
      checks: ['dependencies']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('FORM.UNKNOWN_FIELD_REFERENCE')

  it 'continues field analysis inside unrequested dynamic imports', ->
    result = checker.checkDataEvent({
      source: 'import($missing);'
      form
      checks: ['fields']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('FORM.UNKNOWN_FIELD_REFERENCE')

  it 'suppresses import syntax policies outside requested API coverage', ->
    result = checker.checkDataEvent({
      source: 'import dependency from "dependency"; $missing;'
      form
      checks: ['fields']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.eql(['FORM.UNKNOWN_FIELD_REFERENCE'])

  it 'does not apply Data Event hook policies to calculations', ->
    result = checker.checkCalculation({
      source: 'ON("not-an-event", "status", () => {});'
      form
      checks: ['scope']
    })

    result.outcome.should.eql('valid')
    codes(result).should.eql([])

  it 'rejects targets on form-level hooks', ->
    result = checker.checkDataEvent({
      source: 'ON("load-record", "status", () => {});'
      form
      checks: ['hooks']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('DATA_EVENT.INVALID_HOOK_TARGET')

  it 'reports truncated form traversal as unavailable field coverage', ->
    deepForm = { elements: [] }
    cursor = deepForm
    for index in [0...202]
      child = { elements: [] }
      cursor.elements = [child]
      cursor = child
    cursor.elements = [{ data_name: 'deep', type: 'TextField' }]

    result = checker.checkDataEvent({
      source: '$deep;'
      form: deepForm
      checks: ['fields']
    })

    result.outcome.should.eql('unavailable')
    result.coverage.failures.should.containEql({
      check: 'fields'
      reason_code: 'INPUT_LIMIT_EXCEEDED'
    })

  it 'classifies every requested check when form traversal is truncated', ->
    deepForm = { elements: [] }
    cursor = deepForm
    for index in [0...202]
      child = { elements: [] }
      cursor.elements = [child]
      cursor = child
    cursor.elements = [{ data_name: 'deep', type: 'TextField' }]

    result = checker.checkDataEvent({
      source: 'ON("change", "status", () => {});'
      form: deepForm
    })
    classified = result.coverage.completed.concat(
      result.coverage.skipped.map((entry) -> entry.check)
    ).concat(
      result.coverage.unsupported.map((entry) -> entry.check)
    ).concat(
      result.coverage.unverified.map((entry) -> entry.check)
    ).concat(
      result.coverage.failures.map((entry) -> entry.check)
    )

    result.outcome.should.eql('unavailable')
    for check in result.coverage.requested
      classified.should.containEql(check)

  it 'uses checker-level paths for form limit diagnostics', ->
    oversizedForm = { elements: [{ data_name: 'status', type: 'TextField', label: 'x'.repeat(140000) }] }
    result = checker.checkDataEvent({
      source: '$status;'
      form: oversizedForm
      checks: ['fields']
    })

    result.outcome.should.eql('unavailable')
    result.diagnostics[0].path.should.eql('$')

  it 'enforces exact form byte boundaries including object delimiters and commas', ->
    exact = checker.checkDataEvent({
      source: '1;'
      form: formAtBytes(checker.LIMITS.formBytes, { elements: [] })
      checks: ['fields']
    })
    plusOne = checker.checkDataEvent({
      source: '1;'
      form: formAtBytes(checker.LIMITS.formBytes + 1, { elements: [] })
      checks: ['fields']
    })
    plusTwo = checker.checkDataEvent({
      source: '1;'
      form: formAtBytes(checker.LIMITS.formBytes + 2, { elements: [] })
      checks: ['fields']
    })

    exact.outcome.should.eql('valid')
    plusOne.outcome.should.eql('unavailable')
    plusTwo.outcome.should.eql('unavailable')
    plusOne.coverage.failures.should.containEql({
      check: 'fields'
      reason_code: 'INPUT_LIMIT_EXCEEDED'
    })

  it 'counts commas, escaped values, and multibyte nested form objects', ->
    wideForm = {
      elements: [
        {
          data_name: 'status'
          type: 'TextField'
          label: 'é,"\\'
          options: { labels: ['uno', 'dos'], metadata: { note: '東京' } }
        }
      ]
      metadata: {
        title: 'café'
        nested: { children: [{ key: 'α' }, { key: 'β' }] }
      }
    }
    exact = checker.checkDataEvent({
      source: '1;'
      form: formAtBytes(checker.LIMITS.formBytes, wideForm)
      checks: ['fields']
    })
    over = checker.checkDataEvent({
      source: '1;'
      form: formAtBytes(checker.LIMITS.formBytes + 1, wideForm)
      checks: ['fields']
    })

    exact.outcome.should.eql('valid')
    over.outcome.should.eql('unavailable')

  it 'uses JSON-compatible bytes for undefined form values', ->
    exactForm = formAtBytes(checker.LIMITS.formBytes, {
      elements: []
      omitted: undefined
      values: [undefined]
    })
    overForm = formAtBytes(checker.LIMITS.formBytes + 1, {
      elements: []
      omitted: undefined
      values: [undefined]
    })
    exact = checker.checkDataEvent({
      source: '1;'
      form: exactForm
      checks: ['fields']
    })
    over = checker.checkDataEvent({
      source: '1;'
      form: overForm
      checks: ['fields']
    })

    JSON.stringify(exactForm).should.not.containEql('"omitted"')
    exact.outcome.should.eql('valid')
    over.outcome.should.eql('unavailable')

  it 'normalizes envelope defaults in convenience wrappers', ->
    result = checker.checkDataEvent({
      artifact: { source: '$status;' }
      context: { form }
      checks: ['fields']
    })

    result.outcome.should.eql('valid')

  it 'preserves explicitly empty checks in convenience wrappers', ->
    dataEvent = checker.checkDataEvent({ source: '$status;', form, checks: [] })
    calculation = checker.checkCalculation({ expression: '$status;', form, checks: [] })

    dataEvent.outcome.should.eql('incomplete')
    dataEvent.coverage.skipped.should.containEql({ reason_code: 'MISSING_CHECK' })
    calculation.outcome.should.eql('incomplete')
    calculation.coverage.skipped.should.containEql({ reason_code: 'MISSING_CHECK' })

  it 'rejects hooks with no event name or callback', ->
    result = checker.checkDataEvent({
      source: 'ON();'
      checks: ['hooks']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('DATA_EVENT.CALLBACK_SIGNATURE')

  it 'bounds repeated coverage entries', ->
    result = checker.checkDataEvent({
      source: "const fn = {}; const index = 'status';\n" + ('fn[index]();\n').repeat(1000)
      checks: ['api']
    })

    (result.coverage.unverified.length <= 257).should.be.true()

  it 'classifies diagnostic truncation as an unavailable operational limit', ->
    source = ("UNDECLARED_#{index}();" for index in [0...150]).join('\n')
    result = checker.checkDataEvent({
      source: source
      checks: ['api']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('JAVASCRIPT.UNDECLARED_NAME')
    result.coverage.failures.should.containEql({
      check: 'api'
      reason_code: 'INPUT_LIMIT_EXCEEDED'
    })

  it 'keeps the AST budget across suppressed nested API policies', ->
    result = checker.checkDataEvent({
      source: ('require($status);\n').repeat(Math.ceil(checker.LIMITS.sourceAstNodes / 3))
      form
      checks: ['fields']
    })

    result.outcome.should.eql('unavailable')
    result.coverage.failures.some((failure) -> failure.check is 'fields').should.be.true()

  it 'does not apply calculation repeatable scope rules to Data Events', ->
    result = checker.checkDataEvent({ source: 'VALUE("amount");', form })

    result.outcome.should.eql('valid')

  it 'rejects hooks without a callback when hooks are requested', ->
    result = checker.checkDataEvent({
      source: 'ON("change");'
      checks: ['hooks']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('DATA_EVENT.CALLBACK_SIGNATURE')

  it 'validates dynamic hook signatures after marking the event unverified', ->
    missing = checker.checkDataEvent({
      source: 'const eventName = "change"; ON(eventName);'
      checks: ['hooks']
    })
    nonFunction = checker.checkDataEvent({
      source: 'const eventName = "change"; ON(eventName, 1);'
      checks: ['hooks']
    })

    missing.outcome.should.eql('invalid')
    nonFunction.outcome.should.eql('invalid')
    codes(missing).should.containEql('DATA_EVENT.CALLBACK_SIGNATURE')
    codes(nonFunction).should.containEql('DATA_EVENT.CALLBACK_SIGNATURE')
    missing.coverage.unverified.some((entry) ->
      entry.check is 'hooks' and entry.reason_code is 'UNVERIFIED_DYNAMIC_HOOK'
    ).should.be.true()

  it 'does not reject event-specific targets when the hook event is dynamic', ->
    result = checker.checkDataEvent({
      source: 'const eventName = "change"; ON(eventName, "@magic", () => {});'
      checks: ['hooks']
    })

    result.outcome.should.eql('incomplete')
    codes(result).should.not.containEql('DATA_EVENT.INVALID_HOOK_TARGET')
    result.coverage.unverified.some((entry) ->
      entry.check is 'hooks' and entry.reason_code is 'UNVERIFIED_DYNAMIC_HOOK_TARGET'
    ).should.be.true()

  it 'rejects provably non-function hook callbacks', ->
    for callback in ['1', 'null', 'true', '[]', '`callback`']
      result = checker.checkDataEvent({
        source: "ON('change', #{callback});"
        checks: ['hooks']
      })

      result.outcome.should.eql('invalid')
      codes(result).should.containEql('DATA_EVENT.CALLBACK_SIGNATURE')
    codes(result).should.not.containEql('CALCULATION.REPEATABLE_SCOPE_REQUIRED')

  it 'marks unresolved hook callback references incomplete without API coverage', ->
    result = checker.checkDataEvent({
      source: 'ON("change", callback);'
      checks: ['hooks']
    })

    result.outcome.should.eql('incomplete')
    codes(result).should.containEql('COVERAGE.UNVERIFIED_REFERENCE')
    result.coverage.unverified.some((entry) ->
      entry.check is 'hooks' and
      entry.reason_code is 'UNVERIFIED_DYNAMIC_CALLBACK' and
      entry.path is '$.source'
    ).should.be.true()

  it 'accepts a named Data Event callback in the two-argument overload', ->
    result = checker.checkDataEvent({
      source: 'const callback = (event) => ALERT(event.value); ON("change", callback);'
      form
    })

    result.outcome.should.eql('valid')

  it 'rejects extra hook arguments when hooks are requested alone', ->
    result = checker.checkDataEvent({
      source: 'ON("change", "status", () => {}, "extra");'
      form
      checks: ['hooks']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('DATA_EVENT.CALLBACK_SIGNATURE')

  it 'preserves object-shaped repeatable scopes in the calculation wrapper', ->
    result = checker.checkCalculation({
      expression: 'VALUE("amount");'
      form
      repeatable_scope: {
        ancestors: ['items']
        repeatables: ['items']
      }
    })

    result.outcome.should.eql('valid')

  it 'does not mark ordinary property method calls as dynamic API references', ->
    result = checker.checkDataEvent({
      source: 'const value = "status"; value.toUpperCase();'
      form
    })

    result.outcome.should.eql('valid')

  it 'does not treat a local dollar variable as a form reference', ->
    result = checker.checkDataEvent({
      source: 'const $ = "local"; $;'
      form
    })

    result.outcome.should.eql('valid')

  it 'does not mark chained calls as dynamic API references', ->
    result = checker.checkDataEvent({
      source: 'const factory = () => () => "value"; factory()();'
      form
    })

    result.outcome.should.eql('valid')

  it 'validates change-geometry targets as repeatable fields', ->
    valid = checker.checkDataEvent({
      source: 'ON("change-geometry", "items", () => {});'
      form
      checks: ['hooks']
    })
    invalid = checker.checkDataEvent({
      source: 'ON("change-geometry", "status", () => {});'
      form
      checks: ['hooks']
    })

    valid.outcome.should.eql('valid')
    invalid.outcome.should.eql('invalid')
    codes(invalid).should.containEql('DATA_EVENT.INVALID_HOOK_TARGET')

  it 'does not validate object property names as form references', ->
    result = checker.checkDataEvent({
      source: 'const object = { $missing: 1 };'
      form
      checks: ['fields']
    })

    result.outcome.should.eql('valid')

  it 'does not treat shorthand property uses as form references', ->
    result = checker.checkDataEvent({
      source: 'const $status = "local"; const object = { $status };'
      form
      checks: ['fields']
    })

    result.outcome.should.eql('valid')

  it 'checks shorthand values against form fields without confusing property symbols', ->
    supplied = checker.checkDataEvent({
      source: 'const object = { $status };'
      form
      checks: ['fields']
    })
    missing = checker.checkDataEvent({
      source: 'const object = { $missing };'
      form
      checks: ['fields']
    })
    apiOnly = checker.checkDataEvent({
      source: 'const object = { $missing };'
      form
      checks: ['api']
    })

    supplied.outcome.should.eql('valid')
    missing.outcome.should.eql('invalid')
    codes(missing).should.containEql('FORM.UNKNOWN_FIELD_REFERENCE')
    apiOnly.outcome.should.eql('valid')
    codes(apiOnly).should.eql([])

  it 'counts shared form objects each time without treating them as cycles', ->
    sharedField = { data_name: 'status', type: 'TextField' }
    sharedForm = { elements: [sharedField, sharedField] }
    result = checker.checkDataEvent({
      source: '$status;'
      form: sharedForm
      checks: ['fields']
    })

    result.outcome.should.eql('valid')

  it 'gates semantic form diagnostics behind field coverage', ->
    result = checker.checkDataEvent({
      source: '$missing;'
      form
      checks: ['api']
    })

    result.outcome.should.eql('valid')
    codes(result).should.eql([])

  it 'marks computed calls as unverified dynamic references', ->
    result = checker.checkDataEvent({
      source: 'const method = "log"; console[method]("status");'
      form
    })

    result.outcome.should.eql('incomplete')
    codes(result).should.containEql('COVERAGE.UNVERIFIED_REFERENCE')

  it 'attributes dynamic call coverage to the API check', ->
    result = checker.checkDataEvent({
      source: 'const method = "log"; console[method]("status");'
      form
      checks: ['api']
    })

    result.outcome.should.eql('incomplete')
    result.coverage.unverified[0].check.should.eql('api')

  it 'does not mark ordinary computed property access as dynamic API coverage', ->
    result = checker.checkDataEvent({
      source: 'const index = 0; ["status"][index];'
      form
    })

    result.outcome.should.eql('valid')

  it 'keeps dynamic field coverage incomplete rather than warning-only valid', ->
    result = checker.checkDataEvent({
      source: 'const name = "status"; VALUE(name);'
      form
    })

    result.outcome.should.eql('incomplete')
    codes(result).should.containEql('COVERAGE.UNVERIFIED_REFERENCE')
    result.coverage.unverified[0].check.should.eql('fields')
    result.coverage.unverified[0].reason_code.should.eql('UNVERIFIED_DYNAMIC_FIELD')
    result.coverage.unverified[0].path.should.eql('$.source')

  it 'rejects calculation-only forbidden APIs while keeping profiles separate', ->
    result = checker.checkCalculation({ source: 'SETVALUE("status", "changed");', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('CALCULATION.FORBIDDEN_API')

  it 'rejects calculation result mutation as well as field mutation', ->
    result = checker.checkCalculation({ source: 'SETRESULT("candidate");', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('CALCULATION.FORBIDDEN_API')

  it 'rejects aliases of calculation-forbidden APIs', ->
    result = checker.checkCalculation({
      source: 'const mutate = SETVALUE; mutate("status", "changed");'
      form
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('CALCULATION.FORBIDDEN_API')

  it 'does not make definitive forbidden-API claims for mutable aliases', ->
    forbidden = checker.checkCalculation({
      source: 'let mutate = SETVALUE; mutate = (name, value) => 1; mutate("status", "ignored");'
      form
      checks: ['api']
    })
    ordinary = checker.checkCalculation({
      source: 'let mutate = SETVALUE; mutate = Number; mutate("1", "ignored");'
      form
      checks: ['api']
    })

    forbidden.outcome.should.eql('incomplete')
    codes(forbidden).should.not.containEql('CALCULATION.FORBIDDEN_API')
    forbidden.coverage.unverified.some((entry) ->
      entry.check is 'api' and entry.reason_code is 'UNVERIFIED_DYNAMIC_CALL'
    ).should.be.true()
    ordinary.outcome.should.eql('incomplete')
    codes(ordinary).should.not.containEql('CALCULATION.FORBIDDEN_API')
    ordinary.coverage.unverified.some((entry) ->
      entry.check is 'api' and entry.reason_code is 'UNVERIFIED_DYNAMIC_CALL'
    ).should.be.true()

  it 'requires and accepts a supplied repeatable scope', ->
    missing = checker.checkCalculation({ source: 'VALUE("amount");', form })
    present = checker.checkCalculation({
      source: 'VALUE("amount");'
      form
      repeatable_scope: { current: 'items' }
    })
    canonical = checker.checkCalculation({
      source: 'VALUE("amount");'
      form
      repeatable: 'items'
    })

    missing.outcome.should.eql('invalid')
    codes(missing).should.containEql('CALCULATION.REPEATABLE_SCOPE_REQUIRED')
    present.outcome.should.eql('valid')
    canonical.outcome.should.eql('valid')

  it 'does not evaluate source or mutate process state', ->
    global.__fulcrum_checker_canary = 0
    try
      result = checker.checkDataEvent({
        source: 'globalThis.__fulcrum_checker_canary = 1; throw new Error("secret-token");'
        form
      })

      result.outcome.should.eql('valid')
      global.__fulcrum_checker_canary.should.eql(0)
      JSON.stringify(result).should.not.containEql('secret-token')
    finally
      delete global.__fulcrum_checker_canary

  it 'bounds deeply nested form context during byte accounting', ->
    deeplyNested = {}
    current = deeplyNested
    for index in [0...checker.LIMITS.formDepth + 2]
      current.child = {}
      current = current.child

    result = checker.checkDataEvent({
      source: '1;'
      form: deeplyNested
      checks: ['syntax']
    })

    result.outcome.should.eql('unavailable')
    result.coverage.failures.some((failure) -> failure.reason_code is 'INPUT_LIMIT_EXCEEDED').should.be.true()

  it 'does not invoke accessor-backed form properties', ->
    invoked = 0
    accessorField = { data_name: 'status', type: 'TextField' }
    Object.defineProperty accessorField, 'label',
      enumerable: true
      get: ->
        invoked += 1
        'secret'

    result = checker.checkDataEvent({
      source: 'VALUE("status");'
      form: { elements: [accessorField] }
    })

    result.outcome.should.eql('valid')
    invoked.should.eql(0)

  it 'rejects non-plain form containers without traversing them', ->
    formWithCustomPrototype = Object.create({ inherited: 'ignored' })
    formWithCustomPrototype.elements = []

    result = checker.checkDataEvent({
      source: '1;'
      form: formWithCustomPrototype
      checks: ['syntax']
    })

    result.outcome.should.eql('unavailable')
    codes(result).should.containEql('CHECKER.FORM_CONTEXT_UNSAFE')
    result.coverage.failures.some((failure) -> failure.reason_code is 'CONTEXT_UNSAFE').should.be.true()

  it 'rejects Proxy-wrapped form containers without invoking traps', ->
    invoked = 0
    proxyForm = new Proxy({ elements: [] }, {
      getPrototypeOf: ->
        invoked += 1
        throw new Error('proxy trap')
    })

    result = checker.checkDataEvent({
      source: '1;'
      form: proxyForm
      checks: ['syntax']
    })

    result.outcome.should.eql('unavailable')
    codes(result).should.containEql('CHECKER.FORM_CONTEXT_UNSAFE')
    result.coverage.failures.some((failure) -> failure.reason_code is 'CONTEXT_UNSAFE').should.be.true()
    invoked.should.eql(0)

  it 'enforces calculation repeatable scope when scope is requested alone', ->
    result = checker.checkCalculation({
      source: 'VALUE("amount");'
      form
      repeatable_scope: { current: 'other_repeatable' }
      checks: ['scope']
    })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('CALCULATION.REPEATABLE_SCOPE_MISMATCH')

  it 'does not run the TypeScript probe when syntax is not requested', ->
    result = checker.checkDataEvent({
      source: 'const value: number = 1;'
      form
      checks: ['fields']
    })

    result.outcome.should.eql('valid')

  it 'does not resolve filesystem modules', ->
    result = checker.checkDataEvent({ source: 'require("fs");', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('JAVASCRIPT.MODULE_NOT_DEPLOYABLE')

  it 'rejects dynamic module imports', ->
    result = checker.checkDataEvent({ source: 'import("fs");', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('JAVASCRIPT.MODULE_NOT_DEPLOYABLE')

  it 'treats missing form context as incomplete for form variables', ->
    result = checker.checkDataEvent({ source: '$status;', checks: ['syntax', 'api', 'hooks', 'fields'] })

    result.outcome.should.eql('incomplete')
    codes(result).should.not.containEql('FORM.UNKNOWN_FIELD_REFERENCE')

  it 'returns bounded unavailable results for oversized candidates', ->
    result = checker.checkCalculation({
      source: 'x'.repeat(checker.LIMITS.sourceBytes + 1)
      form
    })

    result.outcome.should.eql('unavailable')
    codes(result).should.containEql('CHECKER.SOURCE_LIMIT')

  it 'uses one canonical failure reason when the AST work limit is exceeded', ->
    result = checker.checkDataEvent({
      source: ('let value = 0;\n').repeat(6000)
      form
    })

    result.outcome.should.eql('unavailable')
    result.coverage.failures.length.should.be.above(0)
    result.coverage.failures.every((failure) -> failure.reason_code is 'INPUT_LIMIT_EXCEEDED').should.be.true()

  it 'does not attach AST limit failures to unrequested checks', ->
    result = checker.checkDataEvent({
      source: ('let value = 0;\n').repeat(6000)
      checks: ['syntax']
    })

    result.outcome.should.eql('unavailable')
    result.coverage.failures.every((failure) -> not failure.check or failure.check is 'syntax').should.be.true()

  it 'reports nullable form variables instead of inventing non-null values', ->
    result = checker.checkDataEvent({ source: '$status.toUpperCase();', form })

    result.outcome.should.eql('invalid')
    result.diagnostics.length.should.be.above(0)
    result.diagnostics.every((diagnostic) -> not diagnostic.message.includes('status')).should.be.true()

  it 'reports exact compiler and declaration provenance', ->
    result = checker.checkCalculation({ source: 'VALUE("status");', form })

    result.versions.compiler.should.eql('4.9.5')
    result.versions.schema.should.eql('ts/api.ts@3.0.1')
    result.versions.runtime.should.eql('@fulcrumapp/fulcrum-expressions@3.0.1')

  it 'reports missing shorthand artifacts as invalid requests', ->
    dataEvent = checker.checkDataEvent({ form })
    calculation = checker.checkCalculation({ form })

    dataEvent.outcome.should.eql('invalid')
    calculation.outcome.should.eql('invalid')
    dataEvent.diagnostics[0].range.should.have.keys('start', 'end')
    calculation.diagnostics[0].range.should.have.keys('start', 'end')

  it 'accepts the canonical v1 Data Event artifact and context envelope', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'VALUE("status");' }
      context: { form }
    })

    result.outcome.should.eql('valid')
    result.coverage.requested.should.eql(['syntax', 'api', 'hooks', 'fields'])

  it 'deduplicates explicitly requested checks', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'VALUE("status");' }
      context: { form }
      checks: ['syntax', 'api', 'api', 'fields', 'syntax']
    })

    result.coverage.requested.should.eql(['syntax', 'api', 'fields'])
    result.outcome.should.eql('valid')

  it 'normalizes hook target field type spellings', ->
    normalizedForm = {
      elements: [
        { data_name: 'photos', type: ' photo field ' }
        { data_name: 'rows', type: 'REPEATABLE' }
      ]
    }
    result = checker.checkDataEvent({
      source: 'ON("add-photo", "photos", () => {}); ON("load-repeatable", "rows", () => {});'
      form: normalizedForm
    })

    result.outcome.should.eql('valid')

  it 'uses the canonical repeatable key and feature index for calculations', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'calculation'
      operation: 'validate'
      artifact: { expression: 'VALUE("amount");' }
      context: { form, repeatable: 'items', feature_index: 0 }
    })

    result.outcome.should.eql('valid')
    result.coverage.requested.should.eql(['syntax', 'api', 'scope', 'dependencies'])

  it 'retains operational limits as failures without converting them to artifact errors', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'x'.repeat(checker.LIMITS.sourceBytes + 1) }
    })

    result.outcome.should.eql('unavailable')
    result.diagnostics.every((diagnostic) -> diagnostic.severity isnt 'error').should.be.true()
    result.coverage.failures.every((failure) -> failure.reason_code is 'INPUT_LIMIT_EXCEEDED').should.be.true()
    result.diagnostics[0].range.should.have.keys('start', 'end')

  it 'does not turn version-mismatched declarations into artifact errors', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'UNDECLARED_API();' }
      context: { form }
      compiler_version: 'different-compiler'
    })

    result.outcome.should.eql('incomplete')
    codes(result).should.not.containEql('JAVASCRIPT.UNDECLARED_NAME')
    result.coverage.skipped.should.containEql({
      check: 'api'
      reason_code: 'VERSION_MISMATCH'
    })

  it 'ignores metadata names that are not explicit versions', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'VALUE("status");' }
      context: { form }
      compiler_version: { name: 'typescript' }
    })

    result.outcome.should.eql('valid')
    result.coverage.skipped.should.eql([])

  it 'normalizes named version metadata before compatibility checks', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'VALUE("status");' }
      context: { form }
      compiler_version: { name: 'typescript', version: require('typescript').version }
      schema_version: { name: 'ts/api.ts', version: checker.CHECKER_VERSION }
      runtime_version: {
        name: '@fulcrumapp/fulcrum-expressions'
        version: checker.CHECKER_VERSION
      }
    })

    result.outcome.should.eql('valid')
    result.coverage.skipped.should.eql([])

  it 'accepts bare and named schema and runtime versions consistently', ->
    bare = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'VALUE("status");' }
      context: { form }
      schema_version: checker.CHECKER_VERSION
      runtime_version: checker.CHECKER_VERSION
    })
    named = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'validate'
      artifact: { source: 'VALUE("status");' }
      context: { form }
      schema_version: 'ts/api.ts@' + checker.CHECKER_VERSION
      runtime_version: '@fulcrumapp/fulcrum-expressions@' + checker.CHECKER_VERSION
    })

    bare.outcome.should.eql('valid')
    named.outcome.should.eql('valid')

  it 'keeps unaffected checks complete for a runtime mismatch', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'calculation'
      operation: 'validate'
      artifact: { expression: 'VALUE("status");' }
      context: { form, repeatable: null, feature_index: 0 }
      runtime_version: 'different-runtime'
    })

    result.outcome.should.eql('incomplete')
    result.coverage.completed.should.containEql('syntax')
    result.coverage.completed.should.containEql('dependencies')
    result.coverage.skipped.should.containEql({
      check: 'scope'
      reason_code: 'VERSION_MISMATCH'
    })

  it 'uses checker-wide paths for malformed request metadata', ->
    result = checker.validate({
      contract_version: 'v1'
      artifact_type: 'data_event'
      operation: 'unsupported'
      artifact: { source: 'VALUE("status");' }
      checks: [1]
    })

    result.outcome.should.eql('invalid')
    result.diagnostics[0].path.should.eql('$')

  it 'uses checker-wide paths for non-object requests', ->
    checker.validate(null).diagnostics[0].path.should.eql('$')
