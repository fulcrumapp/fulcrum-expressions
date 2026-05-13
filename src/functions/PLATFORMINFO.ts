import { compact } from "lodash"
import PLATFORM from "./PLATFORM"
import PLATFORMVERSION from "./PLATFORMVERSION"

/**
 * Returns platform information off the form configuration object including platform name and version.
 * @param separator (String, optional): separator with which to combine platform name and version - defaults to ", "
 * @returns string with platform name and version
 * @example
 * PLATFORMINFO() // returns "Android, 0.9.3"
 */

export default function PLATFORMINFO(separator?: string): string
export default function PLATFORMINFO(separator = ", "): string {
  return compact([ PLATFORM(), PLATFORMVERSION() ]).join(separator)
}
