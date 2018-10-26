import { isNull, isObject, isUndefined } from "lodash"
import FLOOR from "./FLOOR"
import ISNAN from "./ISNAN"

/**
 * Returns n left characters of a string.
 * @param value required; string
 * @param numberOfCharacters optional; number of characters to be returned. If not specified
 * one character will be returned
 * @returns string; number of characters specified
 * @example
 * LEFT("Hello, World", 3) // returns "Hel"
 */

export default function LEFT(value: string, numberOfCharacters?: number): string|undefined
export default function LEFT(value: any, numberOfCharacters?: string): string|undefined
export default function LEFT(value: string): string|undefined
export default function LEFT(value: any, numberOfCharacters?: any): string|undefined
export default function LEFT(value: any, numberOfCharacters?: any): string|undefined {

  if (isUndefined(numberOfCharacters)) { numberOfCharacters = 1}
  numberOfCharacters = FLOOR(numberOfCharacters)

  if (isUndefined(value) ||
      isNull(value) ||
      isObject(value) ||
      numberOfCharacters < 0 ||
      ISNAN(numberOfCharacters)
      ) { return }

  value = value.toString()

  return value.substring(0, numberOfCharacters)
}
