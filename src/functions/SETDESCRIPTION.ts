import { isNull, isUndefined } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { FieldName } from "../types/fields"

/**
 * Sets the description of a field.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setdescription/
 * @param dataName (String, required): data name of targeted field
 * @param value (Stirng, required): value to which description should be set
 */

export default function SETDESCRIPTION(dataName: FieldName, value: string): void
export default function SETDESCRIPTION(dataName: FieldName, value?: any): void
export default function SETDESCRIPTION(dataName: FieldName, value?: any): void {
  const description = isNull(value) || isUndefined(value) ? null : value.toString()
  SETFORMATTRIBUTES(dataName, { description } )
}
