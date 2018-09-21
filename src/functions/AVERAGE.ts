import ARRAY from './ARRAY';
import { some, isFinite, sum, isEmpty } from "lodash"
import { RecursiveArray } from './FLATTEN';

type AverageValues = (number | RecursiveArray<number>)[]

/**
 * Accepts a list of numbers and returns their average (mean)
 * @param multiple integers or floats
 * @returns integer or float
 * @example
 * AVERAGE(3, 5) // returns 4
 * AVERAGE(1, 1.5, 3.75) // returns 2.0833333333333335
 */
export default function AVERAGE(...values : AverageValues) : number {
  values = ARRAY(values)

  if (hasNonNumberValues(values) || isEmpty(values)) {
    return NaN
  } else {
    return sum(values) / values.length
  }
}

const hasNonNumberValues = (values: any[]) => some(values, (value) => !isFinite(value))

