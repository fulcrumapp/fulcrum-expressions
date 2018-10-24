import { CONFIG } from "./CONFIG"

/**
 * Returns the current user's role or, if it's not available, undefined.
 */

export default function ROLE(): string|undefined {
  return CONFIG().userRoleName || undefined
}
