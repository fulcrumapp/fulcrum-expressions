import { isNumber } from "lodash"
import ISNAN from "./ISNAN"
import NUM from "./NUM"

/**
 * Returns whether or not a value is even
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/iseven/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
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
