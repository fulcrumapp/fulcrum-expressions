import { isNumber, isString } from "lodash"
import { MaybeString } from "../primitives"

export default function CODE(str: MaybeString): number
export default function CODE(str: number): number
export default function CODE(str: Object): number
export default function CODE(str: any[]): number
export default function CODE(): number
export default function CODE(str?: any): number {
  if (isNumber(str)) { str = str.toString() }
  if (!isString(str)) { return NaN }
  return str.charCodeAt(0)
}
