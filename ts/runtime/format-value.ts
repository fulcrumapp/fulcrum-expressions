import {
  isArray,
  isDate,
  isFunction,
  isNaN,
  isNull,
  isObject,
  isUndefined,
  some,
} from "lodash"

import { isRegExp } from "util"
import RIGHT from "../functions/RIGHT"

const nullish = (value: any) => some([
  isUndefined,
  isNull,
  isNaN,
  isFunction,
].map((fn) => fn(value)))

const formatMachineDate = (date: Date) => {
  const year = RIGHT("000" + date.getFullYear(), 4)
  const month = RIGHT("0" + (date.getMonth() + 1), 2)
  const day = RIGHT("0" + date.getDate(), 2)
  return `${year}-${month}-${day}`
}

/**
 * Generate a human readable format for use in the data events/expression fields.
 * @param value the value to format
 */
export default function formatValue(value?: any): string | null {
  if (nullish(value)) {
    return null
  } else if (isDate(value)) {
    return formatMachineDate(value)
  } else if (isArray(value)) {
    return value.map(formatValue).join(", ")
  } else if (isRegExp(value)) {
    return value.toString()
  } else {
    return value
  }
}
