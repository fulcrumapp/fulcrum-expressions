import { isString } from "lodash"
/**
 * Checks if a value is a a non-text value (not a string)
 * @param value required; value to be checked
 * @returns boolean
 * @example
 * ISNONTEXT("a string") // returns false
 * ISNONTEXT(["an array"]) // returns true
 */
export default function ISNONTEXT(value: any): boolean {
  return !isString(value)
}
