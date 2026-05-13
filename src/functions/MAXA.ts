import MAX from "./MAX"

/**
 * Returns max value from a list of values
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/maxa/
 * @param args (Number|Array, required): list of numeric values
 * @returns max value in numeric form
 * @example
 * MAXA(1, 4, 7, 2, 4) // returns 7
 */
export default function MAXA(...args: number[]): number|undefined
export default function MAXA(...args: any[]): number|undefined {
  return MAX(args)
}
