import { isArray, isNull, isUndefined, map } from "lodash"
import { FormFields, RepeatableField } from "../types/fields"
import repeatableValueElements from "./repeatable-value-elements"
import valueForElement from "./value-for-element"

/**
 * Returns an array of values for a specific field contained in a repeatable.
 * @param repeatable required; the repeatable field containing the desired field
 * @param items required; array of objects in this format: { form_values: { form_key: value } }
 * @param dataName required; data name of desired field
 * @returns array of values
 */

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
