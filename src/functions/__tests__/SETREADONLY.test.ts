import { prepareRuntime } from "../../test/helpers"
import form from "../../test/fixtures/form"
import SETREADONLY from "../SETREADONLY"

test("sets a field to hidden", () => {
  prepareRuntime()
  // @ts-ignore FormFields type checking for tests
  $$runtime.elementsByDataName.cost = form.elements[1].elements[0]

  const expectedResult = {
    type: "update-element",
    key: "1338",
    attribute: "disabled",
    value: "true",
  }

  SETREADONLY("cost", true)
  SETREADONLY("cost")
  expect($$runtime.results[0]).toEqual(expectedResult)
  // @ts-ignore value attribute will exist once SETREADONLY is called
  expect($$runtime.results[1].value).toBeNull()
})