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
 * Displays a non-dismissible message that can be used to provide feedback when performing an asynchronous function.
 * @description While fetching data from an API using REQUEST it might be desirable
 * to let the user know that the request is in progress. This is an advanced function that requires thorough
 * testing and error checking in your logic since the message is not dismissible by the user. To dismiss
 * the progress message, call PROGRESS();.
 * @param title required; A short title for the progress message
 * @param message required; The message content for the progress alert
 * @example
 * const url: string = 'https://example.com';
 * // show progress message while request is happening
 * PROGRESS('Searching for nearby facilities ...');
 *
 * REQUEST(url, function(error, response, body) {
 *  // resets progress message after request finishes
 *  PROGRESS();
 *  if (error) {
 *    ALERT(INSPECT(error));
 *  } else {
 *   // do something with the API response
 *  }
 * });
 */

export default function PROGRESS(title?: null|string, message?: null|string): void {
  const result: ProgressResult = {
    message: isNull(message) || isUndefined(message) ? null : message.toString(),
    title: isNull(title) || isUndefined(title) ? null : title.toString(),
    type: "progress",
  }

  $$runtime.results.push(result)
}
