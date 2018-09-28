import INT from "./INT"
import ISNAN from "./ISNAN"

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
