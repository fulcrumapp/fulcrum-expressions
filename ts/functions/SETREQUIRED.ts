import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets a field to required or optional.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setrequired/
 * @param dataName (String, required): data name of targeted field
 * @param value (Boolean, required): whether to require field
 */

export default function SETREQUIRED(dataName: FieldName, value: boolean): void
export default function SETREQUIRED(dataName: FieldName, value?: boolean): void
export default function SETREQUIRED(dataName: FieldName, value?: boolean): void {
  const required = value ? !!value : null
  SETFORMATTRIBUTES(dataName, { required })
}