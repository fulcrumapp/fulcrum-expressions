import { MaybeString } from "../types/primitives"
import ERROR from "./ERROR"
import MESSAGEBOX, { MessageBoxPayload } from "./MESSAGEBOX"

/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 * @param title short title for popup box
 * @param message message to display to the user
 * @param callback callback to invoke upon closing the popup box
 * @example
 * CONFIRM('Confirm',
 * 'You have selected a critical safety violation. Are you sure?',
 * function (result) {
 * if (result.value === 'Okay') {
 *  // Selected Okay
 * } else {
 *  // Selected Cancel
 * }
 * });
 * )
 */
export default function CONFIRM(title: string, message: string, callback: Function): void
export default function CONFIRM(message: string, callback: Function): void
export default function CONFIRM(...args: Array<string | Function>) {
  if (args.length < 2) { ERROR("CONFIRM requires two arguments, a string message and a callback") }

  let title = null
  let message
  let callback

  if (args.length === 2) {
    [ message, callback ] = args
  } else {
    [ title, message, callback ] = args
  }

  const options = {
    buttons: ["Cancel", "Okay"],
    message: message as MaybeString,
    title: title as MaybeString,
  }

  MESSAGEBOX(options, callback as Function)
}
