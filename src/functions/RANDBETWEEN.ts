import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Returns a random integer between the high and low values specified.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/randbetween/
 * @param low (Number, required): lowest value of desired range
 * @param high (Number, required): highest value of desired range
 * @returns random integer within specified range
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
