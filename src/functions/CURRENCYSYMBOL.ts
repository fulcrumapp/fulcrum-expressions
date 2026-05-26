import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns the current currency symbol or, if it's not available, the default
 * currency symbol from the form configuration object.
 */

export default function CURRENCYSYMBOL(): string
export default function CURRENCYSYMBOL(): any {
  return CONFIG().currencySymbol || DEFAULTS.currencySymbol
}
