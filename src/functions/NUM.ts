import { isNaN } from "lodash"
/**
 * Parses the passed in value as a numeric value
 * @param value any type
 * @returns a numeric value
 * @example
 * NUM('1') // returns 1
 * NUM('a') // returns NaN
 */

export default function NUM(value: any) {
  if (isNaN(value)) { return NaN }
  return parseFloat(value)
}
