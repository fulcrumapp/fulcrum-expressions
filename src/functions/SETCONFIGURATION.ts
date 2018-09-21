import { each, includes } from "lodash"

export interface ConfigurationResult {
  type: "configure",
  attribute: string,
  value: any
}

interface Configuration {
  /** When creating a new form, ensure that the location is set. */
  auto_populate_location?: boolean
  /** Wait for a minimum accuracy before auto populating the location */
  auto_populate_minimum_accuracy?: number
  /** Force a specific photo quality to be used when capturing */
  photo_quality?: string
  /** Force a specific video quality to be used when capturing */
  video_quality?: string
  /** Allow using the photo gallery to attach a photo to a PhotoField */
  allow_photo_gallery?: boolean
  /** Allow using the photo gallery to attach a video to a VideoField */
  allow_video_gallery?: boolean
  /** Enable putting the record in a draft state which cannot be synced. */
  allow_draft_records?: boolean
  /** Enable setting the manual location of a record. */
  allow_manual_location?: boolean
  /** Enable a warning if the accuracy of the GPS is too low */
  warn_on_location_accuracy?: boolean
  // TODO: Document
  title?: string
}

const CONFIGURATION_ATTRIBUTES = [
  "auto_populate_location",
  "auto_populate_minimum_accuracy",
  "photo_quality",
  "video_quality",
  "allow_photo_gallery",
  "allow_video_gallery",
  "allow_draft_records",
  "allow_manual_location",
  "warn_on_location_accuracy",
  "title",
]

/**
 * Set form level configuration sttings
 * @param settings key value pair of settings to configure
 */
const SETCONFIGURATION = (settings: Configuration) =>
  each(settings, (value, attribute) => {
    if (!includes(CONFIGURATION_ATTRIBUTES, attribute)) { return }

    const result = value ? JSON.stringify(value) : null

    $$runtime.results.push({
      attribute: attribute.toString(),
      type: "configure",
      value: result,
    })
  })

export default SETCONFIGURATION
