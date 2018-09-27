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
  // no support for Math.cosh on IE so have to hard code it
  value = NUM(value)

  const exp = Math.exp(value)

  return (exp + 1 / exp) / 2

}
