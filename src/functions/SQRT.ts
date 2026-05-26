import NUM from "./NUM"

/**
 * Returns the square root of a number.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrt/
 * @param num (Number, required): number to be evaluated
 * @returns square root of original value
 */

export default function SQRT(num: number): number
export default function SQRT(num: string): number
export default function SQRT(num: any): number
export default function SQRT(num: any): number {
  return Math.sqrt(NUM(num))
}