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

type ResultsCollection = (
  AlertResult
)[]

interface RuntimeInterface {
  results: ResultsCollection
  elementsByKey: ElementStore
  elementsByDataName: ElementStore
  addHook: EventBinder
  removeHook: EventBinder
}

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

  events = {
    on: {},
    change: {},
    click: {}
  }

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

  elementsByDataName: ElementStore = {}

  statusesByValue: ElementStore = {}

  featureIsNew = true

  showErrors = false

  asyncCallbacks = {}

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

  addHook(name: EventNames, ...args: any[]) {

  }

  removeHook(name: EventNames, ...args: any[]) {

  }
}
