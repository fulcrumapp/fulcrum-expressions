
interface ToStringable {
  toString(): string
}

/**
 * Display a message as an alert. You can provide both the title and message of the alert box.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/alert/
 * @param title (String, required): short title for alert
 * @param message (String, required): message to display
 */
export default function ALERT(message: ToStringable): void
export default function ALERT(title: ToStringable, message: ToStringable): void
export default function ALERT(): void {
  let title = null
  let message = arguments[0]

  if (arguments.length > 1) {
    title = arguments[0]
    message = arguments[1]
  }

  $$runtime.results.push({
    message: message ? message.toString() : null,
    title: title ? title.toString() : null,
    type: "message",
  })
}
