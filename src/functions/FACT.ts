import {isNaN} from "lodash"
import MEMOIZED_FACT from "./MEMOIZED_FACT"
import NUM from "./NUM"

/**
 * Returns factorial of a number, n (n!)
 * @param value postive integer
 * @returns factorial of value (value!)
 * @example
 * FACT(0) // returns 1
 * FACT(7) // returns 5040
 */

export default function FACT(value: any): number {
  value = NUM(value)

  if (isNaN(value) || value < 0) { return NaN }

  const n: number = Math.floor(value)

  if (n === 0 || n === 1) {
    return 1
  } else if (MEMOIZED_FACT()[n] > 0) {
    return MEMOIZED_FACT()[n]
  } else {
    MEMOIZED_FACT()[n] = FACT(n - 1) * n
    return MEMOIZED_FACT()[n]
  }
}
