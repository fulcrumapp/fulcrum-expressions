import {
         filter,
         isArray,
         isEmpty,
         isNull,
         isString,
         isUndefined,
        } from "lodash"
import ARRAY from "./ARRAY"

/**
 * Returns a count of the number of blank items.
 * Items considered blank include `null`, `undefined`, `[]`, `{}`, and `""`.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/countblank/
 * @param args (Any|Array, required): items to be counted
 * @returns number
 * @example
 * COUNTBLANK([1, 2, null, 3]) // returns 1
 */

export default function COUNTBLANK(...args: any[]): number
export default function COUNTBLANK(): number
export default function COUNTBLANK(...args: any[]): number {
  const results = filter(ARRAY(args), (item) => {
    if (isNull(item) || isUndefined(item)) {
      return true
    } else if (isArray(item) || isString(item)) {
      return isEmpty(item)
    } else {
      return false
    }
  })

  return results.length
}
