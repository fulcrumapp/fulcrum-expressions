import { isArray, isNull, isObject, isUndefined } from "lodash"
import { GenericObject } from "../types/primitives"

/**
 * Returns a string of all uppercase letters
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/upper/
 * @param value (String, required): text to be converted to uppercase
 * @returns string of uppercase letters
 * @example
 * UPPER("test") // returns "TEST"
 */

export default function UPPER(value: string): string
export default function UPPER(value: undefined | null | object | Array<any> | GenericObject ): undefined
export default function UPPER(value: any): string | undefined {
  if (isUndefined(value) || isNull(value) || isArray(value) || isObject(value)) { return }

  return value.toString().toUpperCase()
}
