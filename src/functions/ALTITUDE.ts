import { CONFIG } from "./CONFIG"
import NUM from "./NUM"

/**
 * Returns the altitude from the records geometry.
 */
export default function ALTITUDE() {
  return NUM(CONFIG().recordAltitude)
}
