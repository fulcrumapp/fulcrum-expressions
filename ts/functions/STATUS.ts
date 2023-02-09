import { CONFIG } from "./CONFIG"

/**
 * Returns the record status.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/status/
 */

export default function STATUS(): string|undefined {
  return CONFIG().recordStatus || undefined
}