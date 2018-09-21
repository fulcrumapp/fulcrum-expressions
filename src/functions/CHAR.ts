import NUM from "./NUM"

/**
 * Returns the character of a given char code
 * @param value integer (character code)
 * @returns a character as a string
 * @example
 * CHAR(65) // returns 'A'
 */

export default function CHAR(value: number): string
export default function CHAR(value: string): string
export default function CHAR(value: any): string {
  return String.fromCharCode(NUM(value))
}
