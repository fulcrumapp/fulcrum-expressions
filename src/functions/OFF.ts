import { isFunction, isString } from "lodash"
import {
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
import ERROR from "./ERROR"

/**
 * Detaches an event handler set by ON.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
export default function OFF(name: FormEventNames, callback: (event: FormEvent) => void): void
export default function OFF(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void
export default function OFF(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void
export default function OFF(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void
export default function OFF(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void
export default function OFF(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void
export default function OFF(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void
export default function OFF(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void
export default function OFF(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void
export default function OFF(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void
export default function OFF(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void
export default function OFF(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void
export default function OFF(name: EventNames, ...args: any[]): void {
  let param = null
  let callback = null

  if (args.length === 2) {
    [param, callback] = args
  } else if (args.length === 1) {
    const arg = args[0]

    if (isString(arg)) {
      param = arg
    } else if (isFunction(arg)) {
      callback = arg
    }
  }

  if (!isString(name)) {
    ERROR("name must be a string")
  }

  if (param && !isString(param)) {
    ERROR("param must be a string")
  }

  if (callback && !isFunction(callback)) {
    ERROR("callback must be a function")
  }

  $$runtime.removeHook(name, param, callback)
}
