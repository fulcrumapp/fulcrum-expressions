import { isFinite } from "lodash"

/**
 * Returns a boolean value indicating if value passed in is a numeric value
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnumber/
 * @param value (Any, required): value to be checked
 * @returns boolean
 * @example
 * ISNUMBER(8) // returns true
 */
export default function ISNUMBER(value: any): boolean {
  return isFinite(value)
}
