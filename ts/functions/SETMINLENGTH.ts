import { isNull, isUndefined } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets the minimum length of a field.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setminlength/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Number, required): min length desired
 */

export default function SETMINLENGTH(dataName: FieldName, value: number): void
export default function SETMINLENGTH(dataName: FieldName, value?: any): void
export default function SETMINLENGTH(dataName: FieldName, value?: any): void {
  const min_length = isUndefined(value) || isNull(value) ? null : +value
  SETFORMATTRIBUTES(dataName, { min_length })
}