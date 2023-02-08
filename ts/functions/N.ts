import { isNumber } from "lodash"

/**
 * Returns a numeric value. If a number if passed in, the same number is returned, otherwise
 * function returns 1 for a true boolean value, and 0 for all other values.
 * @param value (Number|Any, required): value to be evaluated
 * @returns a numeric value
 * @example
 * N(97) // returns 97
 * N(false) // returns 0
 */

export default function N(value: any): number {
  if (isNumber(value)) { return value }
  if (value === true) { return 1 }
  if (value === false) { return 0 }

  return 0
}
