import { CONFIG } from "./CONFIG"

/**
 * Returns the project ID off the configuration object.
 */

export default function PROJECTID(): string|undefined {
  return CONFIG().recordProject || undefined
}
