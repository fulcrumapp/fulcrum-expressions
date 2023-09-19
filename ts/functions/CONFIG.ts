import { Geometry } from "../types/geojson"
export interface Config {
  /** Optional: Set to record's altitude */
  recordAltitude?: any,
  /** Optional: Set to name of application on which Fulcrum is running */
  application?: string,
  /** Optional: Set to name of application engine on which Fulcrum is running */
  applicationBuild?: string,
  /** Optional: Includes name, version, and engine of application on which Fulcrum is running */
  applicationInfo?: string,
  /** Optional: Set to version of application on which Fulcrum is running */
  applicationVersion?: string,
  /** Required: sets program locale - defaults to 'en_US' */
  locale: string,
  /** Required: sets locale-specific language - defaults to 'en-US' */
  language: string,
  /** Required: sets locale-specific country - defaults to 'US' */
  country: string,
  /** Required: sets locale-specific currency code - defaults to 'USD' */
  currencyCode: string,
  /** Required: sets locale-specific currency Symbol - defaults to '$' */
  currencySymbol: string,
  /** Required: sets locale-specific timezone - defaults to 'UTC' */
  timeZone: string,
  /** Required: sets locale-specific symbol to delineate fractions - defaults to '.' */
  decimalSeparator: string,
  /** Required: sets locale-specific symbol to group large numbers - defaults to ',' */
  groupingSeparator: string,
  /** Required: sets locale-specific increment with which to group large numbers - defaults to 3 (thousands) */
  groupingSize: number,
  /** Optional:  Set to the current device model or "" */
  deviceModel?: string,
  /** Optional: Set to current device manufacter or "" */
  deviceManufacturer?: string,
  /** Optional: Set to current user's email */
  userEmail?: string,
  /** Optional: Set to current user's role */
  userRoleName?: string,
  /** Optional: Indicates where the current feature is new */
  featureIsNew?: boolean,
  /** Optional: Object containing feature geometry */
  featureGeometry?: Geometry,
  /** Optional: current platform name */
  platform?: string,
  /** Optional: Current platform version */
  platformVersion?: string,
  /** Optional: Current project id */
  recordProject?: string,
  /** Optional: Current record status */
  recordStatus? : string,
  /** Optional: Current project name */
  recordProjectName?: string,
  /** Optional: Current record's id */
  recordID?: string,
  /** Optional: Current repeatables's id */
  featureID?: string,
  /** Optional: Current repeatable field's index */
  featureIndex?: number,
  /** Optional: Current user's full name */
  userFullName?: string,
}

export const DEFAULTS = {
  country: "US",
  currencyCode: "USD",
  currencySymbol: "$",
  decimalSeparator: ".",
  groupingSeparator: ",",
  groupingSize: 3,
  language: "en-US",
  locale: "en_US",
  timeZone: "UTC",
}

let Config: Config

/**
 * The current configuration of the Form.
 */
export const CONFIG = () => Config

/**
 * Resets the config to the application defaults.
 */
export const RESETCONFIG = () => {
  Config = { ...DEFAULTS }
}

/**
 * Overwrites the current configuration of the Form to be the object passed in.
 * This method is destructive and should be private; use CONFIGURE to update configuration.
 * @param config object to replace configuration of Form
 */
export const OVERWRITECONFIG = (config: any): any => {
  Config = config
  return Config
}
