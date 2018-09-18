import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the application engine Fulcrum is running on.
 * @returns name of application engine
 * @example 
 * // running Fulcrum Desktop on Chrome Browser
 * APPLICATIONBUILD() // returns 'WebKit'
 */

export default function APPLICATIONBUILD() : string {
  return CONFIG().applicationBuild || ''
}
