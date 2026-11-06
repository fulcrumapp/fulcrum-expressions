request = require('browser-request')

globalKeys = """
  locale language timeZone decimalSeparator groupingSeparator groupingSize currencySymbol
  currencyCode country deviceIdentifier deviceModel deviceManufacturer platform
  platformVersion application applicationVersion applicationBuild
""".split(/\s+/).filter(Boolean)

featureKeys = """
  userEmail userFullName userRoleName recordID recordVersion recordStatus
  recordClientCreatedAt recordClientUpdatedAt recordSystemCreatedAt recordSystemUpdatedAt
  recordProject recordProjectName recordGeometry recordAltitude recordVerticalAccuracy
  recordHorizontalAccuracy recordCreatedLatitude recordCreatedLongitude recordCreatedAltitude
  recordCreatedAccuracy recordUpdatedLatitude recordUpdatedLongitude recordUpdatedAltitude
  recordUpdatedAccuracy recordCreatedDuration recordUpdatedDuration recordEditedDuration
  repeatable featureID featureIndex featureIsNew featureCreatedAt featureUpdatedAt featureGpsDeviceCapture
  featureGeometry featureCreatedLatitude featureCreatedLongitude featureCreatedAltitude
  featureCreatedAccuracy featureUpdatedLatitude featureUpdatedLongitude featureUpdatedAltitude
  featureUpdatedAccuracy featureCreatedDuration featureUpdatedDuration featureEditedDuration
  currentLocation
""".split(/\s+/).filter(Boolean)

commands =
  prepare: ['form']
  expressions: ['expressions']
  values: ['values', 'customVariables', 'featureVariables']
  globals: ['globals']
  evaluate: []
  triggerDataEvent: ['event']
  finishAsyncCallback: ['callbackID', 'callbackArguments']
  httpRequest: ['options']

isObject = (value) -> value? and typeof value is 'object' and not Array.isArray(value)
optionalObject = (value) -> not value? or isObject(value)
safeObject = (value) ->
  optionalObject(value) and (not value? or Object.keys(value).every((key) -> key isnt '__proto__'))
allowedKeys = (value, keys) ->
  isObject(value) and Object.keys(value).every((key) -> keys.indexOf(key) isnt -1)
optionalString = (value) -> not value? or typeof value is 'string'
safeIndex = (value) ->
  not value? or (typeof value in ['string', 'number', 'boolean'] and String(value) isnt '__proto__')

validElements = (elements) ->
  return false unless Array.isArray(elements)
  pending = elements.slice()
  while pending.length
    element = pending.pop()
    return false unless isObject(element) and safeIndex(element.key) and safeIndex(element.data_name)
    if element.elements?
      return false unless Array.isArray(element.elements)
      pending.push(child) for child in element.elements
  true

validGlobals = (globals) ->
  allowedKeys(globals, globalKeys) and Object.keys(globals).every (key) ->
    value = globals[key]
    not value? or typeof value is 'string' or (key is 'groupingSize' and typeof value is 'number')

validStatusField = (field) ->
  return true unless field?
  return false unless isObject(field)
  return true unless field.choices?
  Array.isArray(field.choices) and field.choices.every((choice) -> isObject(choice) and safeIndex(choice.value))

validRequestOptions = (options) ->
  return false unless isObject(options) and typeof (options.url or options.uri) is 'string'
  return false if options.proxy or options._redirectsFollowed or options.maxRedirects
  return false if options.headers? and (not isObject(options.headers) or Object.keys(options.headers).some((key) -> key.toLowerCase() is 'host'))
  return false if options.method? and typeof options.method isnt 'string'
  return false if options.form? and not isObject(options.form)
  return false if options.qs? and typeof options.qs isnt 'string' and not isObject(options.qs)
  for field in ['form', 'qs']
    return false if isObject(options[field]) and Object.prototype.hasOwnProperty.call(options[field], 'hasOwnProperty')
  if options.form and options.method is 'POST' and options.encoding?
    return false unless typeof options.encoding is 'string' and options.encoding.toLowerCase() in ['application/x-www-form-urlencoded', 'multipart/form-data']
  true

