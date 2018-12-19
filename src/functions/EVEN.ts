import { isFinite } from "lodash"
import CEILING from "./CEILING"
import NUM from "./NUM"

/**
 * Returns number rounded up to the nearest even integer
 * @param value number
 * @returns number or NaN
 * @example
 * EVEN(-3.4) // returns -2
 * EVEN([]) // returns NaN
 */

export default function EVEN(value: number): number
export default function EVEN(value: string): number
export default function EVEN(value: any): number
export default function EVEN(value: any): number {
  value = NUM(value)
  // isFinite excludes NaN, Infinity, and -Infinity
  if (!isFinite(value)) { return NaN }

  return CEILING(value, -2)
}
