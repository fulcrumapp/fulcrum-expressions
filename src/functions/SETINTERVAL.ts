import hostSetInterval from "../host/set-timeout"

/**
 * Sets up a function to be called repeatedly after a fixed time delay.
 * The SETINTERVAL function can be used to repeatedly call a function at a specified interval.
 * It’s nearly identical to the web platform standard
 * [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).
 * @param function The function to execute after interval
 * @param delay The number of milliseconds to delay (e.g. 1000 is 1 second)
 * @returns timer ID that can be used to clear the interval with [CLEARINTERVAL](/data-events/reference/clearinterval)
 * @example
 * // Set a field label to the current GPS accuracy every 5 seconds
 * ON('load-record', function(event) {
 *  var fiveSeconds = 1000 * 5;

 *  SETINTERVAL(function() {
 *    if (CURRENTLOCATION()) {
 *      SETLABEL('accuracy', CURRENTLOCATION().accuracy);
 *    }
 *   }, fiveSeconds);
 *  });
 */
export default function SETINERVAL(fn: Function, timeout: number) {
  return hostSetInterval(fn, timeout)
}