validMessage = (message) ->
  return false unless isObject(message) and typeof message.name is 'string'
  return false unless Object.prototype.hasOwnProperty.call(commands, message.name)
  return false unless allowedKeys(message, ['name', 'id'].concat(commands[message.name]))
  if Object.prototype.hasOwnProperty.call(message, 'id')
    return false unless not message.id? or typeof message.id is 'string' or (typeof message.id is 'number' and isFinite(message.id))
  switch message.name
    when 'prepare'
      isObject(message.form) and validElements(message.form.elements) and validStatusField(message.form.status_field)
    when 'expressions'
      Array.isArray(message.expressions) and message.expressions.every (expression) ->
        isObject(expression) and optionalString(expression.key) and
          optionalString(expression.dataName) and optionalString(expression.expression)
    when 'values'
      safeObject(message.values) and safeObject(message.customVariables) and
        (not message.featureVariables? or allowedKeys(message.featureVariables, featureKeys))
    when 'globals'
      validGlobals(message.globals)
    when 'evaluate' then true
    when 'triggerDataEvent'
      isObject(message.event) and typeof message.event.name is 'string'
    when 'finishAsyncCallback'
      (typeof message.callbackID is 'string' or
        (typeof message.callbackID is 'number' and isFinite(message.callbackID))) and
        (not message.callbackArguments? or Array.isArray(message.callbackArguments))
    when 'httpRequest'
      validRequestOptions(message.options)
    else false

class ExpressionEngine
  constructor: ->
    configuredOrigins = '__EXPRESSION_SANDBOX_ALLOWED_ORIGINS__'
    @allowedOrigins = if configuredOrigins.indexOf('://') is -1 then [] else configuredOrigins.split(',')
    console.error 'Expression sandbox disabled: trusted origins are not configured' unless @allowedOrigins.length
    @parentOrigin = null

  onMessage: (event) =>
    return unless event.isTrusted is true and event.source is window.parent and event.source isnt window
    return unless @allowedOrigins.indexOf(event.origin) isnt -1
    return if @parentOrigin? and @parentOrigin isnt event.origin
    return unless typeof event.data is 'string'

    try
      message = JSON.parse(event.data)
    catch
      console.error 'Expression sandbox rejected malformed JSON'
      return

    unless validMessage(message)
      console.error 'Expression sandbox rejected an invalid message'
      return

    @parentOrigin ?= event.origin
    @source = event.source
    @origin = event.origin
    @id = message.id

    @[message.name](event, message)

  prepare: (event, message) ->
    $$runtime.form = message.form
    $$prepare()

    @setupHostFunctions()

    @respond(name: 'prepare')

  expressions: (event, message) ->
    $$runtime.expressions = message.expressions

    @respond(name: 'expressions')

  values: (event, message) ->
    $$runtime.values = message.values or {}

    if message.customVariables
      $$runtime.customVariables = message.customVariables

    if message.featureVariables
      for key of message.featureVariables
        $$runtime[key] = message.featureVariables[key]

    @respond(name: 'values')

  globals: (event, message) ->
    for key of message.globals
      $$runtime[key] = message.globals[key]

    @respond(name: 'globals')

  evaluate: (event, message) ->
    results = $$evaluate()

    @respond(name: 'evaluate', results: results)

  triggerDataEvent: (event, message) ->
    $$runtime.event = message.event or null

    results = $$trigger()

    @respond(name: 'triggerDataEvent', results: results)

  finishAsyncCallback: (event, message) ->
    $$runtime.callbackID = message.callbackID or null
    $$runtime.callbackArguments = message.callbackArguments or []

    results = $$finishAsync()

    @respond(name: 'finishAsyncCallback', results: results)

  respond: (message) ->
    try
      message.id ?= @id
      response = JSON.stringify(message)
    catch e
      response = null
      console.log 'Error sending object', message

    @source.postMessage(response, @origin)

  httpRequest: (event, message) ->
    # not supported
    delete message.options.followRedirect

    request message.options, (err, res, body) =>
      @respond(id: message.id, name: 'httpRequest', result: [err, res, body])

  setupHostFunctions: ->
    $$runtime["$$httpRequest"] = (options, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'httpRequest', argumentList: [options, callbackID])
    $$runtime["$$messageBox"] = (options, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'messageBox', argumentList: [options, callbackID])
    $$runtime["$$setTimeout"] = (delay, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'setTimeout', argumentList: [delay, callbackID])
    $$runtime["$$inference"] = (options, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'inference', argumentList: [options, callbackID])
    $$runtime["$$loadFile"] = (options, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'loadFile', argumentList: [options, callbackID])
    $$runtime["$$loadRecords"] = (options, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'loadRecords', argumentList: [options, callbackID])
    $$runtime["$$loadForm"] = (options, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'loadForm', argumentList: [options, callbackID])
    $$runtime["$$recognizeText"] = (options, callbackID) =>
      @respond(name: 'hostFunction', functionName: 'recognizeText', argumentList: [options, callbackID])

proxy = new ExpressionEngine

if window.addEventListener
  window.addEventListener('message', proxy.onMessage.bind(proxy), false)
else
  window.attachEvent('message', (event) -> proxy.onMessage(event))
