// Expression proxy for sandbox environment
// Import the main runtime first
import "./main";

// TypeScript version of expressions-proxy.coffee
const request = require('browser-request');

interface Message {
  id?: string;
  name: string;
  [key: string]: any;
}

class ExpressionEngine {
  private source: any;
  private origin: string;
  private id: string;

  onMessage = (event: MessageEvent): void => {
    this.source = event.source;
    this.origin = event.origin;

    let message: Message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }

    this.id = message.id || '';

    const method = (this as any)[message.name];
    if (typeof method === 'function') {
      method.call(this, event, message);
    }
  };

  prepare(event: MessageEvent, message: Message): void {
    (global as any).$$runtime.form = message.form;
    (global as any).$$prepare();

    this.setupHostFunctions();

    this.respond({ name: 'prepare' });
  }

  expressions(event: MessageEvent, message: Message): void {
    (global as any).$$runtime.expressions = message.expressions;

    this.respond({ name: 'expressions' });
  }

  values(event: MessageEvent, message: Message): void {
    (global as any).$$runtime.values = message.values || {};

    if (message.customVariables) {
      (global as any).$$runtime.customVariables = message.customVariables;
    }

    if (message.featureVariables) {
      for (const key of Object.keys(message.featureVariables)) {
        (global as any).$$runtime[key] = message.featureVariables[key];
      }
    }

    this.respond({ name: 'values' });
  }

  globals(event: MessageEvent, message: Message): void {
    for (const key of Object.keys(message.globals)) {
      (global as any).$$runtime[key] = message.globals[key];
    }

    this.respond({ name: 'globals' });
  }

  evaluate(event: MessageEvent, message: Message): void {
    const results = (global as any).$$evaluate();

    this.respond({ name: 'evaluate', results });
  }

  triggerDataEvent(event: MessageEvent, message: Message): void {
    (global as any).$$runtime.event = message.event || null;

    const results = (global as any).$$trigger();

    this.respond({ name: 'triggerDataEvent', results });
  }

  finishAsyncCallback(event: MessageEvent, message: Message): void {
    (global as any).$$runtime.callbackID = message.callbackID || null;
    (global as any).$$runtime.callbackArguments = message.callbackArguments || [];

    const results = (global as any).$$finishAsync();

    this.respond({ name: 'finishAsyncCallback', results });
  }

  respond(message: any): void {
    try {
      message.id = message.id || this.id;
      const response = JSON.stringify(message);
      this.source.postMessage(response, this.origin);
    } catch (e) {
      console.log('Error sending object', message);
    }
  }

  httpRequest(event: MessageEvent, message: Message): void {
    // not supported
    delete message.options.followRedirect;

    request(message.options, (err: any, res: any, body: any) => {
      this.respond({ id: message.id, name: 'httpRequest', result: [err, res, body] });
    });
  }

  setupHostFunctions(): void {
    const runtime = (global as any).$$runtime;
    
    runtime["$$httpRequest"] = (options: any, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'httpRequest', argumentList: [options, callbackID] });
    };
    runtime["$$messageBox"] = (options: any, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'messageBox', argumentList: [options, callbackID] });
    };
    runtime["$$setTimeout"] = (delay: number, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'setTimeout', argumentList: [delay, callbackID] });
    };
    runtime["$$inference"] = (options: any, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'inference', argumentList: [options, callbackID] });
    };
    runtime["$$loadFile"] = (options: any, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'loadFile', argumentList: [options, callbackID] });
    };
    runtime["$$loadRecords"] = (options: any, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'loadRecords', argumentList: [options, callbackID] });
    };
    runtime["$$loadForm"] = (options: any, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'loadForm', argumentList: [options, callbackID] });
    };
    runtime["$$recognizeText"] = (options: any, callbackID: string) => {
      this.respond({ name: 'hostFunction', functionName: 'recognizeText', argumentList: [options, callbackID] });
    };
  }
}

const proxy = new ExpressionEngine();

if (typeof window !== 'undefined') {
  if (window.addEventListener) {
    window.addEventListener('message', proxy.onMessage.bind(proxy), false);
  } else {
    // @ts-ignore - For older browsers
    (window as any).attachEvent('message', (event: MessageEvent) => proxy.onMessage(event));
  }
}