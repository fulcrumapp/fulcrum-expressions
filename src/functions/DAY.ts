import { isNull, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import DATEVALUE from "./DATEVALUE"

/**
 * Returns a day given a date.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/day/
 * @param date (Date|String, required): Date object or a string in XXXX-XX-XX format
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 */

export default function DAY(date: Date): number
export default function DAY(date: MaybeString): number
export default function DAY(): undefined
export default function DAY(date?: MaybeString | Date): number|undefined {
  const dateValue: Date = DATEVALUE(date)

  if (isUndefined(dateValue) || isNull(dateValue)) { return undefined }

  return dateValue.getDate()
}
