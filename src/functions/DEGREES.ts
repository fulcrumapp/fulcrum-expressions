import { isFinite } from "lodash"
import NUM from "./NUM"

/**
 * Returns degrees for an input of radians.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/degrees/
 * @param value (Number, required): numeric value representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 */

export default function DEGREES(value: number|string): number
export default function DEGREES(value: undefined|null): number
export default function DEGREES(): number
export default function DEGREES(value?: any): number
export default function DEGREES(value?: any): number {
  value = NUM(value)
  // isFinite excludes NaN, Infinity, and -Infinity
  if (!isFinite(value)) { return NaN }

  return 180.0 * value / Math.PI
}
