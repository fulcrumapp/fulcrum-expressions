import { isNull, isUndefined } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"

/**
 * Sets the max length of a field.
 * @param dataName required; data name of the targeted field
 * @param value number representing max length desired
 */

export default function SETMAXLENGTH(dataName: string, value: number): void
export default function SETMAXLENGTH(dataName: string, value?: any): void
export default function SETMAXLENGTH(dataName: string, value?: any): void {
  const max_length = isUndefined(value) || isNull(value) ? null : +value
  SETFORMATTRIBUTES(dataName, { max_length })
}
