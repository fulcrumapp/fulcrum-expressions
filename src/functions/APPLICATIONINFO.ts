import { compact } from "lodash"
import { CONFIG } from "./CONFIG";

/**
<<<<<<< HEAD
 * Returns the name of the application engine, application platform, and application version
 * on which Fulcrum is running
 * @returns name of application engine, application platform, and application version.
=======
 * Returns the name of the web engine and web platform Fulcrum is running on,
 * as well as the current Fulcrum version.
 * @returns name of web engine, web platform, and Fulcrum version.
>>>>>>> 0301066d9aaa6d1fe7642b09af4f6cbd376e8764
 */
export default function APPLICATIONINFO() {
  const {
    application,
    applicationVersion,
    applicationBuild
  } = CONFIG()

  return compact([application, applicationVersion, applicationBuild]).join(', ')
}
