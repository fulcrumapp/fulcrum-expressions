import ISNAN from "./ISNAN"
import NUM from "./NUM"

/**
 * Returns the number of digits to the right of the decimal point
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/precision/
 * @param value (Number, required): number to be evaluated
 * @returns numberic value
 * @example
 * PRECISION(9.034) // returns 3
 */
export default function PRECISION(value: number): number
export default function PRECISION(value: string): number
export default function PRECISION(value: any): number {
  value = NUM(value)

  if (ISNAN(value)) { return NaN }

  const parts: string[] = value.toString().split(".")

  if (parts.length < 2) { return 0 }

  return parts[1].length
}
