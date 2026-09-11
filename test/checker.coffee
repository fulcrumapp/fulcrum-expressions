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

  it 'does not apply calculation repeatable scope rules to Data Events', ->
    result = checker.checkDataEvent({ source: 'VALUE("amount");', form })

    result.outcome.should.eql('valid')
    codes(result).should.not.containEql('CALCULATION.REPEATABLE_SCOPE_REQUIRED')

  it 'accepts a named Data Event callback in the two-argument overload', ->
    result = checker.checkDataEvent({
      source: 'const callback = (event) => ALERT(event.value); ON("change", callback);'
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
