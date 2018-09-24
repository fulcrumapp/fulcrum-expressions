import { isNumber, isString } from "lodash"
import { MaybeString } from "../primitives"

/**
 * Returns numeric code for first character in passed in string
 * @param str string
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 * CODE("apple") // returns 97
 * CODE(9) // returns 57
 */

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
