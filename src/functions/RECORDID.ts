import { CONFIG } from "./CONFIG"

/**
 * Returns the current record's id from the form configuration obejct.
 */

export default function RECORDID(): string|undefined {
  return CONFIG().recordID || undefined
}
