import { includes, isNaN, isString } from "lodash"
import FORMAT from "./FORMAT"
import LPAD from "./LPAD"
import NUM from "./NUM"

/**
 * Adds specified amount of time to a time string.
 * @param startTime required; string specifying a start time: XX:XX
 * @param amount required; number of minutes or hours to be added
 * @param format required; "hours" or "minutes" indicating where amount idicated is to be added
 * @returns time string
 */

export default function TIMEADD(startTime: string, amount: number, format: string): string|undefined
export default function TIMEADD(startTime: any, amount: any, format?: any): string|undefined
export default function TIMEADD(startTime: string, amount: number, format = "hours"): string|undefined {
  if (!isString(startTime) || startTime.length !== 5 || startTime[2] !== ":") { return }

  if (!includes(["hours", "minutes"], format)) { return }

  const time1: string[] = startTime.split(":")

  const beginHour: number = NUM(time1[0])
  const beginMinute: number = NUM(time1[1])

  amount = NUM(amount)

  if ((beginHour > 23 || beginHour < 0) || (beginMinute > 59 || beginMinute < 0)) { return }

  if (isNaN(amount)) { return }

  const minutesToAdd: number = format === "hours" ? amount * 60 : amount

  let date: Date = new Date(0)
  date.setHours(beginHour)
  date.setMinutes(beginMinute)

  let time: number = date.getTime()
  time += (minutesToAdd * 60.0 * 1000.0)

  date = new Date(time)

  return FORMAT("%s:%s",
    LPAD(date.getHours(), 2, "0"),
    LPAD(date.getMinutes(), 2, "0"))
}
