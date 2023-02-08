import { prepareRuntime } from "../../test/helpers"
import SETPROJECTREADONLY from "../SETPROJECTREADONLY"

test("sets status to readonly", () => {
  prepareRuntime()

  const expectedResult = {
    type: "update-element",
    key: "@project",
    attribute: "disabled",
    value: "true",
  }

  SETPROJECTREADONLY(true)
  expect($$runtime.results[0]).toEqual(expectedResult)
})