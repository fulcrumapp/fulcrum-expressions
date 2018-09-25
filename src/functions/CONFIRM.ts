import MESSAGEBOX, { MessageBoxPayload } from "./MESSAGEBOX"

/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 * @param title(optional) string; short title for confirm box
 * @param message(required) string
 * @param callback(required) callback to invoke upon closing the confirm box
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

export default function CONFIRM(...args: any[]): Function | MessageBoxPayload {
  let title = null
  let message = null
  let callback = null
  if (args.length === 2) {
    title = null
    message = args[0]
    callback = args[1]
  } else {
    title = arguments[0]
    message = arguments[1]
    callback = arguments[2]
  }
  const options = { title, message, buttons: ["Cancel", "Okay"]}

  return MESSAGEBOX(options, callback)
}
