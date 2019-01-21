import { isUndefined } from "lodash"
import { state } from "./state"
import setTimeout from "./set-timeout"

/**
 * The SETINTERVAL function can be used to repeatedly call a function at a specified interval. 
 * It’s nearly identical to the web platform standard setInterval.
 * @param callback required; function to be called
 * @param interval required; numeric value indicating number of milliseconds between subsequent calls
 * @returns numeric id interval on host
 */

export default function setInterval(callback: Function, interval: number): number|undefined {
  if (!isUndefined($$runtime.$$setTimeout)) {
    const id = ++state().nextIntervalID

    const wrapper = () => {
      if (state().intervals[id]) {
        state().intervals[id] = setTimeout(wrapper, interval)
        callback()
      }
    }

    state().intervals[id] = setTimeout(wrapper, interval)

    return id
  }
}
