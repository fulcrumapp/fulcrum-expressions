import { isNull, isUndefined } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"

/**
 * Sets the description of a field.
 * @param dataName required; data name of targeted field
 * @param value value to which description should be set
 */

export default function SETDESCRIPTION(dataName: string, value: string): void
export default function SETDESCRIPTION(dataName: string, value?: any): void
export default function SETDESCRIPTION(dataName: string, value?: any): void {
  const description = isNull(value) || isUndefined(value) ? null : value.toString()
  SETFORMATTRIBUTES(dataName, { description } )
}
