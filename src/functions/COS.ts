import NUM from "./NUM"

/**
 * Returns the cosine of the specified angle value, which must be specified in radians.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/cos/
 * @param value (Number, required): value specifying radians
 * @returns number, value between 1 and -1 indicating the angle's cosine
 * @example
 * COS(12) // returns 0.8438539587324921
 */

export default function COS(value: number): number
export default function COS(value: string): number
export default function COS(value: any): number {
  return Math.cos(NUM(value))
}
