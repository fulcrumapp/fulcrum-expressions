import NUM from "./NUM"

/**
 * Calculates the log of a value given a base.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/log/
 * @param value (Number, required) number to be logged
 * @param base (Number, optional): logarithmic base, defaults to 10
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

  return Math.log(value) / Math.log(base)
}
