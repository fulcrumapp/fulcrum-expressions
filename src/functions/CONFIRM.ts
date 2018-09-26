import ERROR from "./ERROR"
import MESSAGEBOX, { MessageBoxPayload } from "./MESSAGEBOX"

/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 * @param title(optional) string; short title for popup box
 * @param message(required) string
 * @param callback(required) callback to invoke upon closing the popup box
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

export default function CONFIRM(...args: any[]): Function | MessageBoxPayload
export default function CONFIRM(): void
export default function CONFIRM(...args: any[]): Function | MessageBoxPayload | void {
  if (args.length < 2) { return ERROR("CONFIRM requires two arguments, a string message and a callback") }

  let title = null
  let message
  let callback
  if (args.length === 2) {
    message = args[0]
    callback = args[1]
  } else {
    title = args[0]
    message = args[1]
    callback = args[2]
  }
  const options = { title, message, buttons: ["Cancel", "Okay"] }

  return MESSAGEBOX(options, callback)
}
