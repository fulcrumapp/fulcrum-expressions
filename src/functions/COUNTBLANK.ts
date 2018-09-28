import {
         filter,
         isArray,
         isEmpty,
         isNull,
         isString,
         isUndefined,
        } from "lodash"
import ARRAY from "./ARRAY"
import ISBLANK from "./ISBLANK"

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
