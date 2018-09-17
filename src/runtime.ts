import { without, get, set } from "lodash"
import * as functions from "./functions"
import { FormField, } from "./fields";
import { EventNames, EventBinder } from "./events";
import { MaybeString } from "./primitives";

interface AlertResult {
  type: "message"
  title?: string
  message?: string
}

interface ElementStore {
  [key: string]: FormField
}

interface EventsStore {
  [key: string]: {
    [key: string]: Function[],
  }
}

type ResultsCollection = (
  AlertResult
)[]

interface RuntimeInterface {
  results: ResultsCollection
  elementsByKey: ElementStore
  elementsByDataName: ElementStore
  callbackArguments?: any[] | null
}

const NO_PARAM = "__no_param"

/**
 * The Runtime class handles the state of a data event in the context of a single Record being edited.
 */
export default class Runtime implements RuntimeInterface {
  static defaultLocale = 'en_US'
  static defaultCurrencyCode = 'USD'
  static defaultCurrencySymbol = '$'
  static defaultTimeZone = 'UTC'

  global = null

  expressions = []

  form = {}

  values = {}

  repeatable = null

  hooks = {}

  event = {}

  events : {
    [key: string]: {
      [grouping: string]: Function[]
    }
  } = {}

  callbackArguments = null

  script = null

  customVariables = {}

  locale = Runtime.defaultLocale

  currencyCode = Runtime.defaultCurrencyCode

  currencySymbol = Runtime.defaultCurrencySymbol

  variables = {}

  results = []

  dataNames = {}

  elements = []

  elementsByKey = {}

  elementsByDataName : ElementStore = {}

  statusesByValue : ElementStore = {}

  featureIsNew = true

  showErrors = false

  asyncCallbacks : {
    [id: number]: Function
  }  = {}

  callbackID : number | null = null

  asyncCount = 0

  scriptInitialized = false

  hooksInitialized = false

  isCalculation = false

  extraVariableNames = [
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

  invokeAsync(func: Function, args: any[], callback: Function) {
    const id = ++this.asyncCount
    this.asyncCallbacks[id] = callback
    func.apply(this, args.concat([id]))
  }

  finishAsync() {
    if (!this.callbackID) return

    const id = +this.callbackID
    const callback = this.asyncCallbacks[id]

    delete this.asyncCallbacks[id]

    // this.resetResults()

    this.isCalculation = false

    callback.apply(this, this.callbackArguments)
  }

  addHook(name: EventNames, param: MaybeString, callback: Function) {
    const path = this.pathFor(name, param)
    const callbacks = get(this.events, path) || []
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
