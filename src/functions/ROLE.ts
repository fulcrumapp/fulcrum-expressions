import { CONFIG } from "./CONFIG"

/**
 * Returns the current user's role or, if it's not available, undefined.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/role/
 */

export default function ROLE(): string|undefined {
  return CONFIG().userRoleName || undefined
}
