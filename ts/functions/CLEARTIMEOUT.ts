import clearTimeout from "../host/clear-timeout"

/**
 * Clears a timeout that was previously started with `SETTIMEOUT`.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/cleartimeout/
 * @param id (Number, required): id of timeout to clear
 */

export default function CLEARTIMEOUT(id: number): void {
  clearTimeout(id)
}
