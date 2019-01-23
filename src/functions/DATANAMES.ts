import { filter, isUndefined, map } from "lodash"
import { includes } from "lodash"
import { FormFieldTypes } from "../types/fields"

const FORM_FIELD_TYPES = [ "TextField",
                            "YesNoField",
                            "Label",
                            "Section",
                            "ChoiceField",
                            "ClassificationField",
                            "PhotoField",
                            "VideoField",
                            "AudioField",
                            "BarcodeField",
                            "DateTimeField",
                            "TimeField",
                            "Section",
                            "Repeatable",
                            "AddressField",
                            "SignatureField",
                            "HyperlinkField",
                            "CalculatedField",
                            "RecordLinkField",
]

/**
 * Returns the data names of the form fields. Also accepts an optional
 * type argument to filter form fields by type.
 * @param type optional; string of a FormFieldType: e.g. "YesNoField"
 * @returns array of datanames
 * @example
 * DATANAMES() // returns [ "name", "items", "cost", "choice_value", "child_items", "child_item_cost", "choice_field" ]
 * DATANAMES('Repeatable') // returns [ "items", "child_items" ]
 */

export default function DATANAMES(): any[]
export default function DATANAMES(type: FormFieldTypes): any[]
export default function DATANAMES(type: string): any[]
export default function DATANAMES(type?: FormFieldTypes | string): any[] {
  let elements: any[]
  if (!isUndefined(type) && includes(FORM_FIELD_TYPES, type)) {
      elements = filter($$runtime.elements, (e) => e.type === type)
  } else {
      elements = $$runtime.elements
  }
  return map(elements, (e) => e.data_name)
}
