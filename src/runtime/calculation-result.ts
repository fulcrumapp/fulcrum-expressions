import {
  isArray,
  isDate,
  isFunction,
  isNaN,
  isObject,
  isUndefined,
} from "lodash"
import { MaybeString } from "../types/primitives"

export interface ExpressionResult {
  type: "calculation",
  key: string,
  error?: MaybeString,
  value: MaybeString
}

/**
 * Generate a Results object for a given expression.
 * @param key the form key of the expression field
 * @param rawValue the raw processed result
 * @param value the stringified version of the result
 * @param error errors generated
 * @param showErrors show errors as the value or not
 */
export default function(key: string,
                        rawValue: any,
                        value: MaybeString,
                        error: any,
                        showErrors: boolean): ExpressionResult {
  if (showErrors) {
    if (error) {
      error = error.toString()
    } else if (isUndefined(rawValue)) {
      error = "[Undefined]"
    } else if (isNaN(rawValue)) {
      error = "[Not a Number]"
    } else if (isFunction(rawValue)) {
      error = "[Function]"
    } else if (isArray(rawValue)) {
      error = "[Array]"
    } else if (isDate(rawValue)) {
      error = null
    } else if (isObject(rawValue)) {
      error = "[Object]"
    }
  } else {
    error = null
  }

  return { type: "calculation", key, error, value }
}
