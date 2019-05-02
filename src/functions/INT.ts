import FLOOR from "./FLOOR"

/**
 * Returns number rounded down, away from zero, to the nearest interger
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/int/
 * @param number (Number, required): value to be converted
 * @param multiple (Number, optional): multiple to which a `number` will be converted
 * @returns number converted to an int, rounded to nearest multiple
 * @example
 * INT(3.45) // returns 3
 */

export default function INT(number: number, multiple?: number): number
export default function INT(number: number, multiple = 1): number {
  return FLOOR(number, multiple)
}
