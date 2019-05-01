import NUM from "./NUM"

/**
 * Returns the inverse cosine of a value, in radians.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/acos/
 * @param value (Number, required): number to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns inverse cosine of `value` parameter
 * @example
 * ACOS(0.8) // returns 0.6435011087932843
 */
export default function ACOS(value: number): number
export default function ACOS(value: string): number
export default function ACOS(value: any) {
  return Math.acos(NUM(value))
}
