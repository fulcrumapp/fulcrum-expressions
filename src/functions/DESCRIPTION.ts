import { isUndefined } from "lodash"
import { FormFields as FormField } from "../types/fields"
import { MaybeString } from "../types/primitives"
import FIELD from "./FIELD"

/**
 * Returns a field's description.
 * @param dataName required; data_name of desired field
 * @returns the field's description
 * @example
 * DESCRIPTION("operating_hours") // returns "Stores operating hours in 24-hour time format"
 */

export default function DESCRIPTION(dataName: MaybeString): string | undefined
export default function DESCRIPTION(): undefined
export default function DESCRIPTION(dataName?: MaybeString): string | undefined {
  const field: FormField|undefined = FIELD(dataName)

  if (isUndefined(field)) { return }

  return field.description
}
