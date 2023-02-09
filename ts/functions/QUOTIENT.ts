import { isNaN } from "lodash"
import FLOOR from "./FLOOR"
import NUM from "./NUM"

/**
 * Returns quotient of numerator and denominator as integer.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/quotient/
 * @param numerator (Number, required): number to be divided
 * @param denominator (Number, required): divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 */
export default function QUOTIENT(numerator: number, denominator: number): number
export default function QUOTIENT(numerator: any, denominator: any): number
export default function QUOTIENT(numerator?: any, denominator?: any): number
export default function QUOTIENT(numerator?: any, denominator?: any): number {
  numerator = NUM(numerator)
  denominator = NUM(denominator)

  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) { return NaN }

  return FLOOR(numerator / denominator)
}
