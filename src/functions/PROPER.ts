import { capitalize,
         isArray,
         isNull,
         isObject,
         isUndefined,
         map } from "lodash"

/**
 * Capitalizes the first letter in each word of a string.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/proper/
 * @param value (String, required): string to be capitalized
 * @returns string
 * @example
 *
 * PROPER("test test") // returns "Test Test"
 */

export default function PROPER(value: string): string|undefined
export default function PROPER(value: any): string|undefined
export default function PROPER(value: any): string|undefined {
  if (isNull(value) ||
      isUndefined(value) ||
      isArray(value) ||
      isObject(value)
      ) { return }

  // split value on spaces to map over each word and use capitalize in mulit-word strings
  const words: string[] = value.toString().split(" ")

  const capitalizedWords: string[] = map(words, capitalize)

  return capitalizedWords.join(" ")
}
