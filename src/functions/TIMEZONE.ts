import { CONFIG, DEFAULTS } from "./CONFIG"

/**
 * Returns the current timezone or, if it's not available, the default timezone
 * from the form configuration object.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timezone/
 */

export default function TIMEZONE() {
  return CONFIG().timeZone || DEFAULTS.timeZone
}
