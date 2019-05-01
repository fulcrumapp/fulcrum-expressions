import { find } from "lodash"
import ARRAY from "./ARRAY"
import ISBLANK from "./ISBLANK"

/**
 * Returns first value passed in to function that exists
 * NaN, undefined, null, and empty strings, objects, and arrays are not recognized
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/coalesce/
 * @param args (Any|Array, required): array of values
 * @returns first value passed into function
 * @example
 * COALESCE([], null, [3, 6, [5]]) // returns 3
 */

export default function COALESCE(...args: any[]): string|number|undefined
export default function COALESCE(): undefined
export default function COALESCE(...args: any[]): string|number|undefined {
  return find(ARRAY(args), (value) => !(ISBLANK(value)))
}
