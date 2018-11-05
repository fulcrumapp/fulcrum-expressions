import { CONFIG } from "./CONFIG"

/**
 * Returns a the id of the repeatable being edited.
 */

export default function REPEATABLEID(): string|undefined {
  return CONFIG().featureID || undefined
}
