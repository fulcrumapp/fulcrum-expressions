import { CONFIG } from "./CONFIG"

/**
 * Returns a the id of the repeatable being edited.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/repeatableid/
 */

export default function REPEATABLEID(): string|undefined {
  return CONFIG().featureID || undefined
}
