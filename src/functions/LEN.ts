import { isArray,
          isDate,
          isNaN,
          isNull,
          isObject,
          isRegExp,
          isString,
          isUndefined } from "lodash"

/**
 * Returns the length of a value as a string or an array-like object.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/len/
 * @param value (Any, required): item to be measured
 * @returns number
 * @example
 * LEN("test") // returns 4
 */

export default function LEN(value: any): number {
  if (isUndefined(value) || isNull(value) || isNaN(value)) { return 0 }

  let result: any

  if (isArray(value) || isString(value)) {
    result = value.length
  } else if (isDate(value)) {
    result = value.toString().length
  } else if (isRegExp(value)) {
    result = value.toString().length
  } else if (isObject(value)) {
    result = Object.keys(value).length
  } else {
    result = value.toString().length
  }

  return result || 0
}
