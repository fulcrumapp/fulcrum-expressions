import { isString } from "lodash"
import ERROR from "./ERROR"

/**
 * Sets the mode of the current runtime.
 *
 * @param mode (String, required): the mode to set
 */
export default function SETMODE(mode: string): void {
  if (mode == null || !isString(mode)) {
    ERROR("mode must be a string")
  }
  ($$runtime as any).mode = mode
}
