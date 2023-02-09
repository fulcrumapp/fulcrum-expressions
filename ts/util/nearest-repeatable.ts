import { isNull, isUndefined } from "lodash"
import { FormFields } from "../types/fields"

/**
 * Returns the nearest repeatable when passed in a child field.
 */
export default function nearestRepeatable(element: FormFields): FormFields|null
export default function nearestRepeatable(element?: any): FormFields|null
export default function nearestRepeatable(element?: any): FormFields|null {
  let iterator: FormFields|undefined
  if (!isNull(element) && !isUndefined(element)) { iterator = element.parent }

  while (iterator) {
    if (iterator.type === "Repeatable") { return iterator }

    iterator = iterator.parent
  }

  return null
}
