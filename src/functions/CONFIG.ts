interface Config {
  recordAltitude?: any,
  application?: string,
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

export const CONFIG = () => Config

export const RESETCONFIG = () => {
  Config = { ...DEFAULTS }
}
