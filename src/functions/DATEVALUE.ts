import { isDate, isString } from "lodash"
import { MaybeString } from "../types/primitives"
import ISNAN from "./ISNAN"
import LPAD from "./LPAD"

export default function DATEVALUE(dateString: string, timeString: string): Date|undefined {
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
