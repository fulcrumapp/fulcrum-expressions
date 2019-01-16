import { state } from "./state"

/**
 * Removes a timeout call from the host queue.
 * @param id id of the setTimeout call
 */
export default function clearTimeout(id: number) {
  delete state().timeouts[id]
}
