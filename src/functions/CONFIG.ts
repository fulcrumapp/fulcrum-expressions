interface Config {
  recordAltitude?: any,
  application?: string,
  applicationBuild?: string,
  applicationInfo?: string,
  applicationVersion?: string,
  locale: string,
  language: string,
  country: string,
  currencyCode: string,
  currencySymbol: string,
  timeZone: string,
  decimalSeparator: string,
  groupingSeparator: string,
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
