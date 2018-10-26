import { isNaN, isNull, isUndefined } from "lodash"
import NUM from "./NUM"

/**
 * Calculates the log of a value given a base.
 * @param value required; number to be logged
 * @param base optional; base with which to calculated the log, defaults to 10
 * @returns number
 * @example
 * LOG(100) // returns 2
 */

export default function LOG(value: number, base: number): number
export default function LOG(value: number): number
export default function LOG(value: any, base?: any): number
export default function LOG(value: any, base?: any): number {
  value = NUM(value)
  base = NUM(base) || 10

  if (isUndefined(base) || isNull(base) || isNaN(base)) { return NaN }

  return Math.log(value) / Math.log(base)
}
