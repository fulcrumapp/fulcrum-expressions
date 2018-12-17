import { each,
         find,
         get,
         isDate,
         isFunction,
         isNull,
         isNumber,
         isString,
         isUndefined,
         set,
         toArray,
         without,
} from "lodash"
import COALESCE from "../functions/COALESCE"
import CONFIGURE from "../functions/CONFIGURE"
import ERROR from "../functions/ERROR"
import {
  HostFormatNumber,
  HostHTTPClient,
  HostMessageBox,
  HostSetTimeout,
  HostStorageClear,
  HostStorageGetItem,
  HostStorageKey,
  HostStorageLength,
  HostStorageRemoveItem,
  HostStorageSetItem,
} from "../host"
import { EventNames } from "../types/events"
import { FormFields } from "../types/fields"
import { MaybeString } from "../types/primitives"
import {
  AlertResult,
  ConfigurationResult,
  ExpressionResult,
  InvalidResult,
  ProgressResult,
  SetValueResult,
        } from "../types/results"
import flattenElements from "../util/flatten-elements"
import valueForElement from "../util/value-for-element"
import createResult from "./calculation-result"
import formatValue from "./format-value"

interface ElementStore {
  [key: string]: FormFields
}

interface EventsStore {
  [key: string]: {
    [key: string]: Function[],
  }
}

type RuntimeResults = Array<
  AlertResult
  | ConfigurationResult
  | InvalidResult
  | SetValueResult
  | ProgressResult
  | ExpressionResult
>

const NO_PARAM = "__no_param"
const NO_NAME = "__no_name"

type RuntimeResultCalculator = () => RuntimeResults

type HostFunction =
  HostHTTPClient
  | HostSetTimeout
  | HostStorageLength
  | HostStorageKey
  | HostStorageGetItem
  | HostStorageSetItem
  | HostStorageRemoveItem
  | HostStorageClear
  | HostMessageBox
  | HostFormatNumber

interface WindowWithRuntime extends Window {
  $$runtime: Runtime
  $$evaluate: RuntimeResultCalculator
  $$trigger: RuntimeResultCalculator
  $$finishAsync: RuntimeResultCalculator
  $$prepare: () => void
}

/**
 * The Runtime class handles the state of a data event in the context of a single Record being edited.
 */
export default class Runtime {
  static defaultLocale = "en_US"
  static defaultCurrencyCode = "USD"
  static defaultCurrencySymbol = "$"
  static defaultTimeZone = "UTC"

  // Host specific runtime injections
  callbackArguments: any[] = []
  $$httpRequest?: HostHTTPClient
  $$setTimeout?: HostSetTimeout
  $$storageLength?: HostStorageLength
  $$storageKey?: HostStorageKey
  $$storageGetItem?: HostStorageGetItem
  $$storageSetItem?: HostStorageSetItem
  $$storageRemoveItem?: HostStorageRemoveItem
  $$storageClear?: HostStorageClear
  $$messageBox?: HostMessageBox
  $$formatNumber?: HostFormatNumber

  global: WindowWithRuntime

  expressions: any[] = []

  form: any = {}

  values: { [key: string]: any } = {}

  repeatable: null|string = null

  hooks = {}

  event: { name?: EventNames, field?: MaybeString } = {}

  events: {
    [key: string]: {
      [grouping: string]: Function[],
    },
  } = {}

  script: null|string = null

  customVariables: { [key: string]: any } = {}

  currentValue: any = null

  locale = Runtime.defaultLocale

  currencyCode = Runtime.defaultCurrencyCode

  currencySymbol = Runtime.defaultCurrencySymbol

  variables: { [key: string]: any } = {}

  results: RuntimeResults = []

  result: any = null

  dataNames: { [key: string]: string } = {}

  elements: FormFields[] = []

  elementsByKey: ElementStore = {}

  elementsByDataName: ElementStore = {}

  statusesByValue: { [key: string]: string } = {}

  functions: { [name: string]: Function } = {}

  featureIsNew = true

  showErrors = false

  asyncCallbacks: {
    [id: number]: Function,
  }  = {}

  callbackID: number | null = null

  asyncCount = 0

  scriptInitialized = false

  hooksInitialized = false

  isCalculation = false

