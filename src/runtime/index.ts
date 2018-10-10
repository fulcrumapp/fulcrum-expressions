import { each, get, set, without } from "lodash"
import { AlertResult } from "../functions/ALERT"
import { InvalidResult} from "../functions/INVALID"
import { ConfigurationResult } from "../functions/SETCONFIGURATION"
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
import flattenElements from "../util/flatten-elements"

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
>

const NO_PARAM = "__no_param"

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

  expressions = []

  form: any = {}

  values = {}

  repeatable = null

  hooks = {}

  event = {}

  events: {
    [key: string]: {
      [grouping: string]: Function[],
    },
  } = {}

  script = null

  customVariables = {}

  locale = Runtime.defaultLocale

  currencyCode = Runtime.defaultCurrencyCode

  currencySymbol = Runtime.defaultCurrencySymbol

  variables = {}

  results: RuntimeResults = []

  dataNames: { [key: string]: string } = {}

  elements: FormFields[] = []

  elementsByKey: ElementStore = {}

  elementsByDataName: ElementStore = {}

  statusesByValue: { [key: string]: string } = {}

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
   * Executed by the $$HOST when a form value changes.
   *
   * @example
   * $$runtime.values = { ...formValues }
   * const results = $$evaluate()
   * results.each((result) => ...)
   */
  evaluate: RuntimeResultCalculator = () => {
    return this.results
  }

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
    return this.results
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
  removeHook(name: EventNames, param: MaybeString, callback?: Function) {
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
