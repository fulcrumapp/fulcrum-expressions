import { includes, isString } from "lodash"
import NUM from "./NUM"

export default function TIMEDIFF(startTime: string, endTime: string, format= "hours"): number|undefined {
  if (!isString(startTime) || startTime.length !== 5 || startTime[2] !== ":") { return }
  if (!isString(endTime) || endTime.length !== 5 || endTime[2] !== ":") { return }

  if (!includes(["hours", "minutes"], format)) { return }

  const time1: string[] = startTime.split(":")
  const time2: string[] = endTime.split(":")

  const beginHour: number = NUM(time1[0])
  const beginMinute: number = NUM(time1[1])

  const endHour: number = NUM(time2[0])
  const endMinute: number = NUM(time2[1])

  if ((beginHour > 23 || beginHour < 0) || (endHour > 23 || endHour < 0)) { return }
  if ((beginMinute > 59 || beginMinute < 0) || (endMinute > 59 || endMinute < 0)) { return }

  const beginMinutes: number = (beginHour * 60) + beginMinute
  const endMinutes: number = (endHour * 60) + endMinute

  let totalMinutes: number = (endMinutes - beginMinutes)

  if (totalMinutes === 0) {
    totalMinutes = 1440
  } else if (totalMinutes < 0) {
    totalMinutes = 1440 + totalMinutes
  }

  return format === "hours" ? totalMinutes / 60 : totalMinutes
}
