import SETHIDDEN from "./SETHIDDEN"

/**
 * Sets status to hidden or visible.
 * @param value boolean value indicating whether to hide status
 */

export default function SETSTATUSHIDDEN(value: boolean): void {
  SETHIDDEN("@status", value)
}