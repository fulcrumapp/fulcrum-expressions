import { CONFIG } from "./CONFIG"

/**
 * Returns application version
 * @returns application version
 * @example
 * APPLICATIONVERSION()
 * // if called with
 */

export default function APPLICATIONVERSION(): string {
    return CONFIG().applicationVersion || ""
}
