import ISERR from "./ISERR"

/**
 * Checks if a value is an instance of an Error or has no value
 * @param value (Error|Any, required): item to be checked
 * @returns boolean
 * @example
 * const badField = FIELD('does_not_exist') // = undefined
 * ISERROR(badField) // returns true
 */

export default function ISERROR(value: any): boolean {
  return ISERR(value)
}
