import MIN from "./MIN"

/**
 * Returns min value from a list of values
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mina/
 * @param args (Number|Array, required): list of numeric values
 * @returns min numberic value among parameters
 * @example
 * MINA(7, 4, 1, 2, 4) // returns 1
 */

export default function MINA(...args: any[]): number|undefined {
  return MIN(args)
}
