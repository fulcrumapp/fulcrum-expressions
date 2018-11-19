import { trim } from "lodash"

/**
 * Trims leading and trailing whitespace from a string.
 * @param value required; string to be trimmed
 * @returns trimmed string
 * @example
 * TRIM("  test  ") // returns "test"
 */
export default function TRIM(value: string): string
export default function TRIM(value: any): string
export default function TRIM(value: any): string {
  return trim(value)
}
