import { isArray, isNaN, isString, isUndefined } from "lodash"
import FLOOR from "./FLOOR"

export default function SUBSTITUTE(text: string, oldText: string, newText: string, occurrence?: number): string|undefined {
  occurrence = isUndefined(occurrence) ? NaN : FLOOR(occurrence)

  if (arguments.length < 3) { return }
  if (occurrence < 0) { return }
  if (!text || !isString(oldText) || !isString(newText)) { return }

  if (isArray(text)) { return text }
  if (text.indexOf(oldText) < 0) { return text }

  text = text.toString()
  oldText = oldText.toString()
  newText = newText.toString()

  if (isNaN(occurrence)) {
    return text.replace(new RegExp(oldText, 'g'), newText)
  } else {
    let index = text.indexOf(oldText)
    let count = 1

    while (index >= 0) {
      if (count === occurrence) {
        const prefix = text.substring(0, index)
        const suffix = text.substring(index + oldText.length)

        return prefix + newText + suffix
      }

      index = text.indexOf(oldText, index + 1)

      count++
    }

    return text
  }
}