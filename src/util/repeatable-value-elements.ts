import { FormFields, RepeatableField } from "../types/fields"
import flattenElements from "./flatten-elements"

interface RepeatableElementsCache {
  [key: string]: FormFields[]
}

interface RepeatableElements {
  [key: string]: FormField
}

interface RepeatableElementsByKey {
  [key: string]: RepeatableElements
}

interface RepeatableElementsByDataName {
  [dataName: string]: RepeatableElements
}

// exporting for tests
export const repeatableValueElementsCache: RepeatableElementsCache = {}
export const repeatableValueElementsByKeyCache: RepeatableElementsByKey = {}
export const repeatableValueElementsByDataNameCache: RepeatableElementsByDataName = {}

export default function repeatableValueElements(repeatable: RepeatableField): {} {
  const key: string = repeatable.key

  // if element is already cached
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
