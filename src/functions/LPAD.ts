import { isNaN, isNull, isString, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import FLOOR from "./FLOOR"
import NUM from "./NUM"
import RIGHT from "./RIGHT"

/**
 * Returns a string padded to the left with a character of choice.
 * @param value required; string to be padded
 * @param count required; integer indicating the total length of the desired string
 * @param padding option; string, character to use for padding, defaults to " "
 * @returns a padded string
 * @example
 * LPAD("abc", 5) // returns "  abc"
 * LPAD("abc", 5, "0") // returns "00abc"
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
