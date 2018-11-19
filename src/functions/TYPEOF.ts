import {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNaN,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isUndefined,
} from "lodash"

/**
 * Returns a string describing the type of argument passed in.
 * @param value required; value to be evaluated
 * @returns a string indiciating the type of argument passed in
 * @example
 * TYPEOF("test") // "string"
 * TYPEOF(true) // "boolean"
 * TYPEOF(NaN) // "nan"
 */

export default function TYPEOF(value: any): string {
  switch (true) {
    case isUndefined(value):
      return "undefined"
    case isNull(value):
      return "null"
    case isNaN(value):
      return "nan"
    case isNumber(value):
      return "number"
    case isString(value):
      return "string"
    case isBoolean(value):
      return "boolean"
    case isDate(value):
      return "date"
    case isArray(value):
      return "array"
    case isRegExp(value):
      return "regexp"
    case isFunction(value):
      return "function"
    case isObject(value):
      return "object"
    default:
      return"unknown"
  }
}
