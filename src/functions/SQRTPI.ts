import NUM from "./NUM"
import SQRT from "./SQRT"

/**
 * Returns the square root of a number times PI.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrtpi/
 * @param num (Number, required): number to be evaluated
 * @returns the sqrt of `num` * PI
 */

export default function SQRTPI(num: number): number
export default function SQRTPI(num: string): number
export default function SQRTPI(num: any): number
export default function SQRTPI(num: any): number {
  return SQRT(NUM(num) * Math.PI)
}