import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets a field to read only or removes a read only condition.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setreadonly/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Boolean, required): whether to set as read only
 */

export default function SETREADONLY(dataName: FieldName, value: boolean): void
export default function SETREADONLY(dataName: FieldName, value?: boolean): void
export default function SETREADONLY(dataName: FieldName, value?: boolean): void {
  const disabled = value ? !!value : null
  SETFORMATTRIBUTES(dataName, { disabled })
}