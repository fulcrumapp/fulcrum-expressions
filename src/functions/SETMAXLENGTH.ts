import { isNull, isUndefined } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets the max length of a field.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setmaxlength/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Number, required): max length desired
 */

export default function SETMAXLENGTH(dataName: FieldName, value: number): void
export default function SETMAXLENGTH(dataName: FieldName, value?: any): void
export default function SETMAXLENGTH(dataName: FieldName, value?: any): void {
  const max_length = isUndefined(value) || isNull(value) ? null : +value
  SETFORMATTRIBUTES(dataName, { max_length })
}
