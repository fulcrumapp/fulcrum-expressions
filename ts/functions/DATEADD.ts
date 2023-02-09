import { isNull, isUndefined } from "lodash"
import DATEVALUE from "./DATEVALUE"
import INT from "./INT"
import ISNAN from "./ISNAN"
import { MaybeString } from "../types/primitives"

/**
 * Adds a given number of days to a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/dateadd/
 * @param date (Date|String, required): Date object or string in XXXX-XX-XX format
 * @param number (Number, required): number of days to be added as an integer
 * @returns Date object
 */

export default function DATEADD(date: Date|MaybeString, number: number): Date|undefined {
  date = DATEVALUE(date)
  number = INT(number)

  if (isNull(date) || isUndefined(date)) { return }
  if (ISNAN(number)) { return }

  date.setDate(date.getDate() + number)

  return date
}