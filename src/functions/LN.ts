import NUM from "./NUM"

/**
 * Returns the returns the natural logarithm of a value. In mathematics, this is equivalent to _ln(x)_.
 * @param value numeric value specifying radians
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
