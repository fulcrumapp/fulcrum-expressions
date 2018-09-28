import { isUndefined } from "lodash"
import ABS from "./ABS"
import ISNAN from "./ISNAN"
import NUM from "./NUM"
import PRECISION from "./PRECISION"
import ROUND from "./ROUND"

/**
 * Returns number rounded down, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next lowest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * FLOOR(3.45) // returns 3
 * FLOOR(2.3333333, 4) // returns 2
 */

export default function FLOOR(value: number): number
export default function FLOOR(value: number, multiple: number): number
export default function FLOOR(value: string): number
export default function FLOOR(value: string, multiple: number): number
export default function FLOOR(): number
export default function FLOOR(value?: any, multiple = 1): number {
  const significance: number = ABS(multiple)
  const num: number = NUM(value)
  const precision: number = PRECISION(significance)

  if (ISNAN(num) || isUndefined(num)) { return NaN }
  if (significance === 0) { return 0 }

  return ROUND(Math.floor(num / significance) * significance, precision)
}
