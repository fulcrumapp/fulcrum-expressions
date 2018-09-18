import { CONFIG } from "./CONFIG";

/**
 * Returns the name of the application Fulcrum is running on.
 * @returns name of application
 */

export default function APPLICATION() : string {
    return CONFIG().application || ''
}