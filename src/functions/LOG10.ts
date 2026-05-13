import LOG from "./LOG"

/**
 * Calculates the log10 (common logarithm) of a value.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/log10/
 * @param value (Number, required): number to be calculated
 * @returns numeric value
 * @example
 * LOG10(100) // returns 2
 */

export default function LOG10(value: number): number
export default function LOG10(value: string): number
export default function LOG10(value: any): number
export default function LOG10(value: any): number {
  return LOG(value, 10)
}
