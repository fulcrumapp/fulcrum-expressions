import { isNaN } from "lodash"
/**
 * Parses the passed in value as a numeric value
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/num/
 * @param value (Number|String, required): value to be coerced to a numeric value
 * @returns a numeric value
 * @example
 * NUM('1') // returns 1
 */

export default function NUM(value: any) {
  if (isNaN(value)) { return NaN }
  return parseFloat(value)
}
