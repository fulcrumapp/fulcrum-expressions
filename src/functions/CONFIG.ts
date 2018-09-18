interface Config {
  /** Set to record's altitude */
  recordAltitude?: any,
  /** Set to application name */
  application?: string,
  applicationBuild?: string,
  applicationInfo?: string,
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
  locale: 'en_US',
  language: 'en-US',
  country: 'US',
  currencyCode: 'USD',
  currencySymbol: '$',
  timeZone: 'UTC',
  decimalSeparator: '.',
  groupingSeparator: ',',
  groupingSize: 3,
}

let Config: Config

export const CONFIG = () => Config

export const RESETCONFIG = () => {
  Config = { ...DEFAULTS }
}
