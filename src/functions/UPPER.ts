import { isArray, isNull, isObject, isUndefined } from "lodash"

/**
 * Returns a string of all uppercase letters
 * @param value required; value to be converted to uppercase
 * @returns string of uppercase letters
 * @example
 * UPPER("test") // returns "TEST"
 */

export default function UPPER(value: string): string|undefined
export default function UPPER(value: any): string|undefined
export default function UPPER(value: any): string|undefined {
  if (isUndefined(value) || isNull(value) || isArray(value) || isObject(value)) { return }

  return value.toString().toUpperCase()
}
