import CONCATENATE from "./CONCATENATE"

/**
 * Returns a concatenated string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/concat/
 * @param strings (String|Array, required): strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCAT('hello', 'world') // returns 'helloworld'
 */

export default function CONCAT(...strings: any[]): string
export default function CONCAT(): string
export default function CONCAT(...strings: any[]) {
  return CONCATENATE(strings)
}