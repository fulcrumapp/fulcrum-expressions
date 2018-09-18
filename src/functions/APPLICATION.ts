import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the platform Fulcrum is running on.
 * @returns name of platform
 */
export default function APPLICATION() : string {
  return CONFIG().application || ''
}
