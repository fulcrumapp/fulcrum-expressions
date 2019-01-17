import { isArray,
         isDate,
         isFinite,
         isFunction,
         isNaN,
         isNull,
         isString,
         isUndefined } from "lodash" 
import { MaybeString } from "../types/primitives"
import ARRAY from "./ARRAY"
import CHOICEVALUES from "./CHOICEVALUES"
import COMPACT from "./COMPACT"

export default function STRING(...args: any[]): string {
  const values: any[] = ARRAY(args)

  const strings: MaybeString[] = values.map((value: any) => {
    if (isUndefined(value) || isNull(value)) {
      return null
    } else if (isString(value)) {
      return value
    } else if (isFinite(value)) {
      return value.toLocaleString()
    } else if (isNaN(value)) {
      return null
    } else if (isFunction(value)) {
      return null
    } else if (isArray(value)) {
      return STRING(value)
    } else if (isDate(value)) {
      return value.toLocaleString()
    } else if (value && value.choice_values) {
      return STRING(CHOICEVALUES(value))
    } else if (value.photo_id) {
      return value.photo_id
    } else if (value.video_id) {
      return value.video_id
    } else if (value.audio_id) {
      return value.audio_id
    } else if (value.signature_id) {
      return value.signature_id
    } else if (value.record_id) {
      return value.record_id
    } else if (value.id) {
      return value.id
    } else {
      return value.toString()
    }
  })
  const compactArray = COMPACT(strings)

  return isArray(compactArray) ? compactArray.join(", ") : ""
}
