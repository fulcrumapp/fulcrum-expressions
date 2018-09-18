import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the application Fulcrum is running on.
 * @returns name of application
 * @example
 * // running Fulcrum Desktop on Chrome Browser
 * APPLICATION() // returns 'Chrome'
 */
export default function APPLICATION() : string {
  return CONFIG().application || ''
}
