import { prepareRuntime } from "../../test/helpers"
import SETPROJECT from "../SETPROJECT"

test("sets a project for a record", () => {
  prepareRuntime()

  const expectedResult = {
    key: "@project",
    type: "set-value",
    value: "\"Bollard Inspection\"",
  }

  SETPROJECT("Bollard Inspection")
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("throws an error is project param is not a string", () => {
  expect(() => SETPROJECT(1234)).toThrow("project must be a string")
  expect(() => SETPROJECT(["Bollard Inspection"])).toThrow("project must be a string")
  expect(() => SETPROJECT(true)).toThrow("project must be a string")
  expect(() => SETPROJECT({ project: "Bollard Inspection" })).toThrow("project must be a string")
})