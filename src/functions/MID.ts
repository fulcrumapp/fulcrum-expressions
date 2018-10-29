import { isNull, isObject, isUndefined } from "lodash"
import FLOOR from "./FLOOR"
import ISNAN from "./ISNAN"

/**
 * Returns a specific number of characters from a text string.
 */

export default function MID(value: string,
                            startPosition: number,
                            numberOfCharacters: number): string|undefined {

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
