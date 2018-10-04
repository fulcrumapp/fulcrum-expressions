import NUM from "./NUM"

/**
 * Returns e^x, where `x` is the argument, and `e` is Euler's number, the base of the natural logarithms.
 * @param x option; numeric value
 * @returns number, evaluates to `e` to the `x` power
 * @example
 * EXP(1) // returns 2.718281828459045
 * EXP(2) // 7.38905609893065
 */

export default function EXP(x: number): number
export default function EXP(x: string): number
export default function EXP(x: number|string): number {
  return Math.exp(NUM(x))
}
