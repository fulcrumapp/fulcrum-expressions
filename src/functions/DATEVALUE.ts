import { isDate, isString } from "lodash"
import { MaybeString } from "../types/primitives"
import ISNAN from "./ISNAN"
import LPAD from "./LPAD"

/**
 * Returns a date value given a date and optional time string
 * @param dateString required; string representing a date or a Date object
 * @param timeString optional; string representing a time
 * @returns Date value
 * @example
 * DATEVALUE("2018-02-07") // returns 2018-02-07T00:00:00.000Z
 * DATEVALUE("2018-02-07", "06:01") // returns 2018-02-07T06:01:00.000Z
 */

export default function DATEVALUE(dateString: string, timeString: string): Date
export default function DATEVALUE(dateString: Date, timeString?: string): Date
export default function DATEVALUE(dateString: string): Date
export default function DATEVALUE(dateString: Date): Date
export default function DATEVALUE(): undefined
export default function DATEVALUE(dateString?: Date|MaybeString, timeString?: string): Date|undefined {
  if (isDate(dateString)) {
    const year: number = dateString.getFullYear()
    const month: MaybeString = LPAD(dateString.getMonth() + 1, 2, "0")
    const day: MaybeString = LPAD(dateString.getDate(), 2, "0")

    dateString = year + "-" + month + "-" + day
  }

  if (!isString(dateString)) { return undefined }

  if (!isString(timeString)) { timeString = "00:00:00" }

  if (timeString.length === 5) { timeString = timeString + ":00" }

  let date: Date

  if (dateString.length <= 10) {
    dateString = dateString.replace(/-/g, "/")
    date = new Date(dateString + " " + timeString)
  } else {
    date = new Date(dateString)
  }
  if (ISNAN(date.getTime())) { return undefined }

  return date
}
