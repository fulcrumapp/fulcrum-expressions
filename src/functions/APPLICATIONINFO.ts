
import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the application engine, application platform, and application version
 * on which Fulcrum is running
 * @returns name of application engine, application platform, and application version.
 */

export default function APPLICATIONINFO () : string {
    const applicationInfo : string = [ CONFIG().application, CONFIG().applicationVersion, CONFIG().applicationBuild ].join(', ');
    // default to '' if no information is available
    return applicationInfo == ', , ' ? '' : applicationInfo;
}