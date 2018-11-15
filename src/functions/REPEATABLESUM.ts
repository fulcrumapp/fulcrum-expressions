import { filter } from "lodash"
import ISNUMBER from "./ISNUMBER"
import REPEATABLEVALUES from "./REPEATABLEVALUES"
import SUM from "./SUM"

/**
 * Returns the sum of all the numeric form values in a repeatable field.
 * @param repeatableValue required; array of form_value objects: [ { id: 1, form_values: "value" } ]
 * @param dataName required; data name of desired field or an array of data names
 * @returns sum of numeric form values
 */

export default function REPEATABLESUM(repeatableValue: any[], dataName: string|string[]): number {
  const repeatableValues: number[] = filter(REPEATABLEVALUES(repeatableValue, dataName), ISNUMBER)
  return SUM.apply(null, repeatableValues)
}
