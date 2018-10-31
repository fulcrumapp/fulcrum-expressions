import { CONFIG } from "./CONFIG"

/** Returns the platform name from the configuration object */

export default function PLATFORMVERSION(): string {
  return CONFIG().platformVersion || ""
}
