import { includes, isArray, isNumber, isString } from "lodash"
import { MaybeString } from "../types/primitives"

/**
 * Checks that a value is present in a string or array
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/contains/
 * @param haystack (String|Array, required): collectio to be iterated over
 * @param needle (String|Number, required): value one is looking for
 * @param fromIndex (Number, optional): numeric index from which to start looking
 * @returns boolean, true if value is found, else false
 * @example
 * CONTAINS(["apple", "orange", "lemon"], "orange") // returns true
 */

export default function CONTAINS(haystack: string|any[], needle: MaybeString|number): boolean
export default function CONTAINS(haystack: string|any[], needle: MaybeString|number, fromIndex?: number): boolean
export default function CONTAINS(haystack: string|any[], needle: MaybeString|number, fromIndex?: any): boolean
export default function CONTAINS(haystack: any, needle: MaybeString|number): boolean
export default function CONTAINS(haystack: any|any[], needle: any, fromIndex = 0): boolean {
  fromIndex = isNumber(fromIndex) ? fromIndex : 0

  if (!(isString(haystack) || isArray(haystack))) { return false }

  if (isString(haystack)) {
    return haystack.indexOf(needle.toString(), fromIndex) !== -1
  } else {
    return includes(haystack, needle, fromIndex)
  }
}
