import { isNull, isString, isUndefined } from "lodash"
import ERROR from "./ERROR"
import SETVALUE from "./SETVALUE"

/**
 * Sets record's status.
 * @param status status value, string
 */

export default function SETSTATUS(status: string): void
export default function SETSTATUS(status?: any): void
export default function SETSTATUS(status?: any): void {
  if (!(isUndefined(status) || isNull(status)) && !isString(status)) {
    ERROR('status must be a string')
  }

  SETVALUE('@status', status)
}
