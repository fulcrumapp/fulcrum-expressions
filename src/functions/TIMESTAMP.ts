import { isUndefined } from "lodash"
import FORMAT from "./FORMAT"
import LPAD from "./LPAD"

/**
 * Returns a time stamp given a date object.
 * @param date optional; Date object - if nothing is passed in to TIMESTAMP, today's timestamp will be returned
 * @returns a string timestamp in YYYY-MM-DD HH:MM:SS format
 * @example
 * TIMESTAMP("December 16, 1982 03:24:00") // returns "1982-12-16 03:24:00"
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
