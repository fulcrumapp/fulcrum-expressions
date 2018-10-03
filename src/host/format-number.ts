import { isUndefined } from "lodash"
/**
 * options hash to determine number formatting
 */
export interface NumberFormatOptions {
  style?: string|undefined,
  currency?: string|undefined,
  minimumSignificantDigits?: number|undefined,
  maximumSignificantDigits?: number|undefined,
  minimumIntegerDigits?: number|undefined,
  minimumFractionDigits?: number|undefined,
  maximumFractionDigits?: number|undefined,
  useGrouping?: boolean|undefined,
}

/**
 * Sends value, locale, and options hash to host for formatting.
 * @param value number value to be formatted
 * @param locale locale string
 * @param options hash of formatting options
 * @returns formatted string value
 */
export default function formatNumber(value: number, locale: string, options: NumberFormatOptions): string {
  if (!isUndefined($$runtime.$$formatNumber)) {
    return $$runtime.$$formatNumber(value, locale, options)
  } else if (typeof(Intl) !== undefined ) {
    const nf = new Intl.NumberFormat(locale, options)
    return nf.format(value)
  } else {
    return "" + value
  }
}
