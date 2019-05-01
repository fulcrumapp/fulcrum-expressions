import { CONFIG } from "./CONFIG"
import NUM from "./NUM"

/**
 * Returns the altitude from the records geometry.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/altitude/
 */
export default function ALTITUDE() {
  return NUM(CONFIG().recordAltitude)
}
