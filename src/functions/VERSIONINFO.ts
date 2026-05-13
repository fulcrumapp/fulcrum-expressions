import { compact } from "lodash"
import APPLICATIONINFO from "./APPLICATIONINFO"
import DEVICEINFO from "./DEVICEINFO"
import PLATFORMINFO from "./PLATFORMINFO"

/**
 * Returns versino info about the app.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/versioninfo/
 * @param separator (String, optional): character to separate each item returned - defaults to " ,"
 */

export default function VERSIONINFO(separator?: string): string
export default function VERSIONINFO(separator= ", "): string {
  return compact([ DEVICEINFO(" "), PLATFORMINFO(" "), APPLICATIONINFO(" ") ]).join(separator)
}
