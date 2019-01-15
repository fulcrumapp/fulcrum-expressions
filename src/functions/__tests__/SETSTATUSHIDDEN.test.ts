import { prepareRuntime } from "../../test/helpers"
import SETSTATUSHIDDEN from "../SETSTATUSHIDDEN"

test("sets a field to hidden", () => {
  prepareRuntime()

  const expectedResult = {
    type: "update-element",
    key: "@status",
    attribute: "hidden",
    value: "true",
  }

  SETSTATUSHIDDEN(true)
  expect($$runtime.results[0]).toEqual(expectedResult)
})