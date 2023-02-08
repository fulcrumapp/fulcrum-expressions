import { prepareRuntime } from "../../test/helpers"
import { form } from "../../../../__test-fixtures__"
import SETREQUIRED from "../SETREQUIRED"

test("sets a field to required", () => {
  prepareRuntime()
  // @ts-ignore FormFields check for tests
  $$runtime.elementsByDataName.items = form.elements[1]

  const expectedResult = {
    type: "update-element",
    key: "1337",
    attribute: "required",
    value: "true",
  }

  SETREQUIRED("items", true)
  SETREQUIRED("items")
  expect($$runtime.results[0]).toEqual(expectedResult)
  // @ts-ignore value attribute will exists after SETHIDDEN is called
  expect($$runtime.results[1].value).toBeNull()
})