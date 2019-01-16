import { CONFIG } from "./CONFIG"

/**
 * Returns the record status or undefined if the status is not present.
 */

export default function STATUS(): string|undefined {
  return CONFIG().recordStatus || undefined
}