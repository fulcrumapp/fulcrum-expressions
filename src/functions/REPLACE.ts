import { isObject } from "lodash"
import FLOOR from "./FLOOR"
import ISNAN from "./ISNAN"

/**
 * Replaces part of a text string with a different text string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/replace/
 * @param value (String, required): the original text
 * @param startPosition (Number, required): the 1-based position to start replacing
 * @param numberOfCharacters (Number, required): number of characters to replace
 * @param replacement (String, required): the replacement text
 * @returns the modified string, or undefined if inputs are invalid
 */
export default function REPLACE(value: any, startPosition: any, numberOfCharacters: any, replacement: any): string | undefined {
  startPosition = FLOOR(startPosition)
  numberOfCharacters = FLOOR(numberOfCharacters)

  if (value == null) return undefined
  if (arguments.length < 4) return undefined
  if (isObject(value)) return undefined
  if (startPosition < 1) return undefined
  if (ISNAN(startPosition)) return undefined
  if (numberOfCharacters < 0) return undefined
  if (ISNAN(numberOfCharacters)) return undefined

  value = value.toString()

  const prefix = value.substr(0, startPosition - 1)
  const suffix = value.substr(startPosition - 1 + numberOfCharacters)

  return prefix + replacement + suffix
}
