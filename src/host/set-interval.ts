import { isUndefined } from "lodash"
import { state } from "./state"

/**
 * Sets a interval at which to call a specified callback.
 * @param callback required; function to be called
 * @param interval required; numeric value indicating number of seconds between subsequent calls
 * @returns numeric id interval on host
 */

export default function setInterval(callback: Function, interval: number): number {
  const hostSetTimeout = $$runtime.$$setTimeout

  if (!isUndefined(hostSetTimeout)) {
    const id = ++state().nextIntervalID

    const wrapper = () => {
      if (state().intervals[id]) {
        state().intervals[id] = () => hostSetTimeout(wrapper, interval)
        callback()
      }
    }

    state().intervals[id] = () => hostSetTimeout(wrapper, interval)

    return id
  }
}
