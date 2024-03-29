import { isFinite, isString, isUndefined } from "lodash"
import FLOOR from "./FLOOR"
import LEFT from "./LEFT"

/**
 * Returns a string padded to the right by a desired character.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rpad/
 * @param value (String, required): string value to be padded
 * @param count (Number, required): length desired in returned value
 * @param padding (String, optional): character with which the `value` is to be padded; defaults to `" "`
 * @returns a padded string value
 * @example
 * RPAD('1', 2, '0') // returns "10"
 */

export default function RPAD(value: string, count: number, padding?: string): string
export default function RPAD(value: any, count: any, padding?: any): string|undefined
export default function RPAD(value: any, count: any, padding=' '): string|undefined {
  count  = FLOOR(count)
  value  = isUndefined(value) ? "" : value.toString()

  if (!isFinite(count) || !isString(padding)) { return }

  return LEFT(value + Array(count).join(padding), count)
}
