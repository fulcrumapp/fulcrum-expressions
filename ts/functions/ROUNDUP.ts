import NUM from "./NUM"

/**
 * Rounds up the given number to the specified number of digits.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/roundup/
 * @param num (Number, required): numeric value to be round up
 * @param digits (Number, optional): desired number of digits to which `num` is to be rounded; defaults to `0`
 * @returns numeric value rounded up to the desired number of digits
 * @example
 * ROUNDUP(2.6666666, 4) // returns 2.6667
 */

export default function ROUNDUP(num: number, digits?: number): number
export default function ROUNDUP(num: string|number, digits?: number): number
export default function ROUNDUP(num: any, digits?: any): number
export default function ROUNDUP(num: any, digits = 0):number {
  num = NUM(num)
  digits = NUM(digits)

  const sign: number = num > 0 ? 1 : -1

  return sign * (Math.ceil(Math.abs(num) * Math.pow(10, digits))) / Math.pow(10, digits)
}
