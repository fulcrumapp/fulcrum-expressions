import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns the language value or, if it's not available, the default language
 * from the form configuration object.
 */

export default function LANGUAGE(): string {
  return CONFIG().language || DEFAULTS.language
}
