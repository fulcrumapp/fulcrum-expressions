import SETREADONLY from "./SETREADONLY"

/**
 * Sets status to read only or removes a read only condition.
 * @param value required; boolean value indicating whether status should be read-only
 */

export default function SETSTATUSREADONLY(value: boolean): void {
  SETREADONLY('@status', value)
}