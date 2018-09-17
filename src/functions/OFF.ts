import { isString, isFunction } from "lodash"
import ERROR from "./ERROR"
import { EventNames, EventBinder } from "../events";

// These overloads must be kept in sync with `ON`

/**
 * OFF
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
const OFF: EventBinder = function(name: EventNames, ...args: any[]) {
  let param, callback

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
    ERROR('name must be a string')
  }

  if (param && !isString(param)) {
    ERROR('param must be a string')
  }

  if (callback && !isFunction(callback)) {
    ERROR('callback must be a function')
  }

  // $$runtime.removeHook(name, param, callback)
}

export default OFF
