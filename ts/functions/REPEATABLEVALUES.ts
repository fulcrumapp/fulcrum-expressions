import { flatten, isArray, isNull, isUndefined } from "lodash"
import { FormFields, FieldName } from "../types/fields"
import nearestRepeatable from "../util/nearest-repeatable"
import repeatableValues from "../util/repeatable-values"

/**
 * Returns a specific field out of a collection of repeatable items.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/repeatablevalues/
 * @param repeatableValue (Array, required): array of form_value objects: `[ { id: 1, form_values: "value" } ]`
 * @param dataName (String|Array, required): data name of desired field or an array of data names
 * @returns array of values
 */

export default function REPEATABLEVALUES(repeatableValue: any[], dataName: FieldName[] | FieldName): any[]|undefined|null {
  if (isArray(dataName)) {
    if (dataName.length === 1) {
      dataName = dataName[0]
    } else {
      const repeatableDataName: string = dataName[0]
      const restOfDataNames: string[] = dataName.slice(1)
      const parentValues = REPEATABLEVALUES(repeatableValue, repeatableDataName)
      
      if (isUndefined(parentValues) || isNull(parentValues)) { return }
    
      const childValues: any[]|undefined = parentValues.map((item) =>
      REPEATABLEVALUES(item, restOfDataNames))

      return flatten(childValues)
    }
  }
  const dataElement: FormFields = $$runtime.elementsByDataName[dataName]

  if (isUndefined(dataElement) || isNull(dataElement)) { return }

  const repeatableElement: FormFields|null = nearestRepeatable(dataElement)

  if (isUndefined(repeatableElement) || isNull(repeatableElement)) { return }

  return repeatableValues(repeatableElement, repeatableValue, dataName)
}
