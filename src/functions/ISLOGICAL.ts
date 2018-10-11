import { isBoolean } from "lodash"

/**
 * Checks for a boolean value
 * @param value required; value to be checked
 * @returns boolean value
 * @example
 * ISLOGICAL(2 > 0) // returns true
 * ISLOGICAL([ false ]) // returns false
 */

export default function ISLOGICAL(value: any): boolean {
  return isBoolean(value)
}
