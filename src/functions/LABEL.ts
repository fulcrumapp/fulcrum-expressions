import { isUndefined } from "lodash"
import { FormField } from "../types/fields"
import FIELD from "./FIELD"

/**
 * Returns the label of a field
 * @param dataName required; data_name of a form field (string)
 * @returns form label, string
 * @example
 * LABEL("business_name") // returns "Business Name"
 */

export default function LABEL(dataName: string): string|undefined {
  const field: FormField|undefined = FIELD(dataName)

  if (isUndefined(field)) { return }

  return field.label
}
