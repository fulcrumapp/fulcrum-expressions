import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the web engine and web platform Fulcrum is running on,
 * as well as the current Fulcrum version.
 * @returns name of web engine, web platform, and Fulcrum version.
 */
export default function APPLICATIONINFO() : string {
  const {
    application,
    applicationVersion,
    applicationBuild
  } = CONFIG()

  return `${application}, ${applicationVersion}, ${applicationBuild}`
}
