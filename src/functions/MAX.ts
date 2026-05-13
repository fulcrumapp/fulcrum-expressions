import { isNaN, map, some } from "lodash"
import ARRAY from "./ARRAY"
import NUM from "./NUM"

/**
 * Returns max value from a list of values
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/max/
 * @param args (Number|Array, required): list of numeric values
 * @returns max value in numeric form
 * @example
 * MAX(1, 4, 7, 2, 4) // returns 7
 */

export default function MAX(...args: number[]): number|undefined
export default function MAX(...args: any[]): number|undefined
export default function MAX(...args: any[]): number|undefined {
  let numbers: any[] = ARRAY(args)
  numbers = map(numbers, NUM)

  const hasNaN: boolean = some(numbers, isNaN)

  if (numbers.length === 0 || hasNaN) { return }

  return numbers.reduce((a: number, b: number) => {
    return Math.max(a, b)
  })
}
