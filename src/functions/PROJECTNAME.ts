import { CONFIG } from "./CONFIG"

/**
 * Returns the project name from the configuration object
 */

export default function PROJECTNAME(): string|undefined {
  return CONFIG().recordProjectName || undefined
}
