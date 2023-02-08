import NUM from "./NUM"

/**
 * Returns the sine of the specified angle value, which must be specified in radians.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sin/
 * @param value (Number, required)L: numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's sine
 * @example
 * SIN(12) // returns -0.5365729180004349
 */

export default function SIN(value: number): number
export default function SIN(value: string): number
export default function SIN(value: any): number {
  return Math.sin(NUM(value))
}