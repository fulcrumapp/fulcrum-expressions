import { groupBy, isArray, isFunction } from "lodash"

/**
 * Returns values grouped according to a passed in iteratee or according to identity
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/group/
 * @param values (Array, required): array of values
 * @param iteratee (Function, optional): function to determine value sorting, defaults to identity (`===`)
 * @returns object of grouped values; keys are determined by the return values of `iteratee`
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
