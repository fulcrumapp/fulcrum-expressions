import { MaybeString } from "../types/primitives"
import ERROR from "./ERROR"
import MESSAGEBOX, { MessageBoxPayload } from "./MESSAGEBOX"

/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/confirm/
 * @param title (String, required): short title for popup box
 * @param message (String, required): message to display to the user
 * @param callback (Function, required): to be invoked upon closing the popup box
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
