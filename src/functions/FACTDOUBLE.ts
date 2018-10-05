import { isNaN } from "lodash"
import MEMOIZED_FACTDOUBLE from "./MEMOIZED_FACTDOUBLE"
import NUM from "./NUM"

/**
 * Returns double factorial of a number, n (n!!)
 * @param value postive integer
 * @returns factorial of value (value!!)
 * @example
 * FACT(0) // returns 1
 * FACT(7) // returns 5040
 */

export default function FACTDOUBLE(value: any): number {
  value = NUM(value)

  if (isNaN(value) || value < 0) { return NaN }

  const n: number = Math.floor(value)

  if (n === 0 || n === 1) {
    return 1
  } else if (MEMOIZED_FACTDOUBLE()[n] > 0) {
    return MEMOIZED_FACTDOUBLE()[n]
  } else {
    MEMOIZED_FACTDOUBLE()[n] = FACTDOUBLE(n - 2) * n
    return MEMOIZED_FACTDOUBLE()[n]
  }
}
