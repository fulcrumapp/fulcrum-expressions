import { flattenDeep, map } from "lodash"
import { FormFields, RepeatableField, Section } from "../types/fields"

const flattenElements = (elements: FormFields[], recurseRepeatables = true, assignParent = false,
                         parent: FormFields | undefined = undefined, recurseSections = true): FormFields[] =>

  flattenDeep(map(elements, (element) => {
    if (assignParent) {
      element.parent = parent
    }

    const isRecursive =
      (recurseRepeatables && element.type === "Repeatable") ||
      (recurseSections && element.type === "Section")

    if (isRecursive) {
      const container = element as Section | RepeatableField

      if (!container.elements) { return [element] }

      return [element].concat(
        flattenElements(container.elements, recurseRepeatables, assignParent, element, recurseSections),
      )
    } else {
      return [element]
    }
  }))

export default flattenElements
