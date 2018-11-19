import { CONFIG } from "./CONFIG"

/**
 * Returns the current user's full name if it exists in the current configuration.
 */

export default function USERFULLNAME(): string|undefined {
  return CONFIG().userFullName || undefined
}
