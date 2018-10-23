import { isNull, isUndefined } from "lodash"
import { FormFields, RepeatableField } from "../types/fields"
import { AddressFieldValue, ChoiceFieldValue } from "../types/values"
import { RecordLinkIds } from "../util/converters"
import isSetValueSupported from "../util/is-set-value-supported"
import makeValue from "../util/make-value"
import ERROR from "./ERROR"
import FIELD from "./FIELD"
import FORMAT from "./FORMAT"

export interface SetValueResult {
  type: "set-value",
  key: string,
  value: string|null
}

export default function SETVALUE(dataName: string,
                                 value: string|ChoiceFieldValue|AddressFieldValue|string[]|number[]|null): void {

  const element: FormFields|undefined = FIELD(dataName)
  let convertedValue: string|ChoiceFieldValue|AddressFieldValue|RecordLinkIds[]|null = null

  if (!isUndefined(element)) {
  // don't let the user accidentally blow out data in unsupported fields

  // @ts-ignore Clash between $$runtime.elementsByKey type (FormFields) and RepeatableField type
  // that will actually be returned by ternary operation
  const repeatable: RepeatableField|null = !isNull($$runtime.repeatable) ?
    $$runtime.elementsByKey[$$runtime.repeatable] : null

  // set containterElements to repeatable children if setting a value in a repeatable field
  // else set containerElements to all form elements
  const containerElements: FormFields[] = repeatable ? repeatable.elements : $$runtime.form.elements

  // check that requested changes is taking place in the current editing scope
  // this is particularly important for repeatable values
  const supported: boolean = isSetValueSupported(containerElements, element, element.type)
  if (!supported) {
    ERROR(FORMAT("Setting the value of '%s' is not supported.", dataName))
  }

  // takes value param and formats it for $$HOST according to field type
  convertedValue = (!isUndefined(value) && !isUndefined(element)) ? makeValue(element, value) : null
 }
  // TODO(zhm) guard well-known supported values in the else case
  // @project, @status, @geometry, etc
  // Force the types to be correct so we don't pass back an array for
  // the project or a number for the status, etc. The native apps
  // should never be handed back data with the wrong JS types.

  const result: SetValueResult = {
    key: isUndefined(element) ? dataName : element.key,
    type: "set-value",
    value: isNull(convertedValue) ? JSON.stringify(value) : JSON.stringify(convertedValue),
  }

  $$runtime.results.push(result)
}
