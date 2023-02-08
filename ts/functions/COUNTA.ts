import { filter } from "lodash"
import ARRAY from "./ARRAY"
import ISBLANK from "./ISBLANK"

/**
 * Returns a count of the items in a list that are not null, undefined, or blank
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/counta/
 * @param value (Any|Array, required): items to be counted
 * @returns number
 * @example
 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
 */

export default function COUNTA(value: any[]): number
export default function COUNTA(value: any): number
export default function COUNTA(): number
export default function COUNTA(value?: any[]): number {
  const values = filter(ARRAY(value), (val) => !ISBLANK(val))
  return values.length
}
