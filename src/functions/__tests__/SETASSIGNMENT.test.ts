import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import { SetValueResult } from "../../types/results"
import SETASSIGNMENT from "../SETASSIGNMENT"


beforeEach(() => {
  prepareRuntime()
})

test("assigns a user to record", () => {
  SETASSIGNMENT("John Jacob Jingleheimer Schmidt")
  const resultValue = $$runtime.results[0]
  const expectedValue: SetValueResult = {
    key: "@assignment",
    type: "set-value",
    value: "\"John Jacob Jingleheimer Schmidt\"",
  }

  expect(resultValue).toEqual(expectedValue)
})

test("throws an error if not passed a user name as a string", () => {
  // @ts-ignore improper user name passed in to Throw
  expect(() => SETASSIGNMENT(1234)).toThrow("user must be a string")
})