  extraVariableNames = [
    "locale",
    "language",
    "timeZone",
    "decimalSeparator",
    "groupingSeparator",
    "currencySymbol",
    "currencyCode",
    "country",
    "deviceIdentifier",
    "deviceModel",
    "deviceManufacturer",
    "platform",
    "platformVersion",
    "application",
    "applicationVersion",
    "applicationBuild",
    "userEmail",
    "userRoleName",
    "recordStatus",
    "recordSystemCreatedAt",
    "recordSystemUpdatedAt",
    "recordClientCreatedAt",
    "recordClientUpdatedAt",
    "recordProject",
    "recordProjectName",
    "recordGeometry",
    "recordAltitude",
    "recordVerticalAccuracy",
    "recordHorizontalAccuracy",
    "featureCreatedAt",
    "featureUpdatedAt",
    "featureGeometry",
  ]

  specialFunctions: { [name: string]: boolean } = {
    ALERT: true,
    CURRENTLOCATION: true,
    INVALID: true,
    OFF: true,
    ON: true,
    OPENURL: true,
    PROGRESS: true,
    REQUEST: true,
    SETCHOICEFILTER: true,
    SETCHOICES: true,
    SETCONFIGURATION: true,
    SETGEOMETRY: true,
    SETLOCATION: true,
    SETSTATUS: true,
    SETSTATUSFILTER: true,
    // tslint:disable-next-line:object-literal-sort-keys
    SETPROJECT: true,
    SETDESCRIPTION: true,
    SETDISABLED: true,
    SETHIDDEN: true,
    SETLABEL: true,
    SETMAXLENGTH: true,
    SETMINLENGTH: true,
    SETREQUIRED: true,
    SETTIMEOUT: true,
    CLEARTIMEOUT: true,
    SETINTERVAL: true,
    CLEARINTERVAL: true,
    SETVALUE: true,
    SETFORMATTRIBUTES: true,
    STORAGE: true,
  }
  constructor() {
    try {
      // This is the shorthand for getting direct access to the global scope. If it does not work
      // we need to fall back to just `window`.
      this.global = Function("return this")()
    } catch (e) {
      this.global = window as WindowWithRuntime
    }

    // Wire up the global functions on initialization time.
    this.global.$$runtime     = this
    this.global.$$prepare     = this.prepare
    this.global.$$evaluate    = this.evaluate
    this.global.$$trigger     = this.trigger
    this.global.$$finishAsync = this.finishAsync

    // setup functions on intialization
    const checkCall = (name: string, func: Function, args: any[]) => {
      if (this.isCalculation && this.specialFunctions[name]) {
        ERROR(name + " cannot be used in a calculation")
      }
    }

    const exportObject = (exportName: string, ...args: any[]) => {
      const object = this.functions[exportName]

      const wrapper = () => {
        if (isFunction(this.functions[exportName])) {
          checkCall(exportName, object, args)
          return object.apply(this.functions, args)
        } else {
          return object
        }
      }

      this.functions[exportName] = object
      // @ts-ignore implicit any on Runtime
      this.global[exportName] = wrapper
    }

    for (const name of Object.keys(this.functions)) {
      exportObject(name)
    }
  }

  /**
   * This is executed by the $$HOST after completing an asycnronous action.
   *
   * @example
   * $$runtime.callbackID = 200
   * $$runtime.callbackArguments = ['Joe Smith']
   * const results = $$finishAsync()
   * results.each((result) => ...)
   */
finishAsync: RuntimeResultCalculator = () => {
    if (!this.callbackID) { return [] }

    const id = +this.callbackID
    const callback = this.asyncCallbacks[id]

    delete this.asyncCallbacks[id]

    this.resetResults()

    this.isCalculation = false

    callback.apply(this, this.callbackArguments)

    return this.results
  }

  /**
   * This is executed by the $$HOST when initializing a new session.
   *
   * @example
   * $$runtime.form = { ...formSchema }
   * if (form.script) $$runtime.script = form.script
   * $$prepare()
   */
prepare = () => {
    each(get(this.form, "status_field.choices", []), (choice) => {
      this.statusesByValue[choice.value] = choice.label
    })

    this.elements = flattenElements(this.form.elements)

    each(this.elements, (element) => {
      this.elementsByKey[element.key] = element
      this.elementsByDataName[element.data_name] = element
      this.dataNames[element.key] = element.data_name
    })
  }

