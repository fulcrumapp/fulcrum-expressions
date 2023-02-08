import { prepareRuntime } from "../../test/helpers"
import SETPROJECTHIDDEN from "../SETPROJECTHIDDEN"

test("sets a field to hidden", () => {
  prepareRuntime()

  const expectedResult = {
    type: "update-element",
    key: "@project",
    attribute: "hidden",
    value: "true",
  }

  SETPROJECTHIDDEN(true)
  expect($$runtime.results[0]).toEqual(expectedResult)
})