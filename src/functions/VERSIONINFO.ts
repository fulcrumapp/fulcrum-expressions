import { compact } from "lodash"
import APPLICATIONINFO from "./APPLICATIONINFO"
import DEVICEINFO from "./DEVICEINFO"
import PLATFORMINFO from "./PLATFORMINFO"

/**
 * Returns device, platform, and application information.
 * @param separator optional; character to separate each item returned - defaults to " ,"
 * @example
 * VERSIONINFO() // returns "Apple MQCK2LL/A, iOS 2.0, Chrome 4.2.3.5.2 Webkit"
 */

export default function VERSIONINFO(separator?: string): string
export default function VERSIONINFO(separator= ", "): string {
  return compact([ DEVICEINFO(" "), PLATFORMINFO(" "), APPLICATIONINFO(" ") ]).join(separator)
}
