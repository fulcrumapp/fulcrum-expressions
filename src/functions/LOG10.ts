import LOG from "./LOG"

/**
 * Calculates the log10 (common logarithm) of a value.
 * @param value required; number to be calculated
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
