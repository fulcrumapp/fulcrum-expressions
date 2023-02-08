import NUM from "./NUM"

/**
 * Returns function returns the hyperbolic sine of a number
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sinh/
 * @param value (Number, required): value to evaluate
 * @returns numeric value of angle's hyperbolic sine
 * @example
 * SINH(12) // returns 0.8438539587324921
 */

export default function SINH(value: number): number
export default function SINH(value: string): number
export default function SINH(value: any): number
export default function SINH(value: any): number {
  // no support for Math.sinh on IE so have to hard code it
  value = NUM(value)

  const exp = Math.exp(value)

  return (exp - 1 / exp) / 2

}