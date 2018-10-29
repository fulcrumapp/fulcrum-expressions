import { isArray, isNaN, map, some } from "lodash"
import ARRAY from "./ARRAY"
import NUM from "./NUM"

/**
 * Returns the median value of list of numbers.
 * @param args required; numeric values to be evaluated
 * @returns median value
 * @example
 * MEDIAN(3, 4, 2, 5, 1) // returns 3
 */

export default function MEDIAN(...args: number[]): number
export default function MEDIAN(...args: any[]): number|undefined
export default function MEDIAN(...args: any[]): number|undefined {
  const numbers: number[] = map(ARRAY(args), NUM)

  if (!isArray(numbers) || numbers.length === 0) { return }

  const hasNaN: boolean = some(numbers, isNaN)

  if (hasNaN) { return }

  numbers.sort((a, b) => a - b)

  const half: number = Math.floor(numbers.length / 2)

  if (numbers.length % 2) {
    return numbers[half]
  } else {
    return (numbers[half - 1] + numbers[half]) / 2.0
  }
}
