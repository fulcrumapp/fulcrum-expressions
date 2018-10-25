import { isString } from "lodash"

/**
 * Checks if a value is a text value (string)
 * @param value required; value to be checked
 * @returns boolean
 * @example
 * ISTEXT("a string") // returns true
 * ISTEXT(["an array"]) // returns false
 */
export default function ISTEXT(value: any): boolean {
  return isString(value)
}
