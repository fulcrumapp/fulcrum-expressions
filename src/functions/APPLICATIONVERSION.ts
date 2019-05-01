import { CONFIG } from "./CONFIG"

/**
 * Returns application version
 * @returns application version
 * @example
 * APPLICATIONVERSION() // returns 66.0
 */

export default function APPLICATIONVERSION(): string {
    return CONFIG().applicationVersion || ""
}
