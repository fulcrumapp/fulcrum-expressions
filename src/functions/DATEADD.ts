import { isNull, isUndefined } from "lodash"
import DATEVALUE from "./DATEVALUE"
import INT from "./INT"
import ISNAN from "./ISNAN"

/**
 * Adds a given number of days to a date.
 * @param date required; Date object or a string representing a string in XXXX-XX-XX format
 * @param number required; number of days to be added as an integer
 * @returns Date object
 * 
 * @example
 * DATEADD("2012-03-04", 5) // returns 2012-03-09T00:00:00.000Z
 */

export default function DATEADD(date: Date|MaybeString, number: number): Date|undefined {
  date = DATEVALUE(date)
  number = INT(number)

  if (isNull(date) || isUndefined(date)) { return }
  if (ISNAN(number)) { return }

  date.setDate(date.getDate() + number)

  return date
}