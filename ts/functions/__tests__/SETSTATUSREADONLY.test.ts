import { prepareRuntime } from "../../test/helpers"
import SETSTATUSREADONLY from "../SETSTATUSREADONLY"

test("sets status to readonly", () => {
  prepareRuntime()

  const expectedResult = {
    type: "update-element",
    key: "@status",
    attribute: "disabled",
    value: "true",
  }

  SETSTATUSREADONLY(true)
  expect($$runtime.results[0]).toEqual(expectedResult)
})