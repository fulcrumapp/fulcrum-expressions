import NUM from "./NUM"

/**
 * Returns the natural logarithm of a value; equivalent to _ln(x)_.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ln/
 * @param value (Number, required): positive number for which to calculate the logarithm, base `e`
 * @returns numeric value indicating the natural log of a value
 * @example
 * LN(12) // returns 2.4849066497880004
 */

export default function LN(value: number): number
export default function LN(value: string): number
export default function LN(value: any): number
export default function LN(value: any): number {
  return Math.log(NUM(value))
}
