import { GUID } from "./primitives"
import { FormFields, FieldName } from "./fields";
import { ChoiceFieldValue } from "./values"

export interface TriggeredEvent {
  name: EventNames,
  value: (
    FieldEventValue
    | GeometryEventValue
    | AddAudioEventValue
    | AddVideoEventValue
    | AddPhotoEventValue
    | RemoveMediaEventValue
    | ExtensionMessageEventValue
    | null
  ),
  field: FieldName | null
}

export type EventNames =
  FormEventNames
  | FieldEventNames
  | RepeatableEventNames
  | ChangeGeometryEventName
  | AddPhotoEventName
  | RemovePhotoEventName
  | ReplacePhotoEventName
  | AddVideoEventName
  | RemoveVideoEventName
  | AddAudioEventName
  | RemoveAudioEventName
  | ExtensionMessageEventName

export type RepeatableEventNames =
  "load-repeatable"
  | "unload-repeatable"
  | "new-repeatable"
  | "edit-repeatable"
  | "save-repeatable"
  | "cancel-repeatable"
  | "validate-repeatable"
  | "change-geometry"

export type FieldEventNames =
  "change"
  | "focus"
  | "blur"
  | "click"

export type FormEventNames =
  "load-record"
  | "unload-record"
  | "new-record"
  | "edit-record"
  | "save-record"
  | "cancel-record"
  | "validate-record"
  | "change-geometry"
  | "change-project"
  | "change-status"
  | "change-assignment"

export type ChangeGeometryEventName = "change-geometry"
export type AddPhotoEventName = "add-photo"
export type RemovePhotoEventName = "remove-photo"
export type ReplacePhotoEventName = "replace-photo"
export type AddVideoEventName = "add-video"
export type RemoveVideoEventName = "remove-video"
export type AddAudioEventName = "add-audio"
export type RemoveAudioEventName = "remove-audio"
export type ExtensionMessageEventName = "extension-message"

export interface Event {
  name: EventNames
}

export interface EventWithField extends Event {
  field: FieldName
}

export interface FormEvent extends Event {
  name: FormEventNames
  field: null,
  value?: string
}

export type FieldEventValue = string | ChoiceFieldValue

export interface FieldEvent extends EventWithField {
  name: FieldEventNames,
  field: FieldName,
  value: FieldEventValue
}

export interface GeometryEventValue {
  coordinates: number[],
  type: "Point"
}

export interface GeometryEvent extends Event {
  field?: string
  name: ChangeGeometryEventName
  value: GeometryEventValue
}

export interface RepeatableEvent extends EventWithField {
  name: RepeatableEventNames
}

export interface AddPhotoEventValue {
  id: GUID,
  size: number,
  latitude: number | null,
  longitude: number | null,
  altitude: number | null,
  accuracy: number | null,
  direction: number | null,
  orientation: number | null,
  width: number,
  height: number,
  timestamp: string | null
}

export interface ReplacePhotoEventValue extends AddPhotoEventValue {
  annotated: boolean,
  replaced: GUID
}

export interface AddPhotoEvent extends EventWithField {
  name: AddPhotoEventName,
  value: AddPhotoEventValue
}

export interface ReplacePhotoEvent extends EventWithField {
  name: ReplacePhotoEventName,
  value: ReplacePhotoEventValue
}

export interface RemoveMediaEventValue {
  id: GUID
}

export interface RemoveMediaEvent extends EventWithField {
  value: RemoveMediaEventValue
}

export interface RemovePhotoEvent extends RemoveMediaEvent {
  name: RemovePhotoEventName
}

export interface AddVideoEventValue {
  id: GUID,
  size: number,
  duration: number,
  orientation: number | null,
  width: number,
  height: number,
  track: any
}

export interface AddVideoEvent extends EventWithField {
  name: AddVideoEventName,
  value: AddVideoEventValue
}

export interface RemoveVideoEvent extends RemoveMediaEvent {
  name: RemovePhotoEventName
}

export interface AddAudioEventValue {
  id: GUID,
  size: number,
  duration: number
}

export interface AddAudioEvent extends EventWithField {
  name: AddAudioEventName,
  value: AddAudioEventValue
}

export interface RemoveAudioEvent extends RemoveMediaEvent {
  name: RemoveAudioEventName
}

export interface ExtensionMessageEventValue {
  source: string,
  data: any,
  cancelled?: boolean
}

export interface ExtensionMessageEvent extends Event {
  name: ExtensionMessageEventName
  value: ExtensionMessageEventValue
}