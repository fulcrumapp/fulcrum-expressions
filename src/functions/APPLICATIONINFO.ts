import { compact } from "lodash"
import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the application engine, application platform, and application version
 * on which Fulcrum is running
 * @returns name of application engine, application platform, and application version.
 * @example
 * // running Fulcrum Desktop on Chrome Browser
 * APPLICATIONINFO() // returns 'Chrome, 68.43.9.0.1, WebKit'
 */
export default function APPLICATIONINFO() {
  const {
    application,
    applicationVersion,
    applicationBuild
  } = CONFIG()

  return compact([application, applicationVersion, applicationBuild]).join(', ')
}
