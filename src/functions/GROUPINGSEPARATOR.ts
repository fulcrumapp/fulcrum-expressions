import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns locale-specific symbol to group large numbers - defaults to ','
 */

export default function GROUPINGSEPARATOR(): string {
  return CONFIG().groupingSeparator || DEFAULTS.groupingSeparator
}
