import { isNull, isUndefined } from "lodash"

/**
 * Returns a data value when given the field's data name.
 * @param dataName required; data name of the desired field
 * @returns a form field value
 */

export default function VALUE(dataName: string): string|undefined {
  if (isNull(dataName) || isUndefined(dataName)) { return }
  // @ts-ignore variables object is populated with keys according to form data names, there is no set interface
  return $$runtime.variables["$" + dataName]
}
