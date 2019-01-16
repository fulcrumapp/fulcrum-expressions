import { isFunction, last, sortBy } from "lodash"
import ARRAY from "./ARRAY"
import FIRST from "./FIRST"

/**
 * Sorts parameters passed in according to an optional callback. Defaults to basic comparison sort sans callback.
 * @param args values to be sorted, optional callback must be passed in last
 * @returns sorted list of values
 * 
 * @example
 * SORT(1, 3, 6, 6, 2) // returns [1, 2, 3 , 6, 6]
 * SORT({test: 2}, {test: 1}, {test: 1}, (a: any, b: any) => a.test) // returns [{test: 1}, {test: 1}, {test: 2}]
 */

export default function SORT(...args: any[]): any[]|undefined {
  args = ARRAY(args)

  if (args.length === 0) { return }

  let callback = null
  let values: any[]|undefined = args

  if (isFunction(last(args))) {
    callback = last(args)
    values = FIRST(args, args.length - 1)
  }

  return sortBy(values, callback)
}
