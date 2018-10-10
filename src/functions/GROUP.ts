import { groupBy, isArray, isFunction } from "lodash"

/**
 * Returns values grouped according to a passed in iteratee or according to identity
 * @param values required; array of values
 * @param iteratee optional; function to determine value sorting, defaults to identity (`===`)
 * @returns object of grouped values; keys are determined by the return values of `iteratee`
 * @example
 * GROUP([3, 2, 1, 3, 3, 3]) // returns {1: [1], 2: [2], 3: [3, 3, 3, 3]}
 * GROUP([6.1, 4.2, 6.3], Math.floor) // returns { 4: [4.2], 6: [6.1, 6.3] }
 */

export default function GROUP(values: number[], iteratee: Function): {}|undefined
export default function GROUP(values: any[]): {}|undefined
export default function GROUP(values: any[], iteratee?: Function): {}|undefined
export default function GROUP(values: any, iteratee?: Function): {}|undefined
export default function GROUP(values: any[], iteratee?: Function): {}|undefined {
  if (!isArray(values) || values.length === 0) { return undefined }

  if (!isFunction(iteratee)) {
    return groupBy(values)
  } else {
    return groupBy(values, iteratee)
  }
}
