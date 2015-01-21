_ = require('underscore')

functions = require('./functions')

Utils = require('./utils')

class Runtime
  constructor: ->
    @setupGlobal()
    @setupFunctions()

  @defaultLocale: 'en_US'

  @defaultCurrencyCode: 'USD'

  @defaultCurrencySymbol: '$'

  @defaultTimeZone: 'UTC'

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

  statusesByValue: {}

  featureIsNew: true

  showErrors: false

  extraVariableNames: [
    'locale',
    'language',
    'timeZone',
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
    'featureCreatedAt',
    'featureUpdatedAt',
    'featureGeometry'
  ]

  setupValues: ->
    state = @variables = {}
    names = @dataNames

    for key of names
      state["$#{names[key]}"] = undefined

    for key of @values
      value = @values[key]

      element = @elementsByKey[key]

      state["$#{@dataNames[key]}"] = Utils.valueForElement(element, value)

    for name in @extraVariableNames
      state["$$#{name}"] = @[name]

    for name of @customVariables
      state["#{name}"] = @customVariables[name]

    functions.CONFIGURE(@, false)

  prepare: ->
    @elements = Utils.flattenElements(@form.elements)

    if @form.status_field and @form.status_field.choices
      _.each @form.status_field.choices, (choice) =>
        @statusesByValue[choice.value] = choice.label

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
      $$runtime.showErrors = false

      variables.$$current = $$runtime.$$currentValue = variables[thisVariableName]

      stringValue = rawValue = $$runtime.$$result = undefined

      if context.expression and context.expression.length > 0
        evalResult = undefined

        `with (variables) { evalResult = eval(context.expression) }`

        rawValue = @coalesce($$runtime.$$result, evalResult)

        stringValue = @formatValue(rawValue)

        variables[thisVariableName] = if _.isNumber(rawValue) or _.isDate(rawValue) then rawValue else stringValue

      return @createResult(context.key, rawValue, stringValue, null, $$runtime.showErrors)
    catch ex
      console.log "JS ERROR : #{context.dataName} : #{ex.toString()}"

      variables[thisVariableName] = undefined

      return @createResult(context.key, null, null, ex.toString(), $$runtime.showErrors)

  coalesce: ->
    _.find Utils.toArray(arguments), (argument) -> not _.isUndefined(argument)

  createResult: (key, rawValue, stringValue, err, showErrors) ->
    if showErrors
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
      else if _.isDate(rawValue)
        err = null
      else if _.isObject(rawValue)
        err = '[Object]'
    else
      err = null

    { key: key, value: stringValue, error: err }

  formatValue: (value) ->
    if _.isUndefined(value)
      value = null
    else if _.isNull(value)
      value = null
    else if _.isNaN(value)
      value = null
    else if _.isNumber(value)
      value = value
    else if _.isDate(value)
      value = Utils.formatMachineDate(value)
    else if _.isArray(value)
      value = value.map(@formatValue).join(', ')
    else if _.isRegExp(value)
      value = value.toString()
    else if _.isFunction(value)
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
