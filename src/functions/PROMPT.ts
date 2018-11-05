import ERROR from "./ERROR"
import MESSAGEBOX from "./MESSAGEBOX"

/**
 * Display a text field to get input from the user and a callback to respond to the result.
 * @param title required; A short title for the alert; pass in `null` for no title
 * @param message required; The message content for the alert
 * @param callback required; Function to be invoked when the message box is dismissed
 * @example
 * PROMPT('Please enter the current year', function (result) {
 * if (result.input === new Date().getFullYear()) {
 *   // Correct
 * } else {
 *   // Incorrect
 * }
 * });
 */

export default function PROMPT(title: string|null, message: string, callback: Function): void {
  if (arguments.length < 3) { ERROR("You must pass in a title, a message, and a callback")}

  const buttons: string[] = ["Cancel", "Okay"]

  MESSAGEBOX({ title, message, buttons, input: true }, callback)
}
