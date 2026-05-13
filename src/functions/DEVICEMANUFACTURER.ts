import { CONFIG } from "./CONFIG"

/**
 * Returns the device manufacturer or an empty string
 */

export default function DEVICEMANUFACTURER(): string {
  return CONFIG().deviceManufacturer || ""
}
