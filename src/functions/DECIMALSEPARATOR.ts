import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns the decimal seperator character or, if it's not available, the default character
 * from the form configuration object.
 */

export default function DECIMALSEPARATOR(): string
export default function DECIMALSEPARATOR(): any {
  return CONFIG().decimalSeparator || DEFAULTS.decimalSeparator
}
