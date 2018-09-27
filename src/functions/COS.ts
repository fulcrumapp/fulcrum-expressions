import NUM from "./NUM"

/**
 * Returns the cosine of the specified angle value, which must be specified in radians.
 * @param value numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's cosine
 * @example
 * COS(12) // returns 0.8438539587324921
 */

export default function COS(value: number): number
export default function COS(value: string): number
export default function COS(value: any): number {
  return Math.cos(NUM(value))
}
