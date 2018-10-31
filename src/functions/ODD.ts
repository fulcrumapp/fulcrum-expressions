import { isNumber } from "lodash"
import NUM from "./NUM"

/**
 * Returns the next odd number.
 * @param value number to be evaluated
 * @returns number
 * @example
 * ODD(2) // returns 3
 */

export default function ODD(value: number): number
export default function ODD(value?: any): number
export default function ODD(value?: any): number {
  value = NUM(value)

  if (!isNumber(value)) { return NaN }

  let temp: number = Math.ceil(Math.abs(value))
  temp = temp % 2 ? temp : temp + 1

  return value >= 0 ? temp : -temp
}
