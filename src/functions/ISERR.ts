import { isNaN, isNull, isUndefined } from "lodash"
/**
 * Checks if a value is an instance of an Error or has no value
 * @param value required; item to be checked
 * @returns boolean
 * @example
 * const badField = FIELD('does_not_exist') // = undefined
 * ISERR(badField) // returns true
 */

export default function ISERR(value: any): boolean {
  if (isNaN(value) || isUndefined(value) || isNull(value)) { return true }

  if (value instanceof Error) { return true }

  return false
}
