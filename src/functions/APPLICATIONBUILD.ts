import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the application engine Fulcrum is running on.
 * @returns name of application engine
 */

export default function APPLICATIONBUILD() : string {
    return CONFIG().applicationBuild || ''
}