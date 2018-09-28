import hostSetTimeout from "../host/set-timeout"

/**
 * Calls a function after a specified delay.
 * The SETTIMEOUT function can be used to delay execution of a function for a specified amount of time. It's
 * nearly identical to the web platform standard
 * [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout).
 * @param function The function to execute after the delay
 * @param delay The number of milliseconds to delay (e.g. 1000 is 1 second)
 * @returns timer ID that can be used to clear the timeout with [CLEARTIMEOUT](/data-events/reference/cleartimeout/)
 * @example
 * ON('load-record', function(event) {
 *   var fiveMinutes = 1000 * 60 * 5;
 *
 *   SETTIMEOUT(function() {
 *     ALERT("You've been editing this record for 5 minutes.");
 *   }, fiveMinutes);
 * });
 */
export default function SETTIMEOUT(fn: Function, timeout: number) {
  return hostSetTimeout(fn, timeout)
}
