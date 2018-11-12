import { flatten, isArray, isNull, isUndefined } from "lodash"
import { FormFields } from "../types/fields"
import nearestRepeatable from "../util/nearest-repeatable"
import repeatableValues from "../util/repeatable-values"

/**
 * Returns a specific field out of a collection of repeatable items.
 */

export default function REPEATABLEVALUES(repeatableValue: any[], dataName: string[]|string): any[] {
  if (isArray(dataName)) {
    if (dataName.length === 1) {
      dataName = dataName[0]
    } else {
      const repeatableDataName: string = dataName[0]
      const restOfDataNames: string[] = dataName.slice(1)

      const childValues: any[]|undefined = REPEATABLEVALUES(repeatableValue, repeatableDataName).map((item) =>
      REPEATABLEVALUES(item, restOfDataNames))

      return flatten(childValues)
    }
  }
  const dataElement: FormFields = $$runtime.elementsByDataName[dataName]

  if (isUndefined(dataElement) || isNull(dataElement)) { return }

  const repeatableElement = nearestRepeatable(dataElement)

  if (isUndefined(repeatableElement) || isNull(repeatableElement)) { return }

  return repeatableValues(repeatableElement, repeatableValue, dataName)
}
