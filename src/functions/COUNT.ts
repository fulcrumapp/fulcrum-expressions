import { filter, isArray, map } from "lodash"
import COMPACT from "./COMPACT"
import ISNUMBER from "./ISNUMBER"
import NUM from "./NUM"

/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (`"1"`) into a numeric value (`1`).
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/count/
 * @param value (Number|String|Array, required): items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */

export default function COUNT(value: number[]): number
export default function COUNT(value: string[]): number
export default function COUNT(): undefined
export default function COUNT(value: any): number|undefined
export default function COUNT(value?: any[]): number|undefined {
  if (!isArray(value)) { return undefined }

  const numbers = filter(COMPACT(value).map(NUM), ISNUMBER)

  return numbers.length
}
