import { prepareRuntime } from "../../test/helpers"
import form from "../../test/fixtures/form"
import SETHIDDEN from "../SETHIDDEN"

test("sets a field to hidden", () => {
  prepareRuntime()
  // @ts-ignore FormFields check for tests
  $$runtime.elementsByDataName.items = form.elements[1]

  const expectedResult = {
    type: "update-element",
    key: "1337",
    attribute: "hidden",
    value: "true",
  }

  SETHIDDEN("items", true)
  SETHIDDEN("items")
  expect($$runtime.results[0]).toEqual(expectedResult)
  // @ts-ignore value attribute will exists after SETHIDDEN is called
  expect($$runtime.results[1].value).toBeNull()
})