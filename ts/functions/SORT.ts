import { isFunction, last, sortBy } from "lodash"
import ARRAY from "./ARRAY"
import FIRST from "./FIRST"

/**
 * Sorts parameters passed in according to an optional callback.
 * Defaults to basic alphabetic/numeric sort sans callback.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sort/
 * @param args (Array|Any...Function, required): values to be sorted, optional callback must be passed in last
 * @returns sorted list of values
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
