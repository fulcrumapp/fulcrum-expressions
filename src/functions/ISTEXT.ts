import { isString } from "lodash"

/**
 * Checks if a value is a text value (string)
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/istext/
 * @param value (Any, required): value to be checked
 * @returns boolean
 * @example
 * ISTEXT("a string") // returns true
 */
export default function ISTEXT(value: any): boolean {
  return isString(value)
}
