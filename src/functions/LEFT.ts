import { isNull, isObject, isUndefined } from "lodash"
import FLOOR from "./FLOOR"
import ISNAN from "./ISNAN"

/**
 * Returns n left characters of a string.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/left/
 * @param value (String, required) string to be parsed
 * @param numberOfCharacters (Number, optional) number of characters to be returned, defaults to 1
 * @returns string, number of characters specified
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
