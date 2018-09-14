import NUM from "./NUM"

/**
 * Returns the inverse hyperbolic cosine of a number.
 * @param value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @example
 * ACOSH(7) // returns 2.6339157938496336
 */
const ACOSH = (number: number | string) => {
  const parsedNumber = NUM(number)
  return Math.log(parsedNumber + Math.sqrt(parsedNumber * parsedNumber - 1))
}

export default ACOSH
