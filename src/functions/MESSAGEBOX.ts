import { isArray, isFunction, isString, isUndefined } from "lodash"
import messageBox from "../host/message-box"
import { MaybeString } from "../types/primitives"
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

type MaybeFunction = Function | undefined

const DEFAULT_BUTTONS = ["Okay"]

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

export default function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void
export default function MESSAGEBOX(options: MessageBoxPayload): void
export default function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void
export default function MESSAGEBOX(options: MessageBoxPayload, callback?: MaybeFunction): void {
  if (!options) { ERROR("options must be provided") }
  if (options.buttons && !isArray(options.buttons)) { ERROR("options.buttons must be an array") }
  if (options.validate && !isFunction(options.validate)) { ERROR("options.validate must be a function") }
  if (callback && !isFunction(callback)) { ERROR("callback must be a function") }

  if (options.buttons) {
    options.buttons = COMPACT(options.buttons)!.map((item: any) => item.toString())
  } else {
    options.buttons = DEFAULT_BUTTONS
  }

  if (!isUndefined(options.input)) {
    options.input = !!options.input
  }

  const payload = {
    buttons: options.buttons ? options.buttons : null,
    default: options.default ? options.default : null,
    input: options.input ? options.input : null,
    message: options.message ?  options.message.toString() : null,
    placeholder: options.placeholder ? options.placeholder.toString() : null,
    title: options.title ? options.title.toString() : null,
  }

  const validationWrapper = (result: any) => {
    if (options.validate) {
      const errorMessage = options.validate(result)

      if (isString(errorMessage)) {
        const newOptions = { ...options, default: result.input }

        MESSAGEBOX({ title: errorMessage }, () => MESSAGEBOX(newOptions, callback as Function))
        return
      }
    }

    callback!(result)
  }

  messageBox(JSON.stringify(payload), validationWrapper)
}
