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

  it 'catches unknown literal fields despite permissive declarations', ->
    result = checker.checkDataEvent({ source: 'VALUE("not_in_form")', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('FORM.UNKNOWN_FIELD_REFERENCE')

  it 'keeps dynamic field coverage incomplete rather than warning-only valid', ->
    result = checker.checkDataEvent({
      source: 'const name = "status"; VALUE(name);'
      form
    })

    result.outcome.should.eql('incomplete')
    codes(result).should.containEql('COVERAGE.UNVERIFIED_REFERENCE')
    result.coverage.skipped.should.containEql({
      check: 'field_references'
      reason_code: 'UNVERIFIED_DYNAMIC_FIELD'
    })

  it 'rejects calculation-only forbidden APIs while keeping profiles separate', ->
    result = checker.checkCalculation({ source: 'SETVALUE("status", "changed");', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('CALCULATION.FORBIDDEN_API')

  it 'rejects calculation result mutation as well as field mutation', ->
    result = checker.checkCalculation({ source: 'SETRESULT("candidate");', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('CALCULATION.FORBIDDEN_API')

  it 'requires and accepts a supplied repeatable scope', ->
    missing = checker.checkCalculation({ source: 'VALUE("amount");', form })
    present = checker.checkCalculation({
      source: 'VALUE("amount");'
      form
      repeatable_scope: { current: 'items' }
    })

    missing.outcome.should.eql('invalid')
    codes(missing).should.containEql('CALCULATION.REPEATABLE_SCOPE_REQUIRED')
    present.outcome.should.eql('valid')

  it 'does not evaluate source or mutate process state', ->
    global.__fulcrum_checker_canary = 0
    result = checker.checkDataEvent({
      source: 'globalThis.__fulcrum_checker_canary = 1; throw new Error("secret-token");'
      form
    })

    result.outcome.should.eql('valid')
    global.__fulcrum_checker_canary.should.eql(0)
    JSON.stringify(result).should.not.containEql('secret-token')
    delete global.__fulcrum_checker_canary

  it 'does not resolve filesystem modules', ->
    result = checker.checkDataEvent({ source: 'require("fs");', form })

    result.outcome.should.eql('invalid')
    codes(result).should.containEql('JAVASCRIPT.MODULE_NOT_DEPLOYABLE')

  it 'returns bounded unavailable results for oversized candidates', ->
    result = checker.checkCalculation({
      source: 'x'.repeat(checker.LIMITS.sourceBytes + 1)
      form
    })

    result.outcome.should.eql('unavailable')
    codes(result).should.containEql('CHECKER.SOURCE_LIMIT')

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
