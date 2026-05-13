import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns the locale of a record.
 */

export default function LOCALE(): string
export default function LOCALE(): any {
  return CONFIG().locale || DEFAULTS.locale
}
