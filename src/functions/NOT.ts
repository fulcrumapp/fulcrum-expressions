/**
 * Returns the negation of a value, i.e. if a value is falsey NOT() will return true.
 * @param value parameter of any type
 * @returns boolean
 * @example
 * NOT("test") // returns false
 */

export default function NOT(value?: any): boolean {
  return value ? false : !value
}
