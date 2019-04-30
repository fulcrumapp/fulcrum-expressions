import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets a field to hidden or visible.
 * @param dataName required; data name of targeted field
 * @param value boolean value indicating whether to hide field
 * @example
 * 
 * SETHIDDEN("choice_field", true) // hide field
 * SETHIDDEN("choice_field", false) // make field visible
 */

export default function SETHIDDEN(dataName: FieldName, value: boolean): void
export default function SETHIDDEN(dataName: FieldName, value?: boolean): void
export default function SETHIDDEN(dataName: FieldName, value?: boolean): void {
  const hidden = value ? !!value : null
  SETFORMATTRIBUTES(dataName, { hidden })
}