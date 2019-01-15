import { isNull, isUndefined } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"

/**
 * Sets the minimum length of a field.
 * @param dataName required; data name of the targeted field
 * @param value number representing min length desired
 */

export default function SETMINLENGTH(dataName: string, value: number): void
export default function SETMINLENGTH(dataName: string, value?: any): void
export default function SETMINLENGTH(dataName: string, value?: any): void {
  const min_length = isUndefined(value) || isNull(value) ? null : +value
  SETFORMATTRIBUTES(dataName, { min_length })
}