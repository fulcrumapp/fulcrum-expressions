import { isNull, isObject, isUndefined } from "lodash"
import { MaybeString } from "../types/primitives"
import FLOOR from "./FLOOR"
import ISNAN from "./ISNAN"

/**
 * Returns the right characters of a string, i.e. the characters starting at index -1
 * @param value required; string
 * @param numberOfCharacters optional; number indicating the amount of characters to be returned
 * @returns a substring of characters
 * @example
 * RIGHT("abc") // returns "c"
 * RIGHT("abc", 2) // returns "bc"
 */
export default function RIGHT(value: string, numberOfCharacters: number): MaybeString
export default function RIGHT(value: any, numberOfCharacters?: any): MaybeString
export default function RIGHT(): undefined
export default function RIGHT(value?: string, numberOfCharacters?: number): MaybeString {
  if (isUndefined(numberOfCharacters)) { numberOfCharacters = 1 }
  numberOfCharacters = FLOOR(numberOfCharacters)

  // check value validity
  if (isNull(value) || isUndefined(value) || isObject(value)) {
    return undefined
  }
  // check numberOfCharacters validity
  if (numberOfCharacters < 0 || ISNAN(numberOfCharacters)) {
    return undefined
  }

  value = value.toString()
  return value.substring(value.length - numberOfCharacters)
}
