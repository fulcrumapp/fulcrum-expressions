import { CONFIG } from "./CONFIG"

/** Returns the platform name from the configuration object */

export default function PLATFORM(): string {
  return CONFIG().platform || ""
}
