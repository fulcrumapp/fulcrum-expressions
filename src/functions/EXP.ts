import NUM from "./NUM"

/**
 * Returns e^x, where `x` is the argument, and `e` is Euler's number, the base of the natural logarithms.
 * @param x option; numeric value, defaults to 1
 * @returns number, evaluates to `e` to the `x` power
 * @example
 * EXP() // returns 2.718281828459045
 * EXP(2) // 7.38905609893065
 */

export default function EXP(x: number): number
export default function EXP(): number
export default function EXP(x = 1): number {
  return Math.exp(NUM(x))
}
