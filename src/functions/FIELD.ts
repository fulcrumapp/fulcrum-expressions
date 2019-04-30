import { FormFields as FormField, FieldName } from "../types/fields"
import { MaybeString } from "../types/primitives"

/**
 * Returns definition object for a specified field
 * @param dataName The data name of the field
 * @example
 * FIELD('child_item_cost').label // returns "Child Item Cost"
 * FIELD('child_item_cost').parent.label // returns "Child Items"
 */
export default function FIELD(dataName: FieldName): FormField
export default function FIELD(dataName: FieldName | null | undefined): FormField | undefined {
  if (!dataName) { return }
  return $$runtime.elementsByDataName[dataName]
}
