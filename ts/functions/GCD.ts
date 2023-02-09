import { toArray } from "lodash"
import NUM from "./NUM"

/**
 * Returns the greatest common divisor
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/gcd/
 * @param args (Any|Array, required): list of numbers
 * @returns greatest commom divisor among the numbers passed in
 * @example
 * GCD(8, 16, 32, 36) // returns 4
 */

export default function GCD(...args: number[]): number
export default function GCD(...args: string[]): number
export default function GCD(...args: any[]): number
export default function GCD(...args: any[]): number {
  const numbers: number[] = toArray(args).map(NUM)

  if (numbers.length === 0) { return NaN }
  if (numbers[0] < 0) { return NaN }

  let result: number = numbers[0]

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < 1) { return NaN }

    let num: number = numbers[i]

    while (result && num) {
      if (result > num) {
        result %= num
      } else {
        num %= result
      }
    }

    result += num
  }

  return result
}
