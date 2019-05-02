import { isNaN, reduce, some, toArray } from "lodash"
import NUM from "./NUM"

/**
 * Multiplies all the numbers given as arguments
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/product/
 * @param args (Number|Array, required): list of numbers to be multiplied
 * @returns product
 * @example
 * PRODUCT(-2, 3, 4) // returns -24
 */

export default function PRODUCT(...args: number[]): number
export default function PRODUCT(...args: any[]): number
export default function PRODUCT(...args: any[]): number {
  const numbers: number[] = toArray(args).map(NUM)

  const hasNaN: boolean = some(numbers, isNaN)

  if (hasNaN || numbers.length === 0) { return NaN}

  return reduce(numbers, ((memo, num) => memo *= num), 1)
}
