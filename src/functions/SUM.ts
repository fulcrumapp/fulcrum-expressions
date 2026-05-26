import { isNaN, some } from "lodash"
import ARRAY from "./ARRAY"
import NUM from "./NUM"

/**
 * Returns the sum of its arguments.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sum/
 * @param args (Array|Any, required): list of numbers
 * @returns sum of its arguments
 */

export default function SUM(...args: number[]): number
export default function SUM(...args: any[]): number
export default function SUM(...args: any[]): number {
  const numbers: number[] = ARRAY(args).map(NUM)

  if (numbers.length === 0) { return NaN }

  const hasNaN: boolean = some(numbers, isNaN)

  if (hasNaN) { return NaN }

  return numbers.reduce((memo, num) => memo += num, 0)
}
