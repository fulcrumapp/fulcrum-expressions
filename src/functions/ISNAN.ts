import ISNUMBER from "./ISNUMBER"

/**
 * Returns a boolean value indicating if the passed in value is not a number
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnan/
 * @param value (Any, required): value to be checked
 * @returns boolean value
 * @example
 * ISNAN("a7") // returns true
 */

export default function ISNAN(value: any): boolean {
  return !ISNUMBER(value)
}
