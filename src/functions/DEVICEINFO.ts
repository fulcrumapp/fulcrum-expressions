import { compact } from "lodash"
import DEVICEMANUFACTURER from "./DEVICEMANUFACTURER"
import DEVICEMODEL from "./DEVICEMODEL"

/**
 * Returns device info, including the device manufacturer and model
 * @param separator optional; character to separate device manufacturer and model, defauls to ", "
 * @returns string
 * @example
 * DEVICEINFO() // returns "Apple, MQCK2LL/A"
 * DEVICEINFO(": ") // returns "Apple: MQCK2LL/A"
 */

export default function DEVICEINFO(separator?: string): string
export default function DEVICEINFO(separator?: any): string
export default function DEVICEINFO(separator = ", "): string {
  return compact([ DEVICEMANUFACTURER(), DEVICEMODEL() ]).join(separator)
}
