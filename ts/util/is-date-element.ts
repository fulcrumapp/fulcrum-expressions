import { FormFields } from "../types/fields"

/**
 * Checks if an element is a Date Field or not.
 * @param element required; form field to be checked
 * @returns boolean indicating if it is a date field
 */

export default function isDateElement(element: FormFields) {
  return (element.type === "DateTimeField")
}
