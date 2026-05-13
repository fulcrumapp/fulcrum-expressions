import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Returns the modulus or remainder of a number divided by a divisor.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mod/
 * @param num (Number, required): number to be evaluated
 * @param divisor (Number, required)
 * @returns remainder of `num / divisor`
 * @example
 * MOD(10, 2) // returns 0
 */

export default function MOD(num: number, divisor: number): number
export default function MOD(num: string, divisor: string): number
export default function MOD(num?: any, divisor?: any): number
export default function MOD(num?: any, divisor?: any): number {
  num = NUM(num)
  divisor = NUM(divisor)

  if (isNaN(num) || isNaN(divisor) || divisor === 0) { return NaN }

  const modulus: number = Math.abs(num % divisor)

  return divisor > 0 ? modulus : -modulus
}
