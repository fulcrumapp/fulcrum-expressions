import SETREADONLY from "./SETREADONLY"
import { FieldName } from "../types/fields"

/**
 * Disables a field.
 * 
 * @param dataName (String, required): data name of field
 * @param value (Boolean, required): whether to disable field
 */

export default function SETDISABLED(dataName: FieldName, value: boolean): void
export default function SETDISABLED(dataName: FieldName, value?: boolean): void
export default function SETDISABLED(dataName: FieldName, value?: boolean): void {
  SETREADONLY(dataName, value)
}