import { includes, isUndefined, isNull } from "lodash"
import { UpdateFormAttributesResult } from "../types/results"
import FIELD from "./FIELD"

const FORM_ATTRIBUTES = [
  'label',
  'description',
  'required',
  'hidden',
  'disabled',
  'min_length',
  'max_length',
  'choices',
  'choice_filter',
  'media_gallery_enabled',
  'media_capture_enabled',
  'auto_sync_enabled',
  'auto_location_enabled',
  'auto_location_minimum_accuracy',
  'manual_location_enabled',
  'edit_locations_enabled',
  'edit_durations_enabled',
  'drafts_enabled',
  'photo_quality',
  'video_quality',
  'audio_quality',
]

/**
 * Updates a form's attributes.
 * @param dataName data name of desired form field to be updated
 * @param attributes optional; object of attributes to be updated and their corresponding values
 */
export default function SETFORMATTRIBUTES(dataName: string, attributes?: any): void
export default function SETFORMATTRIBUTES(dataName: any): void
export default function SETFORMATTRIBUTES(dataName: any, attributes?: any): void {
  if (isUndefined(attributes)) {
    attributes = dataName
    dataName = '@form'
  }

  const element = FIELD(dataName)

  if (isUndefined(element) && !includes(["@status", "@form"], dataName)) { return }

  for (const attributeName of  Object.keys(attributes)) {
    if (!includes(FORM_ATTRIBUTES, attributeName)) { return }
    const value = !(isUndefined(attributes[attributeName]) || isNull(attributes[attributeName])) ? JSON.stringify(attributes[attributeName]) : null

    const result: UpdateFormAttributesResult = {
      type: "update-element",
      key: isUndefined(element) ? dataName : element.key,
      attribute: attributeName.toString(),
      value: value,
    }
    
    $$runtime.results.push(result)
  }
}
