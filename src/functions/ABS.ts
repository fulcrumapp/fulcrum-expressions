import NUM from "./NUM"

/**
 * Returns the absolute value of a number.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/abs/
 * @param value (Number, required): number to be evaluated
 * @returns the absolute value of the `value` parameter
 * @example
 * ABS(-1) // returns 1
 */
export default function ABS(value: number): number
export default function ABS(value: string): number
export default function ABS(value: any): number {
  return Math.abs(NUM(value))
}
