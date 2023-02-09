import { isNumber } from "lodash"
import ISNAN from "./ISNAN"
import NUM from "./NUM"

/**
 * Returns whether or not a value is odd
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isodd/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
 * ISODD(5 * 5) // returns true
 */

export default function ISODD(value: number): boolean
export default function ISODD(value: string): boolean
export default function ISODD(value: any): boolean
export default function ISODD(value: any): boolean {
  value = NUM(value)

  if (!isNumber(value) || ISNAN(value)) { return false }

  return Math.abs(value) % 2 === 1
}
