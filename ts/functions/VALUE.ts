import { isNull, isUndefined } from "lodash"
import {
  FieldName,
  TextFieldName,
  NumericFieldName,
  YesNoFieldName,
  PhotoFieldName,
  VideoFieldName,
  AudioFieldName,
  ChoiceFieldName,
  RepeatableFieldName,
  SignatureFieldName,
  RecordLinkFieldName
} from "../types/fields"

import {
  TextFieldValue,
  NumericFieldValue,
  YesNoFieldValue,
  PhotoFieldValue,
  VideoFieldValue,
  AudioFieldValue,
  ChoiceFieldValue,
  RepeatableFieldValue,
  SignatureFieldValue,
  RecordLinkFieldValue
} from "../types/values"

/**
 * Returns a data value when given the field's data name.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */

export default function VALUE(dataName: NumericFieldName): NumericFieldValue
export default function VALUE(dataName: TextFieldName): TextFieldValue
export default function VALUE(dataName: YesNoFieldName): YesNoFieldValue
export default function VALUE(dataName: PhotoFieldName): PhotoFieldValue
export default function VALUE(dataName: VideoFieldName): VideoFieldValue
export default function VALUE(dataName: AudioFieldName): AudioFieldValue
export default function VALUE(dataName: ChoiceFieldName): ChoiceFieldValue
export default function VALUE(dataName: RepeatableFieldName): RepeatableFieldValue
export default function VALUE(dataName: SignatureFieldName): SignatureFieldValue
export default function VALUE(dataName: RecordLinkFieldName): RecordLinkFieldValue
export default function VALUE(dataName: FieldName): string|undefined
export default function VALUE(dataName: string): string|undefined
export default function VALUE(dataName: any): any
export default function VALUE(dataName: any): any {
  if (isNull(dataName) || isUndefined(dataName)) { return }
  // @ts-ignore variables object is populated with keys according to form data names, there is no set interface
  return $$runtime.variables["$" + dataName]
}
