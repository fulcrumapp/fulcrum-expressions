import { isFinite, isNumber, isString } from "lodash"
import NUM from "./NUM"

/**
 * Searches a string for a substring and returns a 1-based index.
 * @param needle required; substring to search for
 * @param haystack required; string in which to search for `needle` substring
 * @param startPosition optional; number, 1-based index from which to start searching the `haystack` string
 * @returns 1-based index indicating where substring is located
 * 
 * @example
 * SEARCH('4', '1234') // returns 4
 * // startPosition = 2 so search begins at second character of string
 * SEARCH("t", "test", 2) // returns 4
 */
export default function SEARCH(needle: string, haystack: string, startPosition?: number): number|undefined
export default function SEARCH(needle: any, haystack: any, startPosition?: any): number|undefined
export default function SEARCH(needle: any, haystack: any, startPosition?: any): number|undefined {
  // set startPosition to 1 if NUM(startPosition) returns NaN
  startPosition = isFinite(NUM(startPosition)) ? NUM(startPosition) : 1

  if (isNumber(haystack)) { haystack = haystack.toString() }
  if (isNumber(needle)) { needle = needle.toString() }

  if (!isString(needle) || !isString(haystack)) { return }

  if (needle === "") { return 1 }

  const index: number = haystack.toLowerCase().indexOf(needle.toLowerCase(), startPosition - 1)

  return index < 0 ? undefined : index + 1
}