import SETREADONLY from "./SETREADONLY"

/**
 * Sets status to read only or removes a read only condition.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatusreadonly/
 * @param value (Boolean, required): whether status should be read-only
 */

export default function SETSTATUSREADONLY(value: boolean): void {
  SETREADONLY('@status', value)
}