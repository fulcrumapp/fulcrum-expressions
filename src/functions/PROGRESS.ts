import { isNull, isUndefined } from "lodash"
import { ProgressResult } from "../types/results"

/**
 * Displays a non-dismissible message that can be used to provide feedback when performing an asynchronous function.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/progress/
 * @param title (String, required): A short title for the progress message
 * @param message (String, required): The message content for the progress alert
 */

export default function PROGRESS(title?: null|string, message?: null|string): void {
  const result: ProgressResult = {
    message: isNull(message) || isUndefined(message) ? null : message.toString(),
    title: isNull(title) || isUndefined(title) ? null : title.toString(),
    type: "progress",
  }

  $$runtime.results.push(result)
}
