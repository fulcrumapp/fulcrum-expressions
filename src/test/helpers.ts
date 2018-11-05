import Runtime from "../runtime"

/**
 * Setup a new instance of the $$runtime global.
 */
export const prepareRuntime = () => new Runtime()

/** Simlate a host finishing an async operation */
export const finishAsync = (callbackID: number) => {
  $$runtime.callbackID = callbackID
  $$runtime.finishAsync()
}

export const extendToBeWithinRange = () => expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass: boolean = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      }
    }
  },
})
