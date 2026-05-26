import hostSetTimeout from "../host/set-timeout"

/**
 * Calls a function after a specified delay.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/settimeout/
 * @param function (Function, required): function to execute after the delay
 * @param delay (Number, required): number of milliseconds to delay (e.g. 1000 is 1 second)
 * @returns timer ID that can be used to clear the timeout with `CLEARTIMEOUT`
 */
export default function SETTIMEOUT(fn: Function, timeout: number) {
  return hostSetTimeout(fn, timeout)
}
