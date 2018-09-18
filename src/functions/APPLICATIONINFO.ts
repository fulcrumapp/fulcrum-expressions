import { compact } from "lodash"
import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the web engine and web platform Fulcrum is running on,
 * as well as the current Fulcrum version.
 * @returns name of web engine, web platform, and Fulcrum version.
 */
export default function APPLICATIONINFO() {
  const {
    application,
    applicationVersion,
    applicationBuild
  } = CONFIG()

  return compact([application, applicationVersion, applicationBuild]).join(', ')
}
