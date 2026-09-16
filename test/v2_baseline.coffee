global.Intl = require 'intl'

functions = require '../functions'
runtime = require '../runtime'
variables = require './variables.json'

publicFunctionNames = Object.keys(functions).filter (name) ->
  /^[A-Z][A-Z0-9_]*$/.test(name) and typeof functions[name] is 'function'

resetRuntime = ->
  RESETCONFIG()
  runtime.form = variables.form
  runtime.values = variables.values.form_values
  runtime.expressions = []
  runtime.isCalculation = false
  runtime.prepare()
  runtime.setupValues()
  runtime.resetResults()

describe 'v2 behavior baseline', ->
  beforeEach ->
    resetRuntime()

  afterEach ->
    RESETCONFIG()
    CONFIGURE(variables)

  after ->
    RESETCONFIG()
    CONFIGURE(variables)
    runtime.isCalculation = false

  describe 'exported function surface', ->
    it 'exposes every callable v2 function on the expression global', ->
      publicFunctionNames.length.should.be.above(0)

      [
        'RESETCONFIG'
        'CONFIGURE'
        'SETVALUE'
        'INVALID'
        'UPPER'
      ].forEach (name) ->
        publicFunctionNames.should.containEql(name)

      for name in publicFunctionNames
        (typeof global[name]).should.eql('function')
        (typeof functions[name]).should.eql('function')

    it 'keeps the public function inventory free of missing or non-callable exports', ->
      publicFunctionNames.every((name) -> typeof global[name] is 'function').should.be.true()

  describe 'runtime-driven expressions', ->
    it 'evaluates field values, dates, arrays, geometry, and errors through the runtime', ->
      runtime.expressions = [
        { key: 'upper_name', dataName: 'upper_name', expression: "UPPER($name)" }
        { key: 'date_value', dataName: 'date_value', expression: "DATEVALUE('2020-01-02')" }
        { key: 'array_value', dataName: 'array_value', expression: "ARRAY(1, 2, 3)" }
        { key: 'geometry_value', dataName: 'geometry_value', expression: "GEOMETRYPOINT(-82, 27)" }
        { key: 'invalid_value', dataName: 'invalid_value', expression: "DOES_NOT_EXIST()" }
      ]

      results = runtime.evaluate()

      results[0].value.should.eql('TEST RECORD')
      (results[0].error is null).should.be.true()
      results[1].value.should.eql('2020-01-02')
      results[2].value.should.eql('1, 2, 3')
      results[3].error.should.match(/coordinates must be an Array/)
      results[4].error.should.match(/DOES_NOT_EXIST is not defined/)

    it 'reports side-effect functions as invalid during calculation', ->
      runtime.expressions = [
        { key: 'result', dataName: 'result', expression: "SETVALUE('name', 'Changed'); INVALID('Bad value'); 'ok'" }
      ]

      results = runtime.evaluate()

      (results[0].value is null).should.be.true()
      results[0].error.should.match(/SETVALUE cannot be used in a calculation/)

    it 'captures validation and side-effect results outside calculation mode', ->
      runtime.resetResults()
      SETVALUE('name', 'Changed')
      INVALID('Bad value')

      runtime.results.should.containEql({ type: 'set-value', key: '97ab', value: '"Changed"' })
      runtime.results.should.containEql({ type: 'validation', key: null, message: 'Bad value' })

  describe 'configuration and locale behavior', ->
    it 'round-trips locale settings and uses configured separators', ->
      CONFIGURE
        locale: 'de_DE'
        language: 'de-DE'
        country: 'DE'
        decimalSeparator: ','
        groupingSeparator: '.'
        groupingSize: 3
        currencyCode: 'EUR'

      LOCALE().should.eql('de_DE')
      LANGUAGE().should.eql('de-DE')
      COUNTRY().should.eql('DE')
      DECIMALSEPARATOR().should.eql(',')
      GROUPINGSEPARATOR().should.eql('.')
      CURRENCYCODE().should.eql('EUR')
      FIXED(1234.5, 2).should.eql('1.234,50')

    it 'restores defaults after RESETCONFIG', ->
      CONFIGURE(locale: 'pt_BR', currencyCode: 'BRL')
      RESETCONFIG()

      CONFIG().locale.should.eql('en_US')
      CONFIG().currencyCode.should.eql('USD')
      DECIMALSEPARATOR().should.eql('.')
      GROUPINGSEPARATOR().should.eql(',')

  describe 'geometry and boundary behavior', ->
    it 'handles empty, invalid, and boundary values without throwing', ->
      ISBLANK(null).should.be.true()
      ISBLANK([]).should.be.true()
      NUM('not a number').should.be.NaN()
      ABS(-Number.MAX_VALUE).should.eql(Number.MAX_VALUE)
      (-> GEOMETRYAREA(null)).should.throw()
      (-> GEOMETRYPOINT([])).should.throw()
      (-> GEOMETRYPOINT('invalid')).should.throw()

    it 'returns deterministic geometry results for representative GeoJSON', ->
      point = GEOMETRYPOINT([-82, 27])
      line = GEOMETRYLINESTRING([[-82, 27], [-81, 27]])

      point.should.eql({ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-82, 27] } })
      GEOMETRYDISTANCE(point, GEOMETRYPOINT([-81, 27])).should.be.a.Number()
      GEOMETRYLENGTH(line).should.be.above(0)

  describe 'host callbacks, storage, and timers', ->
    it 'serializes request options and returns the host response', ->
      runtime.isCalculation = false
      request = null
      functions.HostFunctions.httpRequest = (options, callback) ->
        request = JSON.parse(options)
        callback(null, { ok: true })

      response = null
      REQUEST({ url: 'https://example.test', qs: { page: 2 }, json: { ok: true } }, (error, value) ->
        (error is null).should.be.true()
        response = value
      )

      request.url.should.eql('https://example.test?page=2')
      request.headers['Content-Type'].should.eql('application/json')
      request.body.should.eql('{"ok":true}')
      response.should.eql({ ok: true })

    it 'uses the host storage contract and forwards timer operations', ->
      runtime.isCalculation = false
      storage = {}
      timerCalls = []
      functions.HostFunctions.storageLength = -> Object.keys(storage).length
      functions.HostFunctions.storageKey = (scope, index) -> Object.keys(storage)[index] or null
      functions.HostFunctions.storageGetItem = (scope, key) -> storage[key] ? null
      functions.HostFunctions.storageSetItem = (scope, key, value) -> storage[key] = value
      functions.HostFunctions.storageRemoveItem = (scope, key) -> delete storage[key]
      functions.HostFunctions.storageClear = -> storage = {}
      functions.HostFunctions.setTimeout = (callback, timeout) -> timerCalls.push(['timeout', timeout]); 17
      functions.HostFunctions.clearTimeout = (id) -> timerCalls.push(['clearTimeout', id])

      store = STORAGE()
      store.setItem('answer', 42)
      store.getItem('answer').should.eql('42')
      store.length.should.eql(1)
      store.key(0).should.eql('answer')
      store.removeItem('answer')
      (store.getItem('answer') is null).should.be.true()

      SETTIMEOUT((->), 25).should.eql(17)
      CLEARTIMEOUT(17)
      timerCalls.should.eql([['timeout', 25], ['clearTimeout', 17]])

  describe 'global initialization and asynchronous completion', ->
    it 'installs the runtime globals and completes a host callback', ->
      global.$$runtime.should.equal(runtime)
      global.$$prepare.should.be.a.Function()
      global.$$evaluate.should.be.a.Function()
      global.$$trigger.should.be.a.Function()
      global.$$finishAsync.should.be.a.Function()

      result = null
      runtime.invokeAsync(((value, callbackID) ->
        runtime.callbackID = callbackID
        runtime.callbackArguments = [value]
        runtime.finishAsync()
      ), ['complete'], (value) -> result = value)

      result.should.eql('complete')
      Object.keys(runtime.asyncCallbacks).should.eql([])