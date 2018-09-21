export interface AlertResult {
  type: "message"
  title?: string
  message?: string
}

interface ToStringable {
  toString(): string
}

/**
 * Display a message as an alert.
 * ALERT displays a message to the user. You can provide both the title and message of the alert box.
 * @example
 * ALERT('Warning!', 'A depth of 98 feet is high. Are you sure?');
 *
 * // Displays an alert that looks like
 * // +-------------------------------------------+
 * // | Warning!                                  |
 * // +-------------------------------------------|
 * // |                                           |
 * // | A depth of 98 feet is high. Are you sure? |
 * // |                                           |
 * // +-------------------------------------------+
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
    type: "message",
    title: title ? title.toString() : null,
    message: message ? message.toString() : null,
  })
}
