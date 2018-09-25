import { isArray, isFunction, isUndefined } from "lodash"
import { MaybeString } from "../primitives"
import COMPACT from "./COMPACT"
import ERROR from "./ERROR"

export interface MessageBoxPayload {
  title?: MaybeString
  message?: MaybeString
  buttons?: any[]|null|undefined
  validate?: Function|undefined|null
  input?: boolean|undefined|null
  placeholder?: MaybeString
  default?: any[]|null
}

/**
 * MESSAGEBOX displays a message to the user.
 * You can provide both the title and message of the alert box.
 * Using the buttons parameter you can specify the button titles that are displayed in the message box.
 * @param options Object(required) - options for the message box
 * @param callback function(required) - invoked when message box is dismissed
 * @returns invokes callback or returns an options Object
 * @example
 * const options = {
 * title: 'Confirm',
 * message: 'You selected a safety violation: Are you sure?',
 * buttons: ['Yes', 'No']
 * }
 *
 * const callback = function (result) {
 *               if (result.value === 'Yes') {
 *                  // Selected Yes
 *               } else {
 *                 // Selected No
 *               }
 *            }
 *
 * MESSAGEBOX(options, callback);
 */

export default function MESSAGEBOX(options: MessageBoxPayload, callback: Function): MessageBoxPayload | Function
export default function MESSAGEBOX(options: MessageBoxPayload): MessageBoxPayload
export default function MESSAGEBOX(options: MessageBoxPayload,
                                   callback?: Function|undefined): MessageBoxPayload | Function | undefined {
  if (isUndefined(options)) { ERROR("options must be provided") }
  if (!isUndefined(options.buttons) && !isArray(options.buttons)) { ERROR("options.buttons must be an array") }
  if (!isUndefined(options.validate) && !isFunction(options.validate)) { ERROR("options.validate must be a function") }
  if (!isUndefined(callback) && !isFunction(callback)) { ERROR("callback must be a function") }

  if (!isUndefined(options.buttons)) {
    options.buttons = COMPACT(options.buttons).map((item: any) => item.toString())
  } else {
    options.buttons = ["Okay"]
  }
  if (!isUndefined(options.input)) {
    options.input = !!options.input
  }
  if (!isUndefined(callback)) {
    return callback
  } else {
    return {
      buttons: !isUndefined(options.buttons) ? options.buttons : null,
      default: !isUndefined(options.default) ? options.default : null,
      input: !isUndefined(options.input) ? options.input : null,
      message: !isUndefined(options.message) ?  options.message.toString() : null,
      placeholder: !isUndefined(options.placeholder) ? options.placeholder.toString() : null,
      title: !isUndefined(options.title) ? options.title.toString() : null,
    }
  }
}
