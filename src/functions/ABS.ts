import NUM from "./NUM"

/**
 * Returns the absolute value of a number.
 * @param value The number of which to return the absolute value.
 * @returns the absolute value of the `value` parameter
 * @example
 * ABS(-1) // returns 1
 * ABS(42) // returns 42
 */
export default function ABS(value: number): number
export default function ABS(value: string): number
export default function ABS(value: any): number {
  return Math.abs(NUM(value))
}
