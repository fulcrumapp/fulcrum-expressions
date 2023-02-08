import { state } from "./state";
import clearTimeout from "./clear-timeout"

/**
 * Clears an interval from event queue.
 * @param id required; id for interval to be cleared
 */

export default function clearInterval(id: number): void {
  if (state().intervals[id]) {
    clearTimeout(state().intervals[id])
    delete state().intervals[id]
  }
}
