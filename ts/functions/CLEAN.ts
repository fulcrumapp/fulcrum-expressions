/** The invisible character codes */
const CLEAN_REGEX = /[\x00\x08\x0B\x0C\x0E-\x1F]/g

/**
 * Removes non-printable characters from a string
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/clean/
 * @param text (String, required): text to be cleaned
 * @returns cleaned string
 * @example
 * CLEAN('test\x00\x1D\x1Etest') // returns 'testtest'
 */

export default function CLEAN(text: string): string {
  return text.replace(CLEAN_REGEX, "")
}
