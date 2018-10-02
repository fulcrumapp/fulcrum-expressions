import { isNaN, map, some } from "lodash"
import ARRAY from "./ARRAY"
import NUM from "./NUM"

/**
 * Returns min value from a list of values
 * @param args a list of numeric values or string number values
 * @returns min value in numeric form
 * @example
 * MIN(7, 4, 1, 2, 4) // returns 1
 * MIN(["45", "50", "32", "51"]) // returns 32
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
