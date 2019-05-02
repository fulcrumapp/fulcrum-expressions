import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets a field to hidden or visible.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/sethidden/
 * @param dataName (String, required): data name of targeted field
 * @param value (Boolean, required): whether to hide field
 */

export default function SETHIDDEN(dataName: FieldName, value: boolean): void
export default function SETHIDDEN(dataName: FieldName, value?: boolean): void
export default function SETHIDDEN(dataName: FieldName, value?: boolean): void {
  const hidden = value ? !!value : null
  SETFORMATTRIBUTES(dataName, { hidden })
}