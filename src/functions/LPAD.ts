import { isNaN, isNull, isString, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import FLOOR from "./FLOOR"
import RIGHT from "./RIGHT"

/**
 * Returns a string padded to the left with a character of choice.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lpad/
 * @param value (String, required): string to be padded
 * @param count (Number, required): integer indicating the total length of the desired string
 * @param padding (String, option): character to use for padding, defaults to " "
 * @returns a padded string
 * @example
 * LPAD("abc", 5) // returns "  abc"
 */

export default function LPAD(value: string, count: number, padding?: string): MaybeString
export default function LPAD(value: any, count: any, padding?: any): MaybeString
export default function LPAD(): undefined
export default function LPAD(value?: any, count?: any, padding = " "): MaybeString  {
  count  = FLOOR(count)
  if (isUndefined(value) || isNull(value)) { value = "" }
  if (isNaN(count)) { return undefined }
  if (!isString(padding)) { return undefined }

  value  = value.toString()
  return RIGHT(Array(count).join(padding) + value, count)
}
