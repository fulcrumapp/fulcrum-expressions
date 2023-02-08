import SETHIDDEN from "./SETHIDDEN"

/**
 * Sets status to hidden or visible.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatushidden/
 * @param value (Boolean, required): whether to hide status
 */

export default function SETSTATUSHIDDEN(value: boolean): void {
  SETHIDDEN("@status", value)
}