import { get, set, without } from "lodash"
import { EventNames } from "./events"
import { FormFields } from "./fields"
import { AlertResult } from "./functions/ALERT"
import { ConfigurationResult } from "./functions/SETCONFIGURATION"
import {
  HostHTTPClient,
  HostSetTimeout,
  HostStorageClear,
  HostStorageGetItem,
  HostStorageKey,
  HostStorageLength,
  HostStorageRemoveItem,
  HostStorageSetItem } from "./host"
import { MaybeString } from "./primitives"

interface ElementStore {
  [key: string]: FormFields
}

interface EventsStore {
  [key: string]: {
    [key: string]: Function[],
  }
}

type ResultsCollection = Array<
  AlertResult |
  ConfigurationResult
>

interface RuntimeInterface {
  results: ResultsCollection
  elementsByKey: ElementStore
  elementsByDataName: ElementStore
}

const NO_PARAM = "__no_param"

/**
 * The Runtime class handles the state of a data event in the context of a single Record being edited.
 */
export default class Runtime implements RuntimeInterface {
  static defaultLocale = "en_US"
  static defaultCurrencyCode = "USD"
  static defaultCurrencySymbol = "$"
  static defaultTimeZone = "UTC"

  // Host specific runtime injections
  callbackArguments?: any[]
  $$httpRequest?: HostHTTPClient
  $$setTimeout?: HostSetTimeout
  $$storageLength?: HostStorageLength
  $$storageKey?: HostStorageKey
  $$storageGetItem?: HostStorageGetItem
  $$storageSetItem?: HostStorageSetItem
  $$storageRemoveItem?: HostStorageRemoveItem
  $$storageClear?: HostStorageClear

  global = null

  expressions = []

  form = {}

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

  results: ResultsCollection = []

  dataNames = {}

  elements = []

  elementsByKey = {}

  elementsByDataName: ElementStore = {}

  statusesByValue: ElementStore = {}

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

  invokeAsync(func: Function, args: any[], callback: Function) {
    const id = ++this.asyncCount
    this.asyncCallbacks[id] = callback
    func.apply(this, args.concat([id]))
  }

  finishAsync() {
    if (!this.callbackID) { return }

    const id = +this.callbackID
    const callback = this.asyncCallbacks[id]

    delete this.asyncCallbacks[id]

    // this.resetResults()

    this.isCalculation = false

    callback.apply(this, this.callbackArguments)
  }

  addHook(name: EventNames, param: MaybeString, callback: Function) {
    const path = this.pathFor(name, param)
    const callbacks = get(this.events, path, [])
    this.events = set(this.events, path, callbacks.concat([ callback ]))
  }

  removeHook(name: EventNames, param: MaybeString, callback: Function) {
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
}
