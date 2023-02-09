import { FormFields as FormField, FieldName } from "../types/fields"

/**
 * Returns definition object for a specified field
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/field/
 * @param dataName (String, required): data name of the field
 * @example
 * FIELD('child_item_cost').label // returns "Child Item Cost"
 */
export default function FIELD(dataName: FieldName): FormField
export default function FIELD(dataName: FieldName | string | null | undefined): FormField | undefined
export default function FIELD(dataName: FieldName | string | null | undefined): FormField | undefined {
  if (!dataName) { return }
  return $$runtime.elementsByDataName[dataName]
}
