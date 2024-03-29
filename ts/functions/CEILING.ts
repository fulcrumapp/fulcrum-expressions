import { isUndefined } from "lodash"
import ABS from "./ABS"
import ISNAN from "./ISNAN"
import NUM from "./NUM"
import PRECISION from "./PRECISION"
import ROUND from "./ROUND"

/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ceiling/
 * @param value (Number, required): value to be rounded
 * @param multiple (Number, optional): multiple to which `value` will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */

export default function CEILING(value: number): number
export default function CEILING(value: number, multiple: number): number
export default function CEILING(value: string): number
export default function CEILING(value: string, multiple: number): number
export default function CEILING(): number
export default function CEILING(value?: any, multiple = 1): number {
  const significance: number = ABS(multiple)
  const num: number = NUM(value)
  const precision: number = PRECISION(significance)

  if (ISNAN(num) || isUndefined(num)) { return NaN }
  if (significance === 0) { return 0 }

  return ROUND(Math.ceil(num / significance) * significance, precision)
}
