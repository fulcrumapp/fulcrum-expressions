import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Returns the sign of a number.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sign/
 * @param num (Number, required): value to evaluate
 * @returns sign of a number: 1 for positive numbers, -1 for negative numbers, 0 for 0
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
