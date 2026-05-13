import { isNumber } from "lodash"
import NUM from "./NUM"
import ISNAN from "./ISNAN"
import CURRENCYCODE from "./CURRENCYCODE"
import LANGUAGE from "./LANGUAGE"
import FORMATNUMBER from "./FORMATNUMBER"

/**
 * Formats a number as currency.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/dollar/
 * @param value (Number, required): number value to format
 * @param decimals (Number, optional): number of decimal places, defaults to 2
 * @param currency (String, optional): currency code, defaults to app currency
 * @param language (String, optional): language code, defaults to app language
 * @returns formatted currency string
 */
export default function DOLLAR(value: any, decimals: number = 2, currency?: string | null, language?: string | null): any {
  decimals = NUM(decimals)
  if (isNaN(decimals)) decimals = 2

  value = NUM(value)

  if (!isNumber(value)) return undefined

  if (!currency) currency = CURRENCYCODE()
  if (!language) language = LANGUAGE()

  const options = {
    style: "currency" as const,
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }

  return FORMATNUMBER(value, language, options)
}
