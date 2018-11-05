import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Returns a random integer between the high and low values specified.
 * @param low required; lowest value of desired range
 * @param high required; highest value of desired range
 * @returns random integer within specified range
 * @example
 * RANDBETWEEN(1, 10) // returns 2
 * RANDBETWEEN(1, 10) // returns 8
 */

export default function RANDBETWEEN(low: number, high: number): number
export default function RANDBETWEEN(low: any, high: any): number
export default function RANDBETWEEN(low?: any, high?: any): number
export default function RANDBETWEEN(low?: any, high?: any): number {
  low = NUM(low)
  high = NUM(high)

  if (isNaN(low) || isNaN(high)) { return NaN }

  return low + Math.ceil((high - low + 1) * Math.random()) - 1
}
