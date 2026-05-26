import { CONFIG } from "./CONFIG"

/**
 * Returns the project name from the configuration object
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/projectname/
 */

export default function PROJECTNAME(): string|undefined {
  return CONFIG().recordProjectName || undefined
}
