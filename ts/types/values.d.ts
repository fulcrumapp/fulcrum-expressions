import type { Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon } from "../types/geojson"

export type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon

export type FormFieldValues =
  ChoiceFieldValue
  | AddressFieldValue

export type TextFieldValue = string | null | undefined

export type YesNoFieldValue = string | null | undefined

export type NumericFieldValue = number | null | undefined

export interface AddressFieldValue {
  sub_thoroughfare?: string|null,
  thoroughfare?: string|null,
  suite?: string|null,
  locality?: string|null,
  sub_admin_area?: string|null,
  admin_area?: string|null,
  postal_code?: string|null,
  country?: string|null
}

export interface ChoiceFieldValue {
  choice_values?: string[] | null,
  other_values?: string[] | null
}

export interface ClassificationFieldValue extends ChoiceFieldValue {}

export interface PhotoFieldItem {
  photo_id: string,
  caption: string
}

export type PhotoFieldValue = Array<PhotoFieldItem> | null | undefined

export interface VideoFieldItem {
  video_id: string,
  caption: string
}

export type VideoFieldValue = Array<VideoFieldItem> | null | undefined

export interface AudioFieldItem {
  audio_id: string,
  caption: string
}

export type AudioFieldValue = Array<AudioFieldItem> | null | undefined

export interface SignatureFieldValue {
  signature_id: string,
  timestamp: string
}

export interface RecordLinkItem {
  record_id: string
}

export type RecordLinkFieldValue = Array<RecordLinkItem> | null | undefined

export interface RepeatableItem {
  id: string,
  form_values: object
}

export type RepeatableFieldValue = Array<RepeatableItem> | null | undefined

export interface CurrentLocation {
  latitude: number,
  longitude: number,
  altitude: number | null,
  accuracy: number,
  course: number | null,
  speed: number | null,
  timestamp: number
}