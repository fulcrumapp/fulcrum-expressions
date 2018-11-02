import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Returns the base number raised to the exponent power.
 * @param base required; base number to be exponentially multiplied
 * @param exponent required; number to serve as exponent
 * @returns number
 * @example
 * POWER(3, 4) // returns 81
 */

export default function POWER(base: number, power: number): number {
  base = NUM(base)
  power = NUM(power)

  if (isNaN(base) || isNaN(power)) { return NaN }

  return Math.pow(base, power)
}
