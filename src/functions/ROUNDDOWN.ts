import NUM from "./NUM"

/**
 * Rounds down a given number to the specified number of digits.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rounddown/
 * @param num (Number, required): numeric value to be round down
 * @param digits (Number, optional): number of digits to which `num` is to be rounded down; defaults to `0`
 * @returns numeric value rounded down to desired number of digits
 */

export default function ROUNDDOWN(num: number, digits?: number): number
export default function ROUNDDOWN(num: string|number, digits?: number): number
export default function ROUNDDOWN(num: any, digits?: any): number
export default function ROUNDDOWN(num: any, digits = 0): number {
  num = NUM(num)
  digits = NUM(digits)

  const sign: number = num > 0 ? 1 : -1

  return sign * (Math.floor(Math.abs(num) * Math.pow(10, digits))) / Math.pow(10, digits)
}