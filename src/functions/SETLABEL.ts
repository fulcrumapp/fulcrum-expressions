import { isNull, isUndefined } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"

/**
 * Sets the label of a field.
 * @param dataName required; data name of targeted field
 * @param value value to which label should be set
 */

export default function SETLABEL(dataName: string, value: string): void
export default function SETLABEL(dataName: string, value?: any): void
export default function SETLABEL(dataName: string, value?: any): void {
  const label = isNull(value) || isUndefined(value) ? null : value.toString()
  SETFORMATTRIBUTES(dataName, { label } )
}