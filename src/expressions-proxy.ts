// @ts-ignore - browser-request types may not be available
const request = require('browser-request')

interface Message {
  id?: string
  name: string
  [key: string]: any
}

interface RuntimeGlobal {
  $$runtime: any
  $$prepare: () => void
  $$evaluate: () => any[]
  $$trigger: () => any[]
  $$finishAsync: () => any[]
}

class ExpressionEngine {
  private source: any
  private origin: string
  private id: string

  onMessage = (event: MessageEvent): void => {
    this.source = event.source
    this.origin = event.origin

    let message: Message
    try {
      message = JSON.parse(event.data)
    } catch {
      return
    }

    this.id = message.id || ''

    const method = (this as any)[message.name]
    if (typeof method === 'function') {
      method.call(this, event, message)
    }
  }

  prepare(event: MessageEvent, message: Message): void {
    global.$$runtime.form = message.form
    global.$$prepare()

    this.setupHostFunctions()

    this.respond({ name: 'prepare' })
  }

  expressions(event: MessageEvent, message: Message): void {
    global.$$runtime.expressions = message.expressions

    this.respond({ name: 'expressions' })
  }

  values(event: MessageEvent, message: Message): void {
    global.$$runtime.values = message.values || {}

    if (message.customVariables) {
      global.$$runtime.customVariables = message.customVariables
    }

    if (message.featureVariables) {
      for (const key of Object.keys(message.featureVariables)) {
        global.$$runtime[key] = message.featureVariables[key]
      }
    }

    this.respond({ name: 'values' })
  }

  globals(event: MessageEvent, message: Message): void {
    for (const key of Object.keys(message.globals)) {
      global.$$runtime[key] = message.globals[key]
    }

    this.respond({ name: 'globals' })
  }

  evaluate(event: MessageEvent, message: Message): void {
    const results = global.$$evaluate()

    this.respond({ name: 'evaluate', results })
  }

  triggerDataEvent(event: MessageEvent, message: Message): void {
    global.$$runtime.event = message.event || null

    const results = global.$$trigger()

    this.respond({ name: 'triggerDataEvent', results })
  }

  finishAsyncCallback(event: MessageEvent, message: Message): void {
    global.$$runtime.callbackID = message.callbackID || null
    global.$$runtime.callbackArguments = message.callbackArguments || []

    const results = global.$$finishAsync()

    this.respond({ name: 'finishAsyncCallback', results })
  }

  respond(message: any): void {
    try {
      message.id = message.id || this.id
      const response = JSON.stringify(message)
      this.source.postMessage(response, this.origin)
    } catch (e) {
      console.log('Error sending object', message)
    }
  }

  httpRequest(event: MessageEvent, message: Message): void {
    // not supported
    delete message.options.followRedirect

    request(message.options, (err: any, res: any, body: any) => {
      this.respond({ id: message.id, name: 'httpRequest', result: [err, res, body] })
    })
  }

  setupHostFunctions(): void {
    (global as any).$$runtime["$$httpRequest"] = (options: any, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'httpRequest', argumentList: [options, callbackID] })
    }
    ;(global as any).$$runtime["$$messageBox"] = (options: any, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'messageBox', argumentList: [options, callbackID] })
    }
    ;(global as any).$$runtime["$$setTimeout"] = (delay: number, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'setTimeout', argumentList: [delay, callbackID] })
    }
    ;(global as any).$$runtime["$$inference"] = (options: any, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'inference', argumentList: [options, callbackID] })
    }
    ;(global as any).$$runtime["$$loadFile"] = (options: any, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'loadFile', argumentList: [options, callbackID] })
    }
    ;(global as any).$$runtime["$$loadRecords"] = (options: any, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'loadRecords', argumentList: [options, callbackID] })
    }
    ;(global as any).$$runtime["$$loadForm"] = (options: any, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'loadForm', argumentList: [options, callbackID] })
    }
    ;(global as any).$$runtime["$$recognizeText"] = (options: any, callbackID: number) => {
      this.respond({ name: 'hostFunction', functionName: 'recognizeText', argumentList: [options, callbackID] })
    }
  }
}

const proxy = new ExpressionEngine()

if (typeof window !== 'undefined') {
  if (window.addEventListener) {
    window.addEventListener('message', proxy.onMessage.bind(proxy), false)
  } else {
    // @ts-ignore - For older browsers
    window.attachEvent('message', (event: MessageEvent) => proxy.onMessage(event))
  }
}