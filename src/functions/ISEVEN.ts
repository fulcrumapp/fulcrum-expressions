import { isNumber } from "lodash"
import ISNAN from "./ISNAN"
import NUM from "./NUM"

/**
 * Returns whether or not a value is even
 * @param value required; numeric value to be checked
 * @returns boolean value
 * @example
 * ISEVEN(24) // returns true
 * ISEVEN(5 * 5) // returns false
 */

export default function ISEVEN(value: number): boolean
export default function ISEVEN(value: string): boolean
export default function ISEVEN(value: any): boolean
export default function ISEVEN(value: any): boolean {
  value = NUM(value)
  if (!isNumber(value) || ISNAN(value)) { return false }

  return Math.abs(value) % 2 === 0
}
