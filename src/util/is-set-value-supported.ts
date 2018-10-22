import { find, isNull, isUndefined } from "lodash"
import { FormFields} from "../types/fields"
import { converters } from "./converters"
import flattenElements from "./flatten-elements"

export default function isSetValueSupported(containerElements: FormFields[],
                                            dataElement: FormFields,
                                            type: string): boolean {

  if (isUndefined(converters[type]) || isNull(converters[type])) { return false }

  // Make sure the element is contained within the current editing scope. We need to make sure
  // that the element is within the repeatable being edited and not further nested as a child or
  // part of an ancestor.
  const validElements = flattenElements(containerElements, false)

  const foundElement = find(validElements, (e) => e.key === dataElement.key)

  return !!foundElement
}
