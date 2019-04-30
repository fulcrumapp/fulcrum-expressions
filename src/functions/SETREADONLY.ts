import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets a field to read only or removes a read only condition.
 * @param dataName required; data name of the targeted field
 * @param value boolean value indicating whether to set as read only
 * @example
 * 
 * SETREADONLY("role", true) // sets role field to read only
 */

export default function SETREADONLY(dataName: FieldName, value: boolean): void
export default function SETREADONLY(dataName: FieldName, value?: boolean): void
export default function SETREADONLY(dataName: FieldName, value?: boolean): void {
  const disabled = value ? !!value : null
  SETFORMATTRIBUTES(dataName, { disabled })
}