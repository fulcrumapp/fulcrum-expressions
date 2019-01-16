import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Returns the sign of a number.
 * @param num required; numeric value
 * @returns sign of a number: 1 for positive numbers, -1 for negative numbers, 0 for 0
 * @example
 * 
 * SIGN(9 * -3) // returns -1
 */

export default function SIGN(num: number): number
export default function SIGN(num: any): number
export default function SIGN(num: any): number|undefined {
  num = NUM(num)

  if (isNaN(num)) { return NaN }

  switch (true) {
    case num > 0:
      return 1
    case num < 0:
      return -1
    case num === 0:
      return 0
  }
}
