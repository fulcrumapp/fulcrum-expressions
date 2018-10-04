import { isArray, isEmpty, isString, slice } from "lodash"

/**
 * Returns the first n items of an array or string.
 */

export default function FIRST(item: any[]|string, n: number): any[]|undefined
export default function FIRST(item: any[]|string, n?: number): any[]|undefined
export default function FIRST(item: any): any[]|undefined
export default function FIRST(item: any[]|string, n = 0): any[]|undefined {
  if (!isArray(item) && !isString(item)) { return undefined }
  if (isEmpty(item)) { return undefined }
  if (isString(item) ) { item = item.split("") }

  if (item.length === 1 || n === 0) {
    return slice(item, 0)[0]
  } else {
  return slice(item, 0, n)
  }
}
