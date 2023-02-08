import NUM from "./NUM"

/**
 * Rounds a number to given scale
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/round/
 * @param number (Number, required): numeric value to be rounded
 * @param scale (Number, optional): number of digits required after the decimal point
 * @returns rounded number
 * @example
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
