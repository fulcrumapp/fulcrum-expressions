import SETREADONLY from "./SETREADONLY"

/**
 * Sets project to read only or removes a read only condition.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setprojectreadonly/
 * @param value (Boolean, required): whether project should be read-only
 */

export default function SETPROJECTREADONLY(value: boolean): void {
  SETREADONLY('@project', value)
}