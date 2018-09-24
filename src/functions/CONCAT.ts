import CONCATENATE from "./CONCATENATE"

/**
 * Returns a concatenated string, shortened name for CONCATENATE()
 * @param strings strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCAT('hello', 'world') // returns 'helloworld'
 * CONCAT(['a', 'b', null, 'c']) // returns 'abc'
 */

export default function CONCAT(...strings: any[]): string
export default function CONCAT(): string
export default function CONCAT(...strings: any[]): string {
  return CONCATENATE(strings)
}
