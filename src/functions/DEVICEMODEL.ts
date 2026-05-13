import { CONFIG } from "./CONFIG"

/**
 * Returns the device model or an empty string if the device model is not present.
 */

export default function DEVICEMODEL(): string {
  return CONFIG().deviceModel || ""
}
