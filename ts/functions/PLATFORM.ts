import { CONFIG } from "./CONFIG"

/** Returns the platform name from the configuration object 
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/platform/
*/

export default function PLATFORM(): string {
  return CONFIG().platform || ""
}
