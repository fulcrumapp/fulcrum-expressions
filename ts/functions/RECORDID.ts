import { CONFIG } from "./CONFIG"

/**
 * Returns the current record's id from the form configuration obejct.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/recordid/
 */

export default function RECORDID(): string|undefined {
  return CONFIG().recordID || undefined
}
