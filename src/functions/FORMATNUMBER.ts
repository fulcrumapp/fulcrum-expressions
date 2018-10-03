import { isBoolean, isNull, isNumber, isUndefined } from "lodash"
import formatNumber, { NumberFormatOptions } from "../host/format-number"
import { MaybeString } from "../types/primitives"
import CURRENCYCODE from "./CURRENCYCODE"
import LANGUAGE from "./LANGUAGE"
import MAX from "./MAX"
import MIN from "./MIN"
import NUM from "./NUM"

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

  if (options.style === "currency") {
    options.currency = CURRENCYCODE()
  }

  const hasSignificantDigitsOption: boolean = isNumber(options.minimumSignificantDigits) ||
                                              isNumber(options.maximumSignificantDigits)

  if (hasSignificantDigitsOption) {
    if (isNull(options.minimumSignificantDigits) || isUndefined(options.minimumSignificantDigits)) {
      options.minimumSignificantDigits = 1
    }
    options.minimumSignificantDigits = NUM(options.minimumSignificantDigits)
    options.minimumSignificantDigits = MIN(MAX(options.minimumSignificantDigits, 1), 21)

    if (isNull(options.maximumSignificantDigits) || isUndefined(options.maximumSignificantDigits)) {
      options.maximumSignificantDigits = options.minimumSignificantDigits
    }
    options.maximumSignificantDigits = NUM(options.maximumSignificantDigits)
    options.maximumSignificantDigits = MIN(MAX(options.maximumSignificantDigits, 1), 21)
  } else {
    if (isNull(options.minimumIntegerDigits) || isUndefined(options.minimumIntegerDigits)) {
      options.minimumIntegerDigits = 1
    }
    options.minimumIntegerDigits = NUM(options.minimumIntegerDigits)
    options.minimumIntegerDigits = MIN(MAX(options.minimumIntegerDigits, 1), 21)

    if (isNull(options.minimumFractionDigits) || isUndefined(options.minimumFractionDigits)) {
      if (options.style === "currency") {
      options.minimumIntegerDigits = 2
      } else {
      options.minimumIntegerDigits = 0
      }
    }
    options.minimumFractionDigits = NUM(options.minimumFractionDigits)
    options.minimumFractionDigits = MIN(MAX(options.minimumFractionDigits, 0), 20)

    if (options.style === "currency") {
      if (isNull(options.maximumFractionDigits) || isUndefined(options.maximumFractionDigits)) {
        options.maximumFractionDigits = 2
      }
    } else if (options.style === "percent") {
      if (isNull(options.maximumFractionDigits) || isUndefined(options.maximumFractionDigits)) {
        MAX(options.minimumFractionDigits, 0)
      }
    } else {
      if (isNull(options.maximumFractionDigits) || isUndefined(options.maximumFractionDigits)) {
        MAX(options.minimumFractionDigits, 3)
      }
    }

    options.maximumFractionDigits = NUM(options.maximumFractionDigits)
    options.maximumFractionDigits = MIN(MAX(options.maximumFractionDigits, 0), 20)
  }

  if (!isBoolean(options.useGrouping)) {
    options.useGrouping = true
  }

  return formatNumber(value, language, options)
}
