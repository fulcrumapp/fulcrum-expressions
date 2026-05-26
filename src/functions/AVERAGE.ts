import { isEmpty, isFinite, some, sum } from "lodash"
import ARRAY from "./ARRAY"
import { RecursiveArray } from "./FLATTEN"

type AverageValues = Array<number | RecursiveArray<number>>

/**
 * Accepts a list of numbers and returns their average (mean)
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/average/
 * @param values (Number|Array, required): integers or floats
 * @returns integer or float
 * @example
 * AVERAGE(3, 5) // returns 4
 */
export default function AVERAGE(...values: AverageValues): number {
  values = ARRAY(values)

  if (hasNonNumberValues(values) || isEmpty(values)) {
    return NaN
  } else {
    return sum(values) / values.length
  }
}

const hasNonNumberValues = (values: any[]) => some(values, (value) => !isFinite(value))
