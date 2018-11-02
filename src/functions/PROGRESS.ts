import { isNull, isUndefined } from "lodash"

export interface ProgressResult {
  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
   * system generated 4 character codes.
   */
  title: string|null,
  /** message to be displayed with invalidation error */
  message: string|null,
  /** result type  */
  type: "progress"
}

/**
 * Something about progress.
 */

export default function PROGRESS(...args: string[]): void {
  let title: string|null = null
  let message: string = args[0]

  if (args.length > 1) {
    title = arguments[0]
    message = arguments[1]
  }

  const result: ProgressResult = {
    message: isNull(message) || isUndefined(message) ? null : message.toString(),
    title: isNull(title) || isUndefined(title) ? null : title.toString(),
    type: "progress",
  }

  $$runtime.results.push(result)
}
