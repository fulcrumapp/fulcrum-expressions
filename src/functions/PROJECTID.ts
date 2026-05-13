import { CONFIG } from "./CONFIG"

/**
 * Returns the project ID off the configuration object.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/projectid/
 */

export default function PROJECTID(): string|undefined {
  return CONFIG().recordProject || undefined
}
