request = require('browser-request')

class ExpressionEngine
  onMessage: (event) =>
    @source = event.source
    @origin = event.origin

    try
      message = JSON.parse(event.data)
    catch
      return

    @id = message.id

    @[message.name](event, message)

  prepare: (event, message) ->
    $$runtime.form = message.form
    $$runtime.script = message.form.script
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

proxy = new ExpressionEngine

if window.addEventListener
  window.addEventListener('message', proxy.onMessage.bind(proxy), false)
else
  window.attachEvent('message', (event) -> proxy.onMessage(event))
