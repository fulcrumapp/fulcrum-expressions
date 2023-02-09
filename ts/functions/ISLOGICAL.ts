import { isBoolean } from "lodash"

/**
 * Checks for a boolean value
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/islogical/
 * @param value (Any, required): value to be checked
 * @returns boolean value
 * @example
 * ISLOGICAL(2 > 0) // returns true
 */

export default function ISLOGICAL(value: any): boolean {
  return isBoolean(value)
}
