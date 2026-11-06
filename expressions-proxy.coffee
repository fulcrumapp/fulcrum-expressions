request = require('browser-request')
trustedOrigins = require('./trusted-origins')

globalKeys = """
  locale language timeZone decimalSeparator groupingSeparator groupingSize
  currencySymbol currencyCode country deviceIdentifier deviceModel deviceManufacturer
  platform platformVersion application applicationVersion applicationBuild applicationInfo
""".split(/\s+/).filter(Boolean)

featureKeys = """
  userEmail userFullName userRoleName recordID recordVersion recordStatus
  recordClientCreatedAt recordClientUpdatedAt recordSystemCreatedAt recordSystemUpdatedAt
  recordProject recordProjectName recordGeometry recordAltitude recordVerticalAccuracy
  recordHorizontalAccuracy recordCreatedLatitude recordCreatedLongitude recordCreatedAltitude
  recordCreatedAccuracy recordUpdatedLatitude recordUpdatedLongitude recordUpdatedAltitude
  recordUpdatedAccuracy recordCreatedDuration recordUpdatedDuration recordEditedDuration
  repeatable featureID featureIndex featureIsNew featureCreatedAt featureUpdatedAt
  featureGeometry featureCreatedLatitude featureCreatedLongitude featureCreatedAltitude
  featureCreatedAccuracy featureUpdatedLatitude featureUpdatedLongitude featureUpdatedAltitude
  featureUpdatedAccuracy featureCreatedDuration featureUpdatedDuration featureEditedDuration
  currentLocation
""".split(/\s+/).filter(Boolean)

commandKeys =
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
validCustomVariables = (value) ->
  optionalObject(value) and (not value? or Object.keys(value).every((key) -> key not in ['__proto__', 'constructor', 'prototype']))
allowedKeys = (object, keys) ->
  isObject(object) and Object.keys(object).every((key) -> keys.indexOf(key) isnt -1)

safeIndex = (key) ->
  not key? or (typeof key in ['string', 'number', 'boolean'] and String(key) not in ['__proto__', 'constructor', 'prototype'])

validDateValue = (element, value) ->
  return true unless element?.type in ['DateField', 'DateTimeField']
  return true if element.numeric or element.display?.style in ['number', 'currency']
  return true unless value and typeof value isnt 'string'
  try
    not (value.length <= 10)
  catch
    false

validElements = (elements) ->
  return false unless Array.isArray(elements)
  stack = elements.slice()
  while stack.length
    element = stack.pop()
    return false unless isObject(element) and safeIndex(element.key) and safeIndex(element.data_name)
    if element.elements?
      return false unless Array.isArray(element.elements)
      stack.push(child) for child in element.elements
  true

validStatusField = (field) ->
  return true unless field?
  return false unless isObject(field)
  return true unless field.choices?
  Array.isArray(field.choices) and field.choices.every((choice) -> isObject(choice) and safeIndex(choice.value))

validForm = (form) ->
  return false unless isObject(form) and validElements(form.elements)
  return false if form.script? and typeof form.script isnt 'string'
  validStatusField(form.status_field)

validExpressions = (expressions) ->
  Array.isArray(expressions) and expressions.every (expression) ->
    isObject(expression) and typeof expression.key is 'string' and
      typeof expression.dataName is 'string' and
      (not expression.expression? or typeof expression.expression is 'string')

validValues = (values) ->
  return false unless optionalObject(values)
  return true unless values? and $$runtime.elementsByKey?
  Object.keys(values).every (key) ->
    validDateValue($$runtime.elementsByKey[key], values[key])

validGlobals = (globals) ->
  allowedKeys(globals, globalKeys) and Object.keys(globals).every (key) ->
    value = globals[key]
    not value? or typeof value is 'string' or (key is 'groupingSize' and typeof value is 'number')

validFeatures = (features) ->
  allowedKeys(features, featureKeys) and Object.keys(features).every (key) ->
    value = features[key]
    return true unless value?
    return typeof value is 'boolean' if key is 'featureIsNew'
    return isObject(value) if key in ['recordGeometry', 'featureGeometry', 'currentLocation']
    typeof value in ['string', 'number', 'boolean']

validRequestOptions = (options) ->
  return false unless isObject(options)
  return false unless typeof (options.url or options.uri) is 'string'
  return false if options.proxy or options._redirectsFollowed or options.maxRedirects
  return false if options.headers? and (not isObject(options.headers) or options.headers.host)
  return false if options.method? and typeof options.method isnt 'string'
  return false if options.form? and not isObject(options.form)
  for field in ['form', 'qs']
    return false if isObject(options[field]) and Object.prototype.hasOwnProperty.call(options[field], 'hasOwnProperty')
  return false if options.encoding? and (typeof options.encoding isnt 'string' or options.encoding.toLowerCase() not in ['application/x-www-form-urlencoded', 'multipart/form-data'])
  true

