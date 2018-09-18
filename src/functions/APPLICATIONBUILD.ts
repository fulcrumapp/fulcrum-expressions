import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the web engine Fulcrum is running on.
 * @returns name of web engine
 */

export default function APPLICATIONBUILD() : string {
  return CONFIG().applicationBuild || ''
}
