import { map, some } from "lodash"
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

export const extendContainAllElements = () => expect.extend({
  // doesn't work - doesn't ensure that it's only there once, for example
  toContainAllElements(received, expected) {
    let pass = false
    // each element in expected must be present in received
    const values: boolean[] = map(received, (value: any) => expected.includes(value))
    const missingValues: boolean = some(values, (value) => value === false)

    // there can be no missing values and both arrays must be of the same length
    if (!missingValues && received.length === expected.length) { pass = true }
    if (pass) {
      return {
        message: () =>
          `did not expect all values of ${received} to be present in ${expected}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected all values of ${received} to be present in ${expected}`,
        pass: false,
      }
    }
  }
})