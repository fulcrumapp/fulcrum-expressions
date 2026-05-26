import { isArray } from "lodash"
import NUM from "./NUM"
import ISNAN from "./ISNAN"

/**
 * Finds one string within another and returns its position.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/find/
 * @param needle (String, required): the string to search for
 * @param haystack (String, required): the string to search within
 * @param position (Number, optional): position to start searching from (1-based)
 * @returns the 1-based position of the found string, or undefined if not found
 */
export default function FIND(needle: any, haystack: any, position?: any): number | undefined {
  position = NUM(position)
  if (ISNAN(position)) position = 0

  if (!haystack || !haystack.indexOf) return undefined
  if (isArray(needle)) return undefined

  const index = haystack.indexOf(needle, position - 1)

  if (index < 0) return undefined

  return index + 1
}
