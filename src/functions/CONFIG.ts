export interface Config {
  /** Set to record's altitude */
  recordAltitude?: any,
  /** Set to name of application on which Fulcrum is running */
  application?: string,
  /** Set to name of application engine on which Fulcrum is running */
  applicationBuild?: string,
  /** Includes name, version, and engine of application on which Fulcrum is running */
  applicationInfo?: string,
  /** Set to version of application on which Fulcrum is running */
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
}

const DEFAULTS = {
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
