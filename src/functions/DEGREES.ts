import { isNumber } from "lodash"
import NUM from "./NUM"

/**
 * Returns degrees for an input of radians.
 * @param value required; numeric value or string representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 * DEGREES("0.78") // returns 44.69070802020421
 */

export default function DEGREES(value: number|string): number
export default function DEGREES(value: undefined|null): number
export default function DEGREES(): number
export default function DEGREES(value?: any): number {
  value = NUM(value)
  if (!isNumber(value)) { return NaN }

  return 180.0 * value / Math.PI
}
