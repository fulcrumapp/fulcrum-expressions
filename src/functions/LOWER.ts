import { isArray, isNull, isObject, isUndefined } from "lodash"
import { GenericObject } from "../types/primitives"

/**
 * Converts a string value to all lowercase.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lower/
 * @param value (String, required): value to be converted to lowercase
 * @returns string
 * @example
 * LOWER("CASE") // returns "case"
 */

export default function LOWER(value: string): string
export default function LOWER(value: undefined | null | object | Array<any> | GenericObject ): undefined
export default function LOWER(value: any): string | undefined {
  if (isUndefined(value) || isNull(value) || isArray(value) || isObject(value) ) { return }

  return value.toString().toLowerCase()
}
