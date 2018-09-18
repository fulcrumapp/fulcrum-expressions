import { state } from "./state"

/**
 * Remove the timeout call from the host
 * @param id id of the setTimeout call
 */
export default function clearTimeout(id: number) {
  delete state().timeouts[id]
}
