import { flattenDeep, isArray } from "lodash"

export interface RecursiveArray<T> extends Array<T|RecursiveArray<T>> {}

/**
 * Accepts a nested array and returns an array flattened to one level deep
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/flatten/
 * @param value (Array, required): nested array to be flattened
 * @returns a flattened array
 * @example
 * FLATTEN([1, [2, [3]]]) // returns [1, 2, 3]
 */

export default function FLATTEN(value: RecursiveArray<any>): any[]
export default function FLATTEN(value: any): any[] {
  // return null if value is not an array, otherwise return a flattened array
  return isArray(value) ? flattenDeep(value) : []
}
