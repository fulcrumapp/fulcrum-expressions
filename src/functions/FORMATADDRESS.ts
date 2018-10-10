import { isUndefined } from "lodash"
import { AddressFieldValue } from "../types/values"
import EXISTS from "./EXISTS"

/**
 * Returns a formatted address
 * @param address required; string, must be valid AddressFieldValue:
 * { sub_thoroughfare?: string, thoroughfare?: string, suite?: string, locality?: string,
 * sub_admin_area?: string, admin_area?: string, postal_code?: string, country?: string }
 * @param lineSeparator optional; string, character to separate address lines, defaults to "\n"
 * @param partSeparator optional; string, character to separate address parts, defaulst to " "
 * @returns string, formatted address
 * @example
 * const exampleAddress = {
 *  sub_thoroughfare: "360",
 *   thoroughfare: "Central Avenue",
 *   suite: "200",
 *   locality: "St. Petersburg",
 *   sub_admin_area: "Pinellas",
 *   admin_area: "FL",
 *   postal_code: "33701",
 *   country: "US",
 * }
 * FORMATADDRESS(exampleAddress) // returns "360 Central Avenue #200\nSt. Petersburg FL 33701\nUS"
 */

export default function FORMATADDRESS(address: AddressFieldValue,
                                      lineSeparator?: string, partSeparator?: string): string|undefined
export default function FORMATADDRESS(address: AddressFieldValue): string|undefined
export default function FORMATADDRESS(address: AddressFieldValue,
                                      lineSeparator = "\n", partSeparator = " "): string|undefined {
  if (isUndefined(address)) { return undefined }

  const formatLine = (...parts: any[]): string => {
    const components = []

    for (const part of parts) {
      if (EXISTS(part)) {
        components.push(part)
      }
    }
    return components.join(partSeparator)
  }
  let suite: string|undefined
  if (EXISTS(address.suite)) {
    suite = "#" + address.suite
  } else {
    // formatLine will ignore suite if it is undefined, otherwise
    // concatenating '#' and undefined results in addresses with '#undefined' in their output
    suite = undefined
  }
  const line1: string = formatLine(address.sub_thoroughfare, address.thoroughfare, suite)
  const line2: string = formatLine(address.locality, address.admin_area, address.postal_code)
  const line3: string = formatLine(address.country)

  const lines: string[] = []
  if (EXISTS(line1)) { lines.push(line1) }
  if (EXISTS(line2)) { lines.push(line2) }
  if (EXISTS(line3)) { lines.push(line3) }

  return lines.join(lineSeparator)
}
