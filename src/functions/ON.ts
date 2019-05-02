import { includes, isFunction, isString } from "lodash"
import {
  Event,
  AddAudioEvent,
  AddAudioEventName,
  AddPhotoEvent,
  AddPhotoEventName,
  ReplacePhotoEvent,
  ReplacePhotoEventName,
  AddVideoEvent,
  AddVideoEventName,
  ChangeGeometryEventName,
  EventNames,
  FieldEvent,
  FieldEventNames,
  FormEvent,
  FormEventNames,
  GeometryEvent,
  RemoveAudioEvent,
  RemoveAudioEventName,
  RemoveMediaEvent,
  RemovePhotoEventName,
  RemoveVideoEvent,
  RemoveVideoEventName,
  RepeatableEvent,
  RepeatableEventNames,
} from "../types/events"
import { FieldName, PhotoFieldName, AudioFieldName, VideoFieldName, RepeatableFieldName } from "../types/fields"
import { MaybeString } from "../types/primitives"
import ERROR from "./ERROR"
import FIELD from "./FIELD"
import FORMAT from "./FORMAT"

/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */

export default function ON(name: FormEventNames, callback: (event: FormEvent) => void): void
export default function ON(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void
export default function ON(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void
export default function ON(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void
export default function ON(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void
export default function ON(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void
export default function ON(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void
export default function ON(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void
export default function ON(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void
export default function ON(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void
export default function ON(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void
export default function ON(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void
export default function ON(name: EventNames, fieldOrCallback: FieldName|((event: Event) => void), callback?: ((event: Event) => void)): void
export default function ON(name: EventNames, ...args: any[]): void {
  let param: MaybeString = null
  let callback

  if (args.length === 2) {
    [param, callback] = args
  } else {
    [callback] = args
  }

  if (!isString(name)) {
    ERROR("name must be a string")
  }

  if (param && !isString(param)) {
    ERROR("param must be a string")
  }

  if (!isFunction(callback)) {
    ERROR("callback must be a function")
  }

  validateEventParams(name, param)

  $$runtime.addHook(name, param, callback)
}

const isMagicDataName = (param: MaybeString) =>
  includes(["@status", "@project", "@geometry", "@assignment"], param)

const validateEventParams = (event: EventNames, param: MaybeString) => {
  const invariant = (value: any) => {
    if (!value) {
      ERROR(FORMAT("Invalid usage of ON(): \"%s\" is not a valid field for the \"%s\" event", param, event))
    }
  }

  const field = FIELD(param)

  switch (event) {
    case "change": {
      if (isMagicDataName(param)) { return }
      invariant(FIELD(param))
      break
    }

    case "click": {
      invariant(field && field.type === "HyperlinkField")
      break
    }

    case "load-repeatable":
    case "new-repeatable":
    case "edit-repeatable":
    case "save-repeatable":
    case "validate-repeatable": {
      invariant(field && field.type === "Repeatable")
    }

    case "change-geometry": {
      if (param) { invariant(field && field.type === "Repeatable") }
      break
    }

    case "add-photo":
    case "remove-photo": {
      invariant(field && field.type === "PhotoField")
      break
    }

    case "add-video":
    case "remove-video": {
      invariant(field && field.type === "VideoField")
      break
    }

    case "add-audio":
    case "remove-audio": {
      invariant(field && field.type === "AudioField")
      break
    }
  }
}
