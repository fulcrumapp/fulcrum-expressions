import { toArray } from "lodash"
import FLATTEN, { RecursiveArray } from "./FLATTEN"

/**
 * Accepts any number of arguments and returns them as an array
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/array/
 * @param args (Any|Array, required): list of items of any type
 * @returns an array flattened to on level deep
 * @example
 * ARRAY([1, 2], '3', [4, 5]) // returns [1, 2, '3', 4, 5]
 */

export default function ARRAY(...args: any[]): any[] {
  return FLATTEN(toArray(args))
}
