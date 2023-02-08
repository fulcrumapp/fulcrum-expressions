import { toArray } from "lodash"
import NUM from "./NUM"

/**
 * Maps over arguments passed in and converts each to a number value.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/nums/
 * @param args (String|Number|Array, required): list of values to be mapped to numbers
 * @returns array of numberic values
 * @example
 * NUMS("2", "3", "4") // returns [2, 3, 4]
 */

export default function NUMS(...args: string[]): number[]
export default function NUMS(...args: number[]): number[]
export default function NUMS(...args: any[]): number[]
export default function NUMS(...args: any[]): number[] {
  return toArray(args).map(NUM)
}
