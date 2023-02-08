import NUM from "./NUM"

/**
 * Returns e^x, where `x` is the argument, and `e` is Euler's number, the base of natural logarithms.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exp/
 * @param x (Number, required): exponent value
 * @returns number,`e` to the `x` power
 * @example
 * EXP(1) // returns 2.718281828459045
 */

export default function EXP(x: number): number
export default function EXP(x: string): number
export default function EXP(x: number|string): number {
  return Math.exp(NUM(x))
}
