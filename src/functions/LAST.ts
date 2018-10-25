import { isArray, isEmpty, isString, slice } from "lodash"

/**
 * Returns the last n items of an array or string.
 * @param item required; array or string to extract items from
 * @param n optional; number of items to be extracted
 * @returns items extracted; if more than one item is extracted an array is returned
 * @example
 * LAST([1, 2, 3]) // returns 3
 * LAST([1 ,2 ,3], 2) // return [2, 3]
 */

export default function FIRST(item: any[]|string, n: number): any[]|undefined
export default function FIRST(item: any[]|string, n?: number): any[]|undefined
export default function FIRST(item: any): any[]|undefined
export default function FIRST(item: any[]|string, n = 0): any[]|undefined {
  if (!isArray(item) && !isString(item)) { return undefined }
  if (isEmpty(item)) { return undefined }
  if (isString(item) ) { item = item.split("") }

  if (item.length === 1 || n === 0) {
    return slice(item, -1)[0]
  } else {
  return slice(item, -n)
  }
}
