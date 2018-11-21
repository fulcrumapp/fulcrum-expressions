import { isBoolean, isNull, isNumber, isUndefined } from "lodash"
import formatNumber, { NumberFormatOptions } from "../host/format-number"
import { MaybeString } from "../types/primitives"
import CURRENCYCODE from "./CURRENCYCODE"
import LANGUAGE from "./LANGUAGE"
import MAX from "./MAX"
import MIN from "./MIN"
import NUM from "./NUM"

/**
 * Returns a number formatted based on the current language and the styling options passed in.
 * @param value required; number to be formatted
 * @param langauge optional; languange- and country-specific string, e.g. "en-US", to indicate desired
 * language formatting. Defaults to device's current langauge setting.
 * @param options optional; formatting options hash:
 * {
 *  localeMatcher: locale string, e.g. "en_US",
 *  style: "currency" | "percent" | "decimal",
 *  currency: currency code string, e.g. "USD",
 *  minimumSignificantDigits: number,
 *  maximumSignificantDigits: number,
 *  minimumIntegerDigits: number,
 *  minimumFractionDigits?: number,
 *  maximumFractionDigits?: number,
 *  useGrouping: boolean,
 * }
 * @returns formatted number string
 * @example
 * FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency", currency: "BRL" }) // returns "R$3.333,33"
 * FORMATNUMBER(1 / 3, null, { minimumFractionDigits: 5 }) // returns "0.33333"
 */

export default function FORMATNUMBER(value: number, language: MaybeString, options: NumberFormatOptions): string
export default function FORMATNUMBER(value: number, language: MaybeString): string
export default function FORMATNUMBER(value: number): string
export default function FORMATNUMBER(value: number, language?: MaybeString, options?: NumberFormatOptions): string {
  if (isNull(value) || isUndefined(value)) { value = NUM(value) }
  if (isNull(language) || isUndefined(language)) { language = LANGUAGE() }
  if (isNull(options) || isUndefined(options)) { options = {} }

  let style: string
  if (options.style === "currency") {
    style = "currency"
  } else if (options.style === "percent") {
    style = "percent"
  } else {
    style = "decimal"
  }

  options.style = style

  if (options.style === "currency" && isUndefined(options.currency)) {
    options.currency = CURRENCYCODE()
  }

  const hasSignificantDigitsOption: boolean = isNumber(options.minimumSignificantDigits) ||
                                              isNumber(options.maximumSignificantDigits)

  if (hasSignificantDigitsOption) {
    if (isNull(options.minimumSignificantDigits) || isUndefined(options.minimumSignificantDigits)) {
      options.minimumSignificantDigits = 1
    }
    options.minimumSignificantDigits = NUM(options.minimumSignificantDigits)
    // minimumSignificantDigits cannot fall outside the range 1 - 21
    options.minimumSignificantDigits = MIN(MAX(options.minimumSignificantDigits, 1), 21)

    if (isNull(options.maximumSignificantDigits) || isUndefined(options.maximumSignificantDigits)) {
      options.maximumSignificantDigits = options.minimumSignificantDigits
    }
    options.maximumSignificantDigits = NUM(options.maximumSignificantDigits)
    // maximumSignificantDigits cannot fall outside the range 1 - 21
    options.maximumSignificantDigits = MIN(MAX(options.maximumSignificantDigits, 1), 21)
  } else {
    if (isUndefined(options.minimumIntegerDigits)) {
      options.minimumIntegerDigits = 1
    }
    options.minimumIntegerDigits = NUM(options.minimumIntegerDigits)
    // minimumIntegerDigits cannot fall outside the range 1 - 21
    options.minimumIntegerDigits = MIN(MAX(options.minimumIntegerDigits, 1), 21)

    if (isNull(options.minimumFractionDigits) || isUndefined(options.minimumFractionDigits)) {
      if (options.style === "currency") {
      options.minimumFractionDigits = 2
      } else {
      options.minimumFractionDigits = 0
      }
    }
    options.minimumFractionDigits = NUM(options.minimumFractionDigits)
    // minimumFractionDigits cannot fall outside the range 0 - 20
    options.minimumFractionDigits = MIN(MAX(options.minimumFractionDigits, 0), 20)

    if (options.style === "currency") {
      if (isNull(options.maximumFractionDigits) || isUndefined(options.maximumFractionDigits)) {
        options.maximumFractionDigits = 2
      }
    } else if (options.style === "percent") {
      if (isNull(options.maximumFractionDigits) || isUndefined(options.maximumFractionDigits)) {
        options.maximumFractionDigits = MAX(options.minimumFractionDigits, 0)
      }
    } else {
      if (isNull(options.maximumFractionDigits) || isUndefined(options.maximumFractionDigits)) {
        options.maximumFractionDigits = MAX(options.minimumFractionDigits, 3)
      }
    }

    options.maximumFractionDigits = NUM(options.maximumFractionDigits)
    // maximumFractionDigits cannot fall outside the range 0 - 20
    options.maximumFractionDigits = MIN(MAX(options.maximumFractionDigits, 0), 20)
  }

  if (!isBoolean(options.useGrouping)) {
    options.useGrouping = true
  }

  if (isUndefined(options.localeMatcher)) {
    options.localeMatcher = "lookup"
  }

  return formatNumber(value, language, options)
}
