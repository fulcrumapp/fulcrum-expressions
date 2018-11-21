import { CONFIG } from "./CONFIG"

/**
 * Returns the user's email from the configuration object.
 */

export default function EMAIL(): string|undefined {
  return CONFIG().userEmail || undefined
}
