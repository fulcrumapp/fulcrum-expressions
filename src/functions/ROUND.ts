import NUM from "./NUM"

/**
 * Rounds a number to given scale
 * @param number numeric value to be rounded
 * @param scale optional, number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(5.6) // returns 6
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
export default function ROUND(value: number): number
export default function ROUND(value: number, scale: number): number
export default function ROUND(value: string): number
export default function ROUND(value: string, scale: number): number
export default function ROUND(value: any, scale = 0): number {
  const num = NUM(value)
  const digits = NUM(scale)

  return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits)
}
