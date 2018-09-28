import Runtime from "./runtime"

/**
 * Setup a new instance of the $$runtime global.
 */
export const prepareRuntime = () => new Runtime()

/** Simlate a host finishing an async operation */
export const finishAsync = (callbackID: number) => {
  $$runtime.callbackID = callbackID
  $$runtime.finishAsync()
}
