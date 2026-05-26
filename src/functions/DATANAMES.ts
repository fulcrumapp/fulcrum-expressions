import { filter, isUndefined, map } from "lodash"
import { includes } from "lodash"
import { FormFieldTypes, FieldName } from "../types/fields"

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
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/datanames/
 * @param type (String, optional): FormFieldType: e.g. "YesNoField"
 * @returns array of datanames
 * @example
 * DATANAMES('Repeatable') // returns [ "items", "child_items" ]
 */

export default function DATANAMES(): FieldName[]
export default function DATANAMES(type: FormFieldTypes): FieldName[]
export default function DATANAMES(type: string): FieldName[]
export default function DATANAMES(type?: FormFieldTypes | string): FieldName[] {
  let elements: any[]
  if (!isUndefined(type) && includes(FORM_FIELD_TYPES, type)) {
      elements = filter($$runtime.elements, (e) => e.type === type)
  } else {
      elements = $$runtime.elements
  }
  return map(elements, (e) => e.data_name)
}
