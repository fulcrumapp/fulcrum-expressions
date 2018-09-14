import NUM from "./NUM"

/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns
 * @example
 * ACOS(0.8) // returns 0.6435011087932843
 */
const ACOS = (number: number | string): number =>
  Math.acos(NUM(number))

export default ACOS

