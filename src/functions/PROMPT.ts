import ERROR from "./ERROR"
import MESSAGEBOX from "./MESSAGEBOX"

/**
 * Display a text field to get input from the user and a callback to respond to the result.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/prompt/
 * @param title (String|Null, required): A short title for the alert; pass in `null` for no title
 * @param message (String, required): The message content for the alert
 * @param callback (Function, required): callback
 */

export default function PROMPT(title: string|null, message: string, callback: Function): void {
  if (arguments.length < 3) { ERROR("You must pass in a title, a message, and a callback")}

  const buttons: string[] = ["Cancel", "Okay"]

  MESSAGEBOX({ title, message, buttons, input: true }, callback)
}
