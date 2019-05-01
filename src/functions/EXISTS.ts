import { filter, toArray } from "lodash"
import ISBLANK from "./ISBLANK"

/**
 * Checks whether all values passed in exist.
 * @param args list of items to check
 * @returns boolean value indicating whether all values exist
 * @example
 * EXISTS(1, 3, 7, 0) // returns true
 * EXISTS(1, null, 7, 0) // returns false
 */

export default function EXISTS(arg: any, ...args: any[]): arg is number | boolean | string | object
export default function EXISTS(...args: any[]): boolean
export default function EXISTS(...args: any[]): boolean {
  const valuesAreBlank: boolean[] = toArray(args).map(ISBLANK)
  const totalBlankValues: boolean[] = filter(valuesAreBlank)

  return totalBlankValues.length === 0
}
