import { format } from "util"

/**
 * Formats a string
 * @param template string format. Use %s for strings and %d for numbers.
 * @param variables Value(s) to substitute into the format string
 * @returns formatted string
 * @example
 * // returns "The pole height is 20 meters and has 3 issues detected."
 * FORMAT('The pole height is %d meters and has %d issues detected.', 20, 3)
 * @example
 * // returns "11/11/2015 12:30:30"
 * FORMAT('%s/%s/%s %s:%s:%s', 11, 11, 2015, 12, 30, 30)
 */
const FORMAT = (template: string, ...variables: any[]) =>
  format(template, ...variables)

export default FORMAT
