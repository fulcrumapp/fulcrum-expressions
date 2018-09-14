import { isString, isFunction } from "lodash"
import ERROR from "./ERROR"
import {
  AddPhotoEvent,
  RemoveMediaEvent,
  AddVideoEvent,
  RemoveVideoEvent,
  AddAudioEvent,
  RemoveAudioEvent,
  FieldEventNames,
  FieldEvent,
  RepeatableEventNames,
  RepeatableEvent,
  GeometryEvent,
  FormEventNames,
  FormEvent,
} from "../events";

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
export default function ON(name: "change-geometry", callback: (event: GeometryEvent) => void): void
export default function ON(name: "change-geometry", field: string, callback: (event: GeometryEvent) => void): void
export default function ON(name: "add-photo", callback: (event: AddPhotoEvent) => void): void
export default function ON(name: "remove-photo", callback: (event: RemoveMediaEvent) => void): void
export default function ON(name: "add-video", callback: (event: AddVideoEvent) => void): void
export default function ON(name: "remove-video", callback: (event: RemoveVideoEvent) => void): void
export default function ON(name: "add-audio", callback: (event: AddAudioEvent) => void): void
export default function ON(name: "remove-audio", callback: (event: RemoveAudioEvent) => void): void
export default function ON(...args: any[]) {
  let param = null
  let name, callback

  if (arguments.length === 3) {
    [name, param, callback] = args
  } else {
    [name, callback] = args
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

  // validateEventParams(name, param)
  // $$runtime.addHook(name, param, callback)
}
