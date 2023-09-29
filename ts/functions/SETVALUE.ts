import { isNull, isUndefined } from "lodash"
import { FormFields, RepeatableField, FieldName } from "../types/fields"
import { SetValueResult } from "../types/results"
import { AddressFieldValue, ChoiceFieldValue, Geometry } from "../types/values"
import { RecordLinkIds } from "../util/converters"
import { ValidGeometry } from "../util/is-valid-geometry"
import isSetValueSupported from "../util/is-set-value-supported"
import makeValue from "../util/make-value"
import ERROR from "./ERROR"
import FIELD from "./FIELD"
import FORMAT from "./FORMAT"

/**
 * Sets or clears the value of a field depending on value passed in.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setvalue/
 * @param dataName (String, required): data_name of field to be set
 * @param value (Any, required): value for field, or `null` to clear the field
 */

export default function SETVALUE(dataName: FieldName,
                                 value: string|ChoiceFieldValue|AddressFieldValue|Geometry|string[]|number[]|null): void {
}
