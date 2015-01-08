_ = require('underscore')

functions = require('./functions')

Utils = require('./utils')

class Runtime
  constructor: ->
    @setupGlobal()
    @setupFunctions()

  @defaultLocale: 'en-US'

  @defaultCurrencyCode: 'USD'

  @defaultCurrencySymbol: '$'

  global: null

  expressions: []

  form: {}

  values: {}

  customVariables: {}

  locale: @defaultLocale

  currencyCode: @defaultCurrencyCode

  currencySymbol: @defaultCurrencySymbol

  variables: {}

  results: []

  dataNames: {}

  elements: []

  elementsByKey: {}

  elementsByDataName: {}

  extraVariableNames: [
    'locale',
    'decimalSeparator',
    'groupingSeparator',
    'currencySymbol',
    'currencyCode',
    'country',
    'deviceIdentifier',
    'deviceModel',
    'deviceManufacturer',
    'platform',
    'platformVersion',
    'application',
    'applicationVersion',
    'applicationBuild',
    'recordStatus',
    'recordSystemCreatedAt',
    'recordSystemUpdatedAt',
    'recordClientCreatedAt',
    'recordClientUpdatedAt',
    'recordProject',
    'recordProjectName',
    'recordGeometry',
    'recordAltitude',
    'recordVerticalAccuracy',
    'recordHorizontalAccuracy',
    'createdAt',
    'updatedAt',
    'geometry'
  ]

  setupValues: ->
    state = @variables = {}
    names = @dataNames

    for key of names
      state["$#{names[key]}"] = null

    for key of @values
      value = @values[key]

      if @elementsByKey[key].numeric
        state["$#{@dataNames[key]}"] = Number(value)
      else
        state["$#{@dataNames[key]}"] = value

    for name in @extraVariableNames
      state["$$#{name}"] = @[name]

    for name of @customVariables
      state["#{name}"] = @customVariables[name]

    functions.CONFIGURE(state)

  prepare: ->
    @elements = Utils.flattenElements(@form.elements)

    _.each @elements, (element) =>
      @elementsByKey[element.key] = element
      @elementsByDataName[element.data_name] = element
      @dataNames[element.key] = element.data_name

  evaluate: ->
    @setupValues()

    @results = _.map @expressions, (context) => @evaluateExpression(context)

  evaluateExpression: (context) ->
    variables = @variables

    thisVariableName = "$#{context.dataName}"

    try
      stringValue = rawValue = variables[thisVariableName] = variables.$$result = undefined

      if context.expression and context.expression.length > 0
        evalResult = undefined

        `with (variables) { evalResult = eval(context.expression) }`

        rawValue = @coalesce(variables[thisVariableName], variables.$$result, evalResult)

        stringValue = variables[thisVariableName] = @formatValue(rawValue)

      return @createResult(context.key, rawValue, stringValue, null)
    catch ex
      console.log "JS ERROR : #{context.dataName} : #{ex.toString()}"

      variables[thisVariableName] = undefined

      return @createResult(context.key, null, null, ex.toString())

  coalesce: ->
    _.find Utils.toArray(arguments), (argument) -> not _.isUndefined(argument)

  createResult: (key, rawValue, stringValue, err) ->
    if err
      err = err.toString()
    else if _.isUndefined(rawValue)
      err = '[Undefined]'
    else if _.isNaN(rawValue)
      err = '[Not a Number]'
    else if _.isFunction(rawValue)
      err = '[Function]'
    else if _.isArray(rawValue)
      err = '[Array]'
    else if _.isObject(rawValue)
      err = '[Object]'

    { key: key, value: stringValue, error: err }

  formatValue: (value) ->
    if _.isUndefined(value)
      value = null
    else if _.isNull(value)
      value = null
    else if _.isNumber(value)
      value = value
    else if _.isDate(value)
      value = value.toString()
    else if _.isArray(value)
      value = value.map(@formatValue).join(', ')
    else if _.isRegExp(value)
      value = value.toString()
    else if _.isFunction(value)
      value = null
    else if _.isNaN(value)
      value = null

    value

  setupGlobal: ->
    @global = undefined

    try
      @global = Function("return this")()
    catch e
      @global = window

    # global exports
    @global.$$runtime = @
    @global.$$prepare = @prepare.bind(@)
    @global.$$evaluate = @evaluate.bind(@)

  setupFunctions: ->
    @functions ||= {}

    for exportName of functions
      @global[exportName] = @functions[exportName] = functions[exportName]

module.exports = new Runtime
