import { GUID } from "./primitives"

export interface EventBinder {
  (name: FormEventNames, callback: (event: FormEvent) => void): void
  (name: FieldEventNames, field: string, callback: (event: FieldEvent) => void): void
  (name: RepeatableEventNames, field: string, callback: (event: RepeatableEvent) => void): void
  (name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void
  (name: ChangeGeometryEventName, field: string, callback: (event: GeometryEvent) => void): void
  (name: AddPhotoEventName, callback: (event: AddPhotoEvent) => void): void
  (name: RemovePhotoEventName, callback: (event: RemoveMediaEvent) => void): void
  (name: AddVideoEventName, callback: (event: AddVideoEvent) => void): void
  (name: RemoveVideoEventName, callback: (event: RemoveVideoEvent) => void): void
  (name: AddAudioEventName, callback: (event: AddAudioEvent) => void): void
  (name: RemoveAudioEventName, callback: (event: RemoveAudioEvent) => void): void
}

export type EventNames =
  FormEventNames
  | FieldEventNames
  | RepeatableEventNames
  | ChangeGeometryEventName
  | AddPhotoEventName
  | RemovePhotoEventName
  | AddVideoEventName
  | RemoveVideoEventName
  | AddAudioEventName
  | RemoveAudioEventName

type RepeatableEventNames =
  "load-repeatable"
  | "unload-repeatable"
  | "new-repeatable"
  | "edit-repeatable"
  | "save-repeatable"
  | "cancel-repeatable"
  | "validate-repeatable"
  | "change-geometry"

type FieldEventNames =
  "change"
  | "focus"
  | "blur"
  | "click"

type FormEventNames =
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

type ChangeGeometryEventName = "change-geometry"
type AddPhotoEventName = "add-photo"
type RemovePhotoEventName = "remove-photo"
type AddVideoEventName = "add-video"
type RemoveVideoEventName = "remove-video"
type AddAudioEventName = "add-audio"
type RemoveAudioEventName = "remove-audio"

interface EventWithField {
  field: string
}

interface ChoiceFieldValue {
  choice_values: string[],
  other_values: string[]
}

interface FormEvent {
  name: FormEventNames
  field: null,
  value?: string
}

interface FieldEvent extends EventWithField {
  name: FieldEventNames,
  field: string,
  value: string | ChoiceFieldValue
}

interface GeometryEvent {
  field?: string
  name: ChangeGeometryEventName
  value: {
    coordinates: number[],
    type: "Point"
  }
}

interface RepeatableEvent extends EventWithField {
  name: RepeatableEventNames
}

interface AddPhotoEvent extends EventWithField {
  name: AddPhotoEventName,
  value: {
    id: GUID,
    size: number,
    latitude: number,
    longitude: number,
    altitude: number,
    accuracy: number,
    orientation: number,
    width: number,
    height: number
  }
}

interface RemoveMediaEvent extends EventWithField {
  value: {
    id: GUID
  }
}

interface RemovePhotoEvent extends RemoveMediaEvent {
  name: RemovePhotoEventName
}

interface AddVideoEvent extends EventWithField {
  name: AddVideoEventName,
  value: {
    id: GUID,
    size: number,
    duration: number,
    orientation: number,
    width: number,
    height: number,
    track: any
  }
}

interface RemoveVideoEvent extends RemoveMediaEvent {
  name: RemovePhotoEventName
}

interface AddAudioEvent extends EventWithField {
  name: AddAudioEventName,
  value: {
    id: GUID,
    size: number,
    duration: number
  }
}

interface RemoveAudioEvent extends RemoveMediaEvent {
  name: RemoveAudioEventName
}
