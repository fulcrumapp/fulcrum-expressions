import { isFunction, last, uniq, uniqBy } from "lodash"
import ARRAY from "./ARRAY"
import FIRST from "./FIRST"

/**
 * Evaluates an array of items for unqiueness and returns an array devoid of duplicates.
 * If objects to be compared require an iteratee to extract data, it should be passed in as the last argument.
 * @param args required; items to be evaluated
 * @returns an array of unique items
 * @example
 * UNIQUE(1, 2, 5, 6, 3, 2, 1) // returns [ 1, 2, 5, 6, 3]
 * UNIQUE({test: 1}, {test: 1}, {test: 2}, (a: any) => a.test) //     returns [{test: 1}, {test: 2}]
 */

export default function UNIQUE(...args: any[]): any[]|undefined {
  args = ARRAY(args)

  if (args.length === 0) { return undefined }

  let callback: Function|null = null
  let values: any[]|undefined = args

  if (isFunction(last(args))) {
    callback = last(args)
    values = FIRST(args, args.length - 1)
    // @ts-ignore callback is function used to extract comparison criteria
    return uniqBy(values, callback)
  } else {
    return uniq(values)
  }
}
