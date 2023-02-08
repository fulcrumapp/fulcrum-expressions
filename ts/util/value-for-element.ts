import { FormFields } from "../types/fields"
import dateValue from "./date-value"
import isDateElement from "./is-date-element"
import isNumericElement from "./is-numeric-element"
import numberValue from "./number-value"

/**
 * Returns a value for an element.
 * @description
 * Function converts numeric field values into numbers and date field
 * values into Date instances. Otherwise, it returns the value passed in.
 * @param element required; Form field object to be evaluated
 * @param value required; form value in need of conversion
 * @returns number for numeric fields, Date instances for date fields, else the original value.
 */

export default function valueForElement(element: FormFields, value: number|string): number
export default function valueForElement(element: FormFields, value: string): Date
export default function valueForElement(element: FormFields, value: any): any
export default function valueForElement(element: FormFields, value: any): any {
  if (isNumericElement(element)) {
    return numberValue(value)
  } else if (isDateElement(element)) {
    return dateValue(value)
  } else {
    return value
  }
}
