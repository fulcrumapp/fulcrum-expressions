import { isNull, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import DATEVALUE from "./DATEVALUE"

/**
 * Returns a month given a date.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/month/
 * @param date (Date|String, required): date object or string in "XXXX-XX-XX" format
 * @returns month as numeric value
 * @example
 * MONTH("2015-12-16") // returns 12
 */

export default function MONTH(date: Date): number
export default function MONTH(date: MaybeString): number
export default function MONTH(): void
export default function MONTH(date?: Date|MaybeString): number|void {
  const dateValue: Date = DATEVALUE(date)

  if (isUndefined(dateValue) || isNull(dateValue)) { return undefined }

  return dateValue.getMonth() + 1
}
