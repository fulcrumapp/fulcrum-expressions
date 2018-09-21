import NUM from "./NUM"

/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns
 * @example
 * ACOS(0.8) // returns 0.6435011087932843
 */
export default function ACOS(value: number): number
export default function ACOS(value: string): number
export default function ACOS(value: any) {
  return Math.acos(NUM(value))
}
