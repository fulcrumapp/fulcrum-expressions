import { CONFIG } from "./CONFIG"

/**
 * Returns the user's email from the configuration object.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/email/
 */

export default function EMAIL(): string|undefined {
  return CONFIG().userEmail || undefined
}
