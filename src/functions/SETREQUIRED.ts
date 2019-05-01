import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets a field to required or optional.
 * @param dataName required; data name of targeted field
 * @param value boolean value indicating whether to require field
 * @example
 * 
 * SETREQUIRED("choice_field", true) // set field to required
 * SETREQUIRED("choice_field", false) // make field optional
 */

export default function SETREQUIRED(dataName: FieldName, value: boolean): void
export default function SETREQUIRED(dataName: FieldName, value?: boolean): void
export default function SETREQUIRED(dataName: FieldName, value?: boolean): void {
  const required = value ? !!value : null
  SETFORMATTRIBUTES(dataName, { required })
}