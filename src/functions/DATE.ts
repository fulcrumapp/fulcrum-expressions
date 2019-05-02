import INT from "./INT"
import ISNAN from "./ISNAN"

/**
 * Returns a new Date object given a year, month, and day.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/date/
 * @param year (Number, required): four-digit number
 * @param month (Number, required): one-two digit number
 * @param day (Number, required): one-two digit number
 * @returns Date object
 */

export default function DATE(year: number, month: number, day: number): Date
export default function DATE(year: string, month: string, day: string): Date | undefined
export default function DATE(year?: any, month?: any, day?: any): undefined
export default function DATE(): undefined
export default function DATE(year?: any, month?: any, day?: any): Date | undefined {
  year = INT(year)
  month = INT(month)
  day = INT(day)

  if (ISNAN(year) || ISNAN(month) || ISNAN(day)) { return undefined }

  return new Date(`${year}/${month}/${day} 00:00:00`)
}
