import { prepareRuntime } from "../../test/helpers"
import { form } from "../../../../__test-fixtures__"
import SETMAXLENGTH from "../SETMAXLENGTH"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore FormFields type check for tests
  $$runtime.elementsByDataName.name = form.elements[0]
})

test("sets the description of a field", () => {
  const expectedResult = {
    type: "update-element",
    key: "97ab",
    attribute: "max_length",
    value: "20",
  }

  SETMAXLENGTH("name", 20)

  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("value param is optional", () => {
  SETMAXLENGTH("name")
  // @ts-ignore value attribute will exist after SETMAXLENGTH call
  expect($$runtime.results[0].value).toBeNull()
})

test("will force non-number values to numeric values", () => {
  SETMAXLENGTH("name", "20")
  SETMAXLENGTH("name", true)
  // @ts-ignore value attribute will exist after SETMAXLENGTH call
  expect($$runtime.results[0].value).toEqual("20")
  // @ts-ignore value attribute will exist after SETMAXLENGTH call
  expect($$runtime.results[1].value).toEqual("1")
})