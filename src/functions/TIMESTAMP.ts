import { isUndefined } from "lodash"
import FORMAT from "./FORMAT"
import LPAD from "./LPAD"

/**
 * Returns a time stamp given a date object for display only. As it does not contain a timezone, it should not 
 * be used to perform calculations such as time deltas.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timestamp/
 * @param date (Date, optional): if no Date object is passed in to TIMESTAMP, today's timestamp will be returned
 * @returns a string timestamp in YYYY-MM-DD HH:MM:SS format
 */

export default function TIMESTAMP(date: Date): string
export default function TIMESTAMP(date?: Date): string
export default function TIMESTAMP(date?: Date): string {
  if (isUndefined(date)) { date = new Date() }

  return FORMAT("%s-%s-%s %s:%s:%s",
    date.getFullYear(),
    LPAD(date.getMonth() + 1, 2, "0"),
    LPAD(date.getDate(), 2, "0"),
    LPAD(date.getHours(), 2, "0"),
    LPAD(date.getMinutes(), 2, "0"),
    LPAD(date.getSeconds(), 2, "0"))
}
