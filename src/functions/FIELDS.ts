import { isEmpty, isUndefined } from "lodash"
import { FormFields, RepeatableField, Section } from "../types/fields"
import flattenElements from "../util/flatten-elements"
import FIELD from "./FIELD"

interface FieldsOptions {
  repeatables?: boolean,
  sections?: boolean,
}

/**
 * Returns child fields of a repeatable or section field associated with a given data name
 * @param dataName required; string
 * @param options optional; object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child fields
 *
 */

export default function FIELDS(dataName: string): FormFields[]
export default function FIELDS(dataName: string, options: FieldsOptions): FormFields[]
export default function FIELDS(): undefined
export default function FIELDS(dataName?: string, options?: FieldsOptions): FormFields[]|undefined {
  // element can be any of these things,
  // but only Repeatables and Sections will get passed to flattenElements
  const element: Section|RepeatableField|FormFields|undefined = FIELD(dataName)
  if (isUndefined(options)) { options = {} }
  if (isUndefined(options.repeatables)) { options.repeatables = true }
  if (isUndefined(options.sections)) { options.sections = true }

  if (isUndefined(element) || isEmpty(element)) { return undefined }
  if (element.type !== "Repeatable" && element.type !== "Section") { return undefined }

  return flattenElements(element.elements, options.repeatables, false, undefined, options.sections)
}
