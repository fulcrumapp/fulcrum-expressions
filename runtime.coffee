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

  repeatable: null

  hooks: {}

  event: {}

  events:
    on: {}
    change: {}
    click: {}

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

  asyncCallbacks: {}

  asyncCount: 0

  scriptInitialized: false

  hooksInitialized: false

  isCalculation: false

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
    'userEmail',
    'userRoleName',
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

  clearValues: ->
    # Clear the values so that the references from the `with` statements remain
    # on the same root object. If we create a new @variables it won't stay the same
    # across executions. This is so the $field variables work in the form-level scripts.
    delete @variables[prop] for prop of @variables

  setupValues: ->
    @clearValues()

    state = @variables
    names = @dataNames

    for key of names
      state["$#{names[key]}"] = undefined

    for key of @values
      value = @values[key]

      element = @elementsByKey[key]

      if element and @dataNames[key]
        state["$#{@dataNames[key]}"] = Utils.valueForElement(element, value)

    for name in @extraVariableNames
      state["$$#{name}"] = @[name]

    for name of @customVariables
      state["#{name}"] = @customVariables[name]

    functions.CONFIGURE(@, false)

    @initializeScriptIfNecessary()

  prepare: ->
    @elements = Utils.flattenElements(@form.elements, true, true)

    if @form.status_field and @form.status_field.choices
      _.each @form.status_field.choices, (choice) =>
        @statusesByValue[choice.value] = choice.label

    _.each @elements, (element) =>
      @elementsByKey[element.key] = element
      @elementsByDataName[element.data_name] = element
      @dataNames[element.key] = element.data_name

  invokeAsync: (func, args, callback) ->
    id = ++@asyncCount

    @asyncCallbacks[id] = callback

    func.apply(@, args.concat([id]))

  finishAsync: ->
    id = +@callbackID

    callback = @asyncCallbacks[id]

    delete @asyncCallbacks[id]

    @resetResults()

    @isCalculation = false

    callback.apply(@, @callbackArguments)

    $$runtime.results

  initializeScriptIfNecessary: ->
    return if @scriptInitialized

    @scriptInitialized = true

    script = if _.isString(@form.script) then @form.script else ''
    if @form.field_effects
      script = """
        APPLYFIELDEFFECTS(#{JSON.stringify(@form.field_effects)});
        #{script}
      """

    `with (this.variables) { eval(script) }`

    return

  hookName: (name) ->
    return null unless name?

    'hook_' + name

  hooksByName: (name) ->
    @events[@hookName(name)] ?= []

  hooksByParams: (name, param) ->
    @hooksByName(name)[@hookName(param)] ?= []

  removeHook: (name, param, callback) ->
    param = @hookName(param) if param?

    if param? and callback?
      @hooksByName(name)[param] = _.without(@hooksByName(name)[param], callback)
    else if param?
      delete @hooksByName(name)[param]
    else
      @events[@hookName(name)] = []

  addHook: (name, param, callback) ->
    @hooksByParams(name, param).push(callback)

  resetResults: ->
    # When the global script runs, start with the results that were captured in that tick
    # This lets function calls at global scope eventually take effect the first time an event
    # is triggered (load-record).
    $$runtime.results = if @hooksInitialized then [] else @results

    @hooksInitialized = true

  trigger: ->
    @resetResults()

    @setupValues()

    if @event.field?
      [name, param] = [@event.name, @event.field]
    else
      [name, param] = [@event.name, null]

    hooks = @hooksByParams(name, param)

    return $$runtime.results unless hooks?.length

    @isCalculation = false

    hook.call(@, @event) for hook in hooks

    $$runtime.results

  evaluate: ->
    @resetResults()

    @setupValues()

    @isCalculation = true

    for context in @expressions
      $$runtime.results.push(@evaluateExpression(context))

    $$runtime.results

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

      return @createResult(context.key, null, null, ex.toString(), true)

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

    { type: 'calculation', key: key, value: stringValue, error: err }

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
    @global.$$runtime  = @
    @global.$$prepare  = @prepare.bind(@)
    @global.$$evaluate = @evaluate.bind(@)
    @global.$$trigger  = @trigger.bind(@)
    @global.$$finishAsync = @finishAsync.bind(@)

  setupFunctions: ->
    @functions ||= {}

    specialFunctions =
      ALERT: true
      APPLYFIELDEFFECTS: true
      CURRENTLOCATION: true
      INVALID: true
      OFF: true
      ON: true
      OPENURL: true
      OPENEXTERNAL: true
      PROGRESS: true
      REQUEST: true
      SETCHOICEFILTER: true
      SETCHOICES: true
      SETCONFIGURATION: true
      SETGEOMETRY: true
      SETLOCATION: true
      SETSTATUS: true
      SETSTATUSFILTER: true
      SETPROJECT: true
      SETDESCRIPTION: true
      SETDISABLED: true
      SETHIDDEN: true
      SETLABEL: true
      SETMAXLENGTH: true
      SETMINLENGTH: true
      SETREQUIRED: true
      SETTIMEOUT: true
      CLEARTIMEOUT: true
      SETINTERVAL: true
      CLEARINTERVAL: true
      SETVALUE: true
      SETFORMATTRIBUTES: true
      STORAGE: true

    checkCall = (name, func, args) =>
      if @isCalculation and specialFunctions[name]
        ERROR(name + ' cannot be used in a calculation')

    exportObject = (exportName) =>
      object = functions[exportName]

      wrapper =
        if _.isFunction(functions[exportName])
           ->
            checkCall(exportName, object, arguments)
            object.apply(functions, arguments)
        else
          object

      @functions[exportName] = object
      @global[exportName] = wrapper

    for name of functions
      exportObject(name)

module.exports = new Runtime