  /**
   * Clear the values so that the references from the `with` statements remain
   * on the same root object. If we create a new `variables` it won't stay the same
   * across executions. This is so the $field variables work in the form-level scripts.
   */
clearValues = (): void => {
    for (const prop of Object.keys(this.variables)) {
      delete this.variables[prop]
    }
  }

/**
 * Used to reset values when a form value changes and $$evaluate is called.
 */

setupValues = (): void => {
    this.clearValues()

    for (const key of Object.keys(this.dataNames)) {
      this.variables[`$${this.dataNames[key]}`] = undefined
    }

    for (const key of Object.keys(this.values)) {
      const value = this.values[key]

      const elementByKey = this.elementsByKey[key]
      const dataName = this.dataNames[key]

      if (!isUndefined(elementByKey) && !isUndefined(dataName)) {
        this.variables[`$${dataName}`] = valueForElement(elementByKey, value)
      }
    }

    for (const name of this.extraVariableNames) {
      // @ts-ignore
      this.variables[`$$${name}`] = this[name]
    }

    for (const name of Object.keys(this.customVariables)) {
      this.variables[`${name}`] = this.customVariables[name]
    }

    // overwrites configuration to be runtime global attributes
    // BUG jirles: converted from CONFIGURE(@, false) in coffeescript
    CONFIGURE(this, false)

    this.initializeScriptIfNecessary()
  }

  /**
   * Initialize a script during setupValues call if it is needed.
   */

  initializeScriptIfNecessary = (): undefined => {
    if (this.scriptInitialized) { return }

    this.scriptInitialized = true

    if (!isString(this.script)) { return }
    // BUG jirles: lines before return replaces
    //             with (this.variables) { eval(this.script) } as `with` is deprecated
    //             this may be unnecessary depending on how with was used
    for (const prop of Object.keys(this.variables)) {
      // @ts-ignore Runtime implicitly has `any` type
      this[prop] = this.variables[prop]
    }
    // TODO jirles: `eval()` is not recommended as it can potentially run malicious code.
    //              Consider changing implementations to Function(this.script)()
    //              To do this we'd need to change the mobile scripts to refer to runtime as
    //              $$runtime, not this as is the current case
    // tslint:disable-next-line:no-eval
    eval(this.script)

    return
  }

  // TODO jirles:
  // Evaluate whether or not these hook helper functions are necessary given the new addHook setup.
  // Need to see if anything in $$HOST interacts with the runtime events object and depends on the 'hook_' key pattern.
  //
  // /**
  //  * Creates a hook name formatted to read `hook_name`
  //  * @param name required; name for hook
  //  * @returns string: `hook_name`
  //  */
  // hookName = (name: EventNames|MaybeString): string|null => {
  //   if (!name) { return null }

  //   return "hook_" + name
  // }

  // /**
  //  * Find hooks by name from the events object. If no hooks are available with the given name,
  //  * an empty array is returned.
  //  * @param name required; hook name one is looking for
  //  * @returns object: { [grouping: string]: Function[] } || array: []
  //  */
  // hooksByName = (name: EventNames): { [grouping: string]: Function[] }|[] => {
  //   const hookName = this.hookName(name)
  //   if (!isNull(hookName) && !isUndefined(this.events[hookName])) {
  //     return this.events[hookName]
  //   } else {
  //     return []
  //   }
  // }

  // /**
  //  * Returns an array of functions from the Events table given filtered by event type and field.
  //  * @param name event to hook in to
  //  * @param param field to bind to
  //  * @returns an array of functions
  //  */
  // hooksByParams =  (name: EventNames, param: MaybeString): Function[]|[] => {
  //   const hookName: { [grouping: string]: Function[] }|[] = this.hooksByName(name)
  //   const groupingName: string|null = this.hookName(param)

  //   // @ts-ignore if condition checks if hookName has index signature or not so bracket notation works here
  //   if (!isNull(groupingName) && hookName !== [] && !isUndefined(hookName[groupingName])) {
  //     // @ts-ignore if condition implicitly checks that hookName has index signature so bracket notation works here
  //     return hookName[groupingName]
  //   } else {
  //     return []
  //   }
  // }

