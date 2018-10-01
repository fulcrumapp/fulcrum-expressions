import { isNull, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import DATEVALUE from "./DATEVALUE"

/**
 * Returns a day given a date.
 * @param date required; date, either as a Date object or a string
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 * DAY(new Date("2015/12/16 00:00:00") // returns 16
 */

export default function DAY(date: Date): number
export default function DAY(date: MaybeString): number
export default function DAY(): undefined
export default function DAY(date?: MaybeString | Date): number|undefined {
  const dateValue: Date = DATEVALUE(date)

  if (isUndefined(dateValue) || isNull(dateValue)) { return undefined }

  return dateValue.getDate()
}
