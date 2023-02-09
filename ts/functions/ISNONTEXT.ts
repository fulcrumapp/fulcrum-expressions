import { isString } from "lodash"
/**
 * Checks if a value is a a non-text value (not a string)
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnontext/
 * @param value (Any, required): value to be checked
 * @returns boolean
 * @example
 * ISNONTEXT(["a string"]) // returns true
 */
export default function ISNONTEXT(value: any): boolean {
  return !isString(value)
}