  /**
   * Executed by the $$HOST when a form value changes.
   *
   * @example
   * $$runtime.values = { ...formValues }
   * const results = $$evaluate()
   * results.each((result) => ...)
   */
evaluate: RuntimeResultCalculator = () => {
    this.resetResults()

    this.setupValues()

    this.isCalculation = true

    for (const context of this.expressions) {
     this.results.push(this.evaluateExpression(context))
    }

    return this.results
  }
/**
 * Evaluates an expression and returns an ExpressionResult.
 * @param context required; object that contains a field's dataName, key, and an expression
 * @returns ExpressionResult: { type: 'calculation', key: string, error?: string, value: any }
 */
evaluateExpression = (context: any): ExpressionResult => {
    const thisVariableName = `$${context.dataName}`

    try {
      this.showErrors = false

      this.variables.$$current = this.currentValue = this.variables[thisVariableName]

      let stringValue
      let rawValue
      this.result = undefined

      if (!isUndefined(context.expression) && context.expression.length > 0) {
        // BUG jirles: originally was `with (variables) { evalResult = eval(context.expression) }`
        //              `with` statements are forbidden as of ES5, but in the above line it would have bumped
        //              variables to the top of the scope chain so the bug may just be a performance issues
        //              as this.variables is still accessible from here

        // TODO jirles: `eval()` is not recommended as it can potentially run malicious code.
        //              Consider changing implementations to Function(context.expression)()
        //              To do this we'd need to change the mobile scripts to refer to runtime as
        //              `$$runtime`, not `this` as is the current case
        // tslint:disable-next-line:no-eval
        const evalResult = eval(context.expression)
        // BUG jirles: COALESCE is a little more strenuous a check than the original coalesce
        //             used in the coffeescript version of data-events. OG coalesce only checked
        //             that things were not undefined, COALESCE disregards null, {}, [], and '' as well
        rawValue = COALESCE(this.result, evalResult)

        stringValue = formatValue(rawValue)

        this.variables[thisVariableName] =  isNumber(rawValue) || isDate(rawValue) ? rawValue : stringValue
      }

      return createResult(context.key, rawValue, stringValue, null, this.showErrors)
    } catch (ex) {
      // tslint:disable-next-line:no-console
      console.log(`JS ERROR : ${context.dataName} : ${ex.toString()}`)

      this.variables[thisVariableName] = undefined

      return createResult(context.key, null, null, ex.toString(), true)
    }
  }

  // BUG jirles: duplicate coalesce
  //
  // coalesce = (...args: any[]) => {
  //     return find(toArray(args), (arg: any) => !isUndefined(arg))
  //   }

  /**
   * Executed by the $$HOST when a form level event has occurred.
   *
   * @example
   * $$runtime.values = { ...formValues }
   * $$runtime.event = 'CHANGE'
   * const results = $$trigger()
   * results.each((result) => ...)
   */
trigger: RuntimeResultCalculator = () => {
    this.resetResults()

    this.setupValues()

    const name: EventNames|string = isUndefined(this.event.name) || isNull(this.event.name) ? NO_NAME : this.event.name

    const param: string = isUndefined(this.event.field) || isNull(this.event.field) ? NO_PARAM : this.event.field

    let hooks
    if (param === NO_PARAM) {
      hooks = get(this.events, [name])
    } else {
      hooks = get(this.events, [name, param])
    }

    if (isUndefined(hooks) || hooks.length === 0) {
      return this.results
    } else {
      this.isCalculation = false
      for (const hook of hooks) {
        if (isFunction(hook)) {
          hook.call(this, this.event)
        }
      }
      return this.results
    }
  }

  /**
   * Dispatch a function to execute asyncronously on the $$HOST
   * @param func host function to invoke
   * @param args arguments to pass to the $$HOST function
   * @param callback callback to execute after the $$HOST has completed it's async operation
   */
invokeAsync(func: HostFunction, args: any[], callback: Function) {
    const id = ++this.asyncCount
    this.asyncCallbacks[id] = callback
    func.apply(this, args.concat([id]))
  }

  /**
   * Add a hook to the Events table.
   * @param name event to hook in to
   * @param param field to bind to
   * @param callback callback to execute
   */
addHook(name: EventNames, param: MaybeString, callback: Function) {
    const path = this.pathFor(name, param)
    const callbacks = get(this.events, path, [])
    this.events = set(this.events, path, callbacks.concat([ callback ]))
  }

  /**
   * Remove the hook from the Events table.
   * @param name event to hook in to
   * @param param field to bind to
   * @param callback callback to execute
   */
removeHook(name: EventNames, param: MaybeString, callback ?: Function) {
    const path = this.pathFor(name, param)

    if (callback) {
      const callbacks = without(get(this.events, path), callback)
      this.events = set(this.events, path, callbacks)
    } else {
      this.events = set(this.events, path, [])
    }
  }

  private pathFor(name: EventNames, param: MaybeString) {
    return [name, param || NO_PARAM]
  }

  private resetResults() {
    // When the global script runs, start with the results that were captured in that tick
    // This lets function calls at global scope eventually take effect the first time an event
    // is triggered (load-record).
    this.results = this.hooksInitialized ? [] : this.results
    this.hooksInitialized = true
  }
}
