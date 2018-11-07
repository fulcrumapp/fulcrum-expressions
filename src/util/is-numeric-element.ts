import { isUndefined } from "lodash"
import { FormFields } from "../types/fields"

/**
 * Checks element passed in to see if the element is numeric in nature.
 * @param element required; a form field to be checked
 * @returns boolean indiciating if element is numeric
 */

export default function isNumericElement(element: FormFields) {
  return (element.numeric ||
          (!isUndefined(element.display) &&
          (element.display.style === "number" || element.display.style === "currency"))
        )
}
