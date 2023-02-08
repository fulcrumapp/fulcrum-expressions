import { prepareRuntime } from "../../test/helpers"
import SETSTATUS from "../SETSTATUS"

test("updates status", () => {
  const expectedResult = {
    key: "@status",
    type: "set-value",
    value: "\"completed\"",
  }
  prepareRuntime()
  SETSTATUS("completed")
  SETSTATUS(null)

  expect($$runtime.results[0]).toEqual(expectedResult)
  // @ts-ignore value attribute will exist after SETSTATUS is called
  expect($$runtime.results[1].value).toEqual("null")
})

test("throws an error is not passed a string", () => {
  expect(() => SETSTATUS(1234)).toThrow("status must be a string")
  expect(() => SETSTATUS([ "pending" ])).toThrow("status must be a string")
  expect(() => SETSTATUS({ status: "critical" })).toThrow("status must be a string")
})
