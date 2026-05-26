import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns locale-specific increment with which to group large numbers - defaults to 3 (thousands)
 */

export default function GROUPINGSIZE(): number {
  return CONFIG().groupingSize || DEFAULTS.groupingSize
}
