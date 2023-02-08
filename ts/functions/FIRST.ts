import { isArray, isEmpty, isString, slice } from "lodash"

/**
 * Returns the first n items of an array or string.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/first/
 * @param item (Array, required): array to evaluate
 * @param n (Number, optional): number of items to return, defaults to 1
 * @returns a single value or an array of values
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
