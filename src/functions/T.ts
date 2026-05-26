import { isNull, isUndefined } from "lodash"

/**
 * Stringifies the value passed in
 * @param value (Any, required): value to be converted to a string
 * @returns string value
 * @example
 * T(true) // returns "true"
 */

export default function T(value: any): string {
  if (isNull(value) || isUndefined(value)) { return "" }
  return value.toString()
}
