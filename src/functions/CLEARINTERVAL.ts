import clearInterval from "../host/clear-interval"

/**
 * Clears an interval that was previously started with `SETINTERVAL`.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/clearinterval/
 * @param id (Number, required): interval ID to clear
 */
export default function CLEARINTERVAL(id: number): void {
  clearInterval(id)
}