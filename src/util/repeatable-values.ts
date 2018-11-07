import { isArray, isNull, isUndefined, map } from "lodash"
import { FormFields, RepeatableField } from "../types/fields"
import repeatableValueElements from "./repeatable-value-elements"
import valueForElement from "./value-for-element"

// items: [ { form_values: { '89hu': "test"} }, { form_values: { '76tv': 9876 } } ]

export default function repeatableValues(repeatable: RepeatableField,
                                         items: any[],
                                         dataName: string): null|any[] {

  if (!isArray(items)) { return null }

  const { byDataName } = repeatableValueElements(repeatable)

  const element: FormFields = byDataName[dataName]

  if (isNull(element) || isUndefined(element)) { return null }

  const values: any[] = map(items, (item) => {
    return valueForElement(element, item.form_values[element.key])
  })

  return values
}
