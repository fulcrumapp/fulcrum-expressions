import { FormFields, RepeatableField } from "../types/fields"
import flattenElements from "./flatten-elements"

interface RepeatableElementsCache {
  [key: string]: FormFields[]
}

interface RepeatableElements {
  [key: string]: FormFields
}

interface RepeatableElementsByKey {
  [key: string]: RepeatableElements
}

interface RepeatableElementsByDataName {
  [dataName: string]: RepeatableElements
}

interface RepeatableValueElementsResult {
  all: FormFields[],
  byDataName: RepeatableElements,
  byKey: RepeatableElements,
}

// exporting for tests
export const repeatableValueElementsCache: RepeatableElementsCache = {}
export const repeatableValueElementsByKeyCache: RepeatableElementsByKey = {}
export const repeatableValueElementsByDataNameCache: RepeatableElementsByDataName = {}

/**
 * Returns an object that has the elements of a repeatable field.
 * @param repeatable required; Repeatable field
 * @returns
 *  Object contains three keys:
 * `all`: contains all elements of the repeatable field as an array of FormFields.
 * `byDataName`: contains all first-level elements of a repeatable field by data_name.
 * `byKey`: contains all first-level elements of a repeatable field by the form field's 4 digit key
 */

export default function repeatableValueElements(repeatable: RepeatableField): RepeatableValueElementsResult {
  const key: string = repeatable.key

  // if element is already cached, simply pull values from cache
  if (repeatableValueElementsCache[key]) {
    const cached = {
      all: repeatableValueElementsCache[key],
      byDataName: repeatableValueElementsByDataNameCache[key],
      byKey: repeatableValueElementsByKeyCache[key],
    }

    return cached
  }

  // otherwise, returns the elements within the repeatable (non-recursively) and add them to the cache
  const elements: FormFields[] = flattenElements(repeatable.elements, false)

  repeatableValueElementsCache[key] = elements
  const byKey: RepeatableElements = repeatableValueElementsByKeyCache[key] = {}
  const byDataName: RepeatableElements = repeatableValueElementsByDataNameCache[key] = {}

  for (const element of elements) {
    byKey[element.key] = element
    byDataName[element.data_name] = element
  }

  return {
           all: repeatableValueElementsCache[key],
           byDataName: repeatableValueElementsByDataNameCache[key],
           byKey: repeatableValueElementsByKeyCache[key],
          }
}
