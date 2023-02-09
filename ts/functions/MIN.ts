import { isNaN, map, some } from "lodash"
import ARRAY from "./ARRAY"
import NUM from "./NUM"

/**
 * Returns min value from a list of values
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/min/
 * @param args (Number|Array, required): list of numeric values
 * @returns min numberic value among parameters
 * @example
 * MIN(7, 4, 1, 2, 4) // returns 1
 */

export default function MIN(...args: any[]): number|undefined {
  let numbers: any[] = ARRAY(args)
  numbers = map(numbers, NUM)

  const hasNaN: boolean = some(numbers, isNaN)

  if (numbers.length === 0 || hasNaN) { return }

  return numbers.reduce((a: number, b: number) => {
    return Math.min(a, b)
  })
}
