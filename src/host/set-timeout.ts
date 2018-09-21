import { state } from "./state"

/**
 * Queues up a function to run after the desired interval on the Host
 * @param callback callback to call
 * @param timeout timeout to call
 */
export default function setTimeout(callback: Function, timeout: number) {
  const hostSetTimeout = $$runtime.$$setTimeout

  if (!hostSetTimeout) { return }

  const id = ++state().nextTimeoutID

  state().timeouts[id] = () => {
    if (state().timeouts[id]) {
      delete state().timeouts[id]
      callback()
    }
  }

  $$runtime.invokeAsync(hostSetTimeout, [timeout], callback)

  return id
}
