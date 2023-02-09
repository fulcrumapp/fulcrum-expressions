import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns the current currency code or, if it's not available, the default
 * currency code from the form configuration object.
 */

export default function CURRENCYCODE(): string
export default function CURRENCYCODE(): any {
  return CONFIG().currencyCode || DEFAULTS.currencyCode
}
