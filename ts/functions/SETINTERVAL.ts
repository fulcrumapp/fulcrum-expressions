import hostSetInterval from "../host/set-timeout"

/**
 * Sets up a function to be called repeatedly after a fixed time delay.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setinterval/
 * @param function (Function, required): function to execute after interval
 * @param delay (Number, required): number of milliseconds to delay (e.g. 1000 is 1 second)
 * @returns timer ID that can be used to clear the interval with `CLEARINTERVAL`
 */
export default function SETINTERVAL(fn: Function, timeout: number) {
  return hostSetInterval(fn, timeout)
}
