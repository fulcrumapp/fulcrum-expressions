import { compact } from "lodash"
import APPLICATION from "./APPLICATION"
import APPLICATIONBUILD from "./APPLICATIONBUILD"
import APPLICATIONVERSION from "./APPLICATIONVERSION"

/**
 * Returns the name of the application engine, application platform, and application version
 * on which Fulcrum is running
 * @param separator optional; character string to separate application information, defaults to ", "
 * @returns name of application engine, application platform, and application version.
 * @example
 * // running Fulcrum Desktop on Chrome Browser
 * APPLICATIONINFO() // returns 'Chrome, 68.43.9.0.1, WebKit'
 */
export default function APPLICATIONINFO(separator?: string): string
export default function APPLICATIONINFO(separator = ", "): string {
  return compact([APPLICATION(), APPLICATIONVERSION(), APPLICATIONBUILD()]).join(separator)
}
