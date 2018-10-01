import { isNull, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import DATEVALUE from "./DATEVALUE"

export default function DAY(date: Date): number
export default function DAY(date: MaybeString): number
export default function DAY(): undefined
export default function DAY(date?: MaybeString|Date): number|undefined {
  date = DATEVALUE(date)

  if (isUndefined(date) || isNull(date)) { return undefined }
  return date.getDate()
}
