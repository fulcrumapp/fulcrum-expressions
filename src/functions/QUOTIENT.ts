import { isNaN } from "lodash"
import FLOOR from "./FLOOR"
import NUM from "./NUM"

/**
 * Returns quotient of numerator and denominator as integer.
 * @param numerator required; number to be divided
 * @param denominator required; divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 * QUOTIENT(12.5, 2) // returns 6
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
