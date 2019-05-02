import { isNull, isObject, isUndefined } from "lodash"
import FLOOR from "./FLOOR"
import ISNAN from "./ISNAN"

/**
 * Returns a specific number of characters from a text string.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mid/
 * @param value (String, required): text to be parsed
 * @param startPosition (Number, required): numeric value indicating parsing starting position
 * @param numberOfCharacters (Number, required): number of chars one wants returned
 * @returns string
 * @example
 * MID("abcd", 2, 2) // returns "bc"
 */

export default function MID(value: string,
                            startPosition: number,
                            numberOfCharacters: number): string|undefined
export default function MID(value: string,
                            startPosition: string,
                            numberOfCharacters: string): string|undefined
export default function MID(value?: any,
                            startPosition?: any,
                            numberOfCharacters?: any): string|undefined
export default function MID(value?: any,
                            startPosition?: any,
                            numberOfCharacters?: any): string|undefined {

  startPosition = FLOOR(startPosition)
  numberOfCharacters = FLOOR(numberOfCharacters)

  if (
    isNull(value) ||
    isUndefined(value) ||
    isObject(value) ||
    startPosition < 1 ||
    ISNAN(startPosition) ||
    numberOfCharacters < 0 ||
    ISNAN(numberOfCharacters)
    ) { return }

  value = value.toString()
  return value.substr(startPosition - 1, numberOfCharacters)
}
