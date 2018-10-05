import { isFunction, isString } from "lodash"
import {
  AddAudioEvent,
  AddAudioEventName,
  AddPhotoEvent,
  AddPhotoEventName,
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
import ERROR from "./ERROR"

/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
export default function OFF(name: FormEventNames, callback: (event: FormEvent) => void): void
export default function OFF(name: FieldEventNames, field: string, callback: (event: FieldEvent) => void): void
export default function OFF(name: RepeatableEventNames, field: string, callback: (event: RepeatableEvent) => void): void
export default function OFF(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void
export default function OFF(name: ChangeGeometryEventName, field: string, callback: (event: GeometryEvent) => void): void
export default function OFF(name: AddPhotoEventName, callback: (event: AddPhotoEvent) => void): void
export default function OFF(name: RemovePhotoEventName, callback: (event: RemoveMediaEvent) => void): void
export default function OFF(name: AddVideoEventName, callback: (event: AddVideoEvent) => void): void
export default function OFF(name: RemoveVideoEventName, callback: (event: RemoveVideoEvent) => void): void
export default function OFF(name: AddAudioEventName, callback: (event: AddAudioEvent) => void): void
export default function OFF(name: RemoveAudioEventName, callback: (event: RemoveAudioEvent) => void): void
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
