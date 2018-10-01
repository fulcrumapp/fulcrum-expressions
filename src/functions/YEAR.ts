import { isNull, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import DATEVALUE from "./DATEVALUE"

/**
 * Returns a year given a date.
 * @param date required; date, either as a Date object or a string
 * @returns year as numeric value
 * @example
 * YEAR("2015/12/16") // returns 2015
 * YEAR(new Date("2015/12/16 00:00:00") // returns 2015
 */

export default function YEAR(date: Date): number
export default function YEAR(date: MaybeString): number
export default function YEAR(): undefined
export default function YEAR(date?: MaybeString | Date): number|undefined {
  const dateValue: Date = DATEVALUE(date)

  if (isUndefined(dateValue) || isNull(dateValue)) { return undefined }

  return dateValue.getFullYear()
}
