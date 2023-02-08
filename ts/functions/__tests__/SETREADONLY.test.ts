import { prepareRuntime } from "../../test/helpers"
import { form } from "../../../../__test-fixtures__"
import SETREADONLY from "../SETREADONLY"
import SETDISABLED from "../SETDISABLED"

test.each([
  SETREADONLY, SETDISABLED
])("sets a field to hidden", (setReadOnly) => {
  prepareRuntime()
  // @ts-ignore FormFields type checking for tests
  $$runtime.elementsByDataName.cost = form.elements[1].elements[0]

  const expectedResult = {
    type: "update-element",
    key: "1338",
    attribute: "disabled",
    value: "true",
  }

  setReadOnly("cost", true)
  setReadOnly("cost")
  expect($$runtime.results[0]).toEqual(expectedResult)
  // @ts-ignore value attribute will exist once SETREADONLY is called
  expect($$runtime.results[1].value).toBeNull()
})