import { includes, isFunction, isString } from "lodash"
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
import { MaybeString } from "../types/primitives"
import ERROR from "./ERROR"
import FIELD from "./FIELD"
import FORMAT from "./FORMAT"

/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */

export default function ON(name: FormEventNames, callback: (event: FormEvent) => void): void
export default function ON(name: FieldEventNames, field: string, callback: (event: FieldEvent) => void): void
export default function ON(name: RepeatableEventNames, field: string, callback: (event: RepeatableEvent) => void): void
export default function ON(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void
export default function ON(name: ChangeGeometryEventName, field: string, callback: (event: GeometryEvent) => void): void
export default function ON(name: AddPhotoEventName, callback: (event: AddPhotoEvent) => void): void
export default function ON(name: RemovePhotoEventName, callback: (event: RemoveMediaEvent) => void): void
export default function ON(name: AddVideoEventName, callback: (event: AddVideoEvent) => void): void
export default function ON(name: RemoveVideoEventName, callback: (event: RemoveVideoEvent) => void): void
export default function ON(name: AddAudioEventName, callback: (event: AddAudioEvent) => void): void
export default function ON(name: RemoveAudioEventName, callback: (event: RemoveAudioEvent) => void): void
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
