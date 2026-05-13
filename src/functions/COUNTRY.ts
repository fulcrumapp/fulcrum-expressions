import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns the current country or, if it's not available, the default country
 * from the form configuration object.
 */

export default function COUNTRY(): string
export default function COUNTRY(): any {
  return CONFIG().country || DEFAULTS.country
}
