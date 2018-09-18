import { MaybeString } from "../primitives";
import { FormFields } from "../fields";

/**
 * Returns definition object for a specified field
 * @param dataName The data name of the field
 * @example
 * FIELD('child_item_cost').label // returns "Child Item Cost"
 * FIELD('child_item_cost').parent.label // returns "Child Items"
 */
export default function FIELD(dataName: MaybeString): FormFields | undefined {
  if (!dataName) return
  return $$runtime.elementsByDataName[dataName]
}
