import NUM from "./NUM"

/**
 * Returns function returns the hyperbolic cosine of a number
 * @param value numeric value
 * @returns numeric value between 1 and -1 indicating the angle's cosine
 * @example
 * COSH(12) // returns 0.8438539587324921
 */

export default function COSH(value: number): number
export default function COSH(value: string): number
export default function COSH(value: any): number {
  return Math.cosh(NUM(value))
}
