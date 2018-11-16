import { isNaN, some } from "lodash"
import ARRAY from "./ARRAY"
import NUM from "./NUM"

/**
 * Returns the sum of each number squared.
 * @param args array of numbers
 * @returns sum of the square of each argument
 * @example
 *
 * SUMSQ(1, 2, 3, 4) // returns 30
 */

export default function SUMSQ(...args: number[]): number {
  const numbers: number[] = ARRAY(args).map(NUM)

  if (numbers.length === 0) { return NaN }

  const hasNaN: boolean = some(numbers, isNaN)

  if (hasNaN) { return NaN }

  return numbers.reduce((memo, num) => memo += (num * num), 0)
}
