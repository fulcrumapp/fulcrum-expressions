import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Returns the base number raised to the exponent power.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/power/
 * @param base (Number, required): base number
 * @param exponent (Number, required): exponent
 * @returns number
 * @example
 * POWER(3, 4) // returns 81
 */
export default function POWER(base: number, power: number): number
export default function POWER(base?: any, power?: any): number
export default function POWER(base?: any, power?: any): number {
  base = NUM(base)
  power = NUM(power)

  if (isNaN(base) || isNaN(power)) { return NaN }

  return Math.pow(base, power)
}