class ExpressionEngine
  constructor: ->
    @origins = trustedOrigins(window.EXPRESSION_SANDBOX_ALLOWED_ORIGINS)
    console.error 'Expression sandbox disabled: trusted origins are missing or invalid' unless @origins.length
    @pendingCallbacks = Object.create(null)
    @context = null
    @parentOrigin = null

  validMessage: (message) ->
    return false unless isObject(message) and typeof message.name is 'string'
    return false unless Object.prototype.hasOwnProperty.call(commandKeys, message.name)
    return false unless allowedKeys(message, ['name', 'id'].concat(commandKeys[message.name]))
    if Object.prototype.hasOwnProperty.call(message, 'id')
      return false unless typeof message.id is 'string' or (typeof message.id is 'number' and isFinite(message.id))
    switch message.name
      when 'prepare' then validForm(message.form)
      when 'expressions' then validExpressions(message.expressions)
      when 'values'
        optionalObject(message.values) and validCustomVariables(message.customVariables) and
          (not message.featureVariables? or validFeatures(message.featureVariables))
      when 'globals' then validGlobals(message.globals)
      when 'evaluate' then validValues($$runtime.values)
      when 'triggerDataEvent'
        isObject(message.event) and typeof message.event.name is 'string' and validValues($$runtime.values)
      when 'finishAsyncCallback'
        (typeof message.callbackID is 'number' or typeof message.callbackID is 'string') and
          Object.prototype.hasOwnProperty.call(@pendingCallbacks, message.callbackID) and
          (not message.callbackArguments? or Array.isArray(message.callbackArguments))
      when 'httpRequest' then validRequestOptions(message.options)
      else false

  isTrustedSender: (event) ->
    event.isTrusted is true and event.source is window.parent and event.source isnt window and
      @origins.indexOf(event.origin) isnt -1 and
      (not @parentOrigin? or @parentOrigin is event.origin)

  onMessage: (event) =>
    return unless @isTrustedSender(event)
    return unless typeof event.data is 'string'
    try
      message = JSON.parse(event.data)
    catch
      return
    return unless @validMessage(message)

    @parentOrigin ?= event.origin
    context = {source: event.source, origin: event.origin}
    context.id = message.id if Object.prototype.hasOwnProperty.call(message, 'id')
    @context = context
    try
      switch message.name
        when 'prepare' then @prepare(message)
        when 'expressions' then @expressions(message)
        when 'values' then @values(message)
        when 'globals' then @globals(message)
        when 'evaluate' then @evaluate(message)
        when 'triggerDataEvent' then @triggerDataEvent(message)
        when 'finishAsyncCallback' then @finishAsyncCallback(message)
        when 'httpRequest' then @httpRequest(message, context)
    finally
      @context = null

  prepare: (message) ->
    $$runtime.form = message.form
    $$prepare()
    @setupHostFunctions()
    @respond(name: 'prepare')

  expressions: (message) ->
    $$runtime.expressions = message.expressions
    @respond(name: 'expressions')

  values: (message) ->
    $$runtime.values = message.values or {}
    $$runtime.customVariables = message.customVariables if message.customVariables
    if message.featureVariables
      for key of message.featureVariables
        $$runtime[key] = message.featureVariables[key]
    @respond(name: 'values')

  globals: (message) ->
    for key of message.globals
      $$runtime[key] = message.globals[key]
    @respond(name: 'globals')

  evaluate: ->
    results = $$evaluate()
    @respond(name: 'evaluate', results: results)

  triggerDataEvent: (message) ->
    $$runtime.event = message.event or null
    results = $$trigger()
    @respond(name: 'triggerDataEvent', results: results)

  finishAsyncCallback: (message) ->
    delete @pendingCallbacks[message.callbackID]
    $$runtime.callbackID = message.callbackID
    $$runtime.callbackArguments = message.callbackArguments or []
    results = $$finishAsync()
    @respond(name: 'finishAsyncCallback', results: results)

  respond: (message, context = @context) ->
    return unless context?
    try
      message.id = context.id if Object.prototype.hasOwnProperty.call(context, 'id')
      response = JSON.stringify(message)
    catch e
      console.log 'Error sending object', message
      return
    context.source.postMessage(response, context.origin)

  httpRequest: (message, context) ->
    delete message.options.followRedirect
    request message.options, (err, res, body) =>
      @respond({name: 'httpRequest', result: [err, res, body]}, context)

  setupHostFunctions: ->
    for name in ['httpRequest', 'messageBox', 'setTimeout', 'inference', 'loadFile', 'loadRecords', 'loadForm', 'recognizeText']
      do (name) =>
        $$runtime["$$#{name}"] = (options, callbackID) =>
          throw new Error('Host call has no authorized request context') unless @context?
          @pendingCallbacks[callbackID] = true
          @respond(name: 'hostFunction', functionName: name, argumentList: [options, callbackID])

proxy = new ExpressionEngine

if window.addEventListener
  window.addEventListener('message', proxy.onMessage.bind(proxy), false)
else
  window.attachEvent('message', (event) -> proxy.onMessage(event))
