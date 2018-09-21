/**
 * Removes non-printable characters from a string
 * @param text string to be cleaned
 * @returns cleaned string
 * @example
 * CLEAN('test\x00\x1D\x1Etest') // returns 'testtest'
*/

const CLEAN_REGEX = /[\x00\x08\x0B\x0C\x0E-\x1F]/g

export default function CLEAN(text: string) : string {
  return text.replace(CLEAN_REGEX, '')
}
