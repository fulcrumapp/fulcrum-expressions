type EventName =
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
  | "change"
  | "focus"
  | "blur"
  | "click"
  | "add-photo"
  | "remove-photo"
  | "add-video"
  | "remove-video"
  | "add-audio"
  | "remove-audio"

type GUID = string

export type FieldEventNames =
  "change"
  | "focus"
  | "blur"
  | "click"

export interface EventWithField {
  field: string
}

export interface ChoiceFieldValue {
  choice_values: string[],
  other_values: string[]
}

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

export interface FormEvent {
  name: FormEventNames
  field: null,
  value?: string
}

export interface FieldEvent extends EventWithField {
  name: FieldEventNames,
  field: string,
  value: string | ChoiceFieldValue
}

export interface GeometryEvent {
  field?: string
  name: "change-geometry"
  value: {
    coordinates: number[],
    type: "Point"
  }
}

export type RepeatableEventNames =
  "load-repeatable"
  | "unload-repeatable"
  | "new-repeatable"
  | "edit-repeatable"
  | "save-repeatable"
  | "cancel-repeatable"
  | "validate-repeatable"
  | "change-geometry"

export interface RepeatableEvent extends EventWithField {
  name: RepeatableEventNames
}

export interface AddPhotoEvent extends EventWithField {
  name: "add-photo",
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

export interface RemoveMediaEvent extends EventWithField {
  value: {
    id: GUID
  }
}

export interface RemovePhotoEvent extends RemoveMediaEvent {
  name: "remove-photo"
}

export interface AddVideoEvent extends EventWithField {
  name: "add-video",
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

export interface RemoveVideoEvent extends RemoveMediaEvent {
  name: "remove-photo"
}

export interface AddAudioEvent extends EventWithField {
  name: "add-audio",
  value: {
    id: GUID,
    size: number,
    duration: number
  }
}

export interface RemoveAudioEvent extends RemoveMediaEvent {
  name: "remove-audio"
}
