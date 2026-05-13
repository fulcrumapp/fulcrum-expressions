import SETHIDDEN from "./SETHIDDEN"

/**
 * Sets project to hidden or visible.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setprojecthidden/
 * @param value (Boolean, required): whether to hide project field
 */

export default function SETPROJECTHIDDEN(value: boolean): void {
  SETHIDDEN("@project", value)
}