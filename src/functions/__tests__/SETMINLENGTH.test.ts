import { prepareRuntime } from "../../test/helpers"
import form from "../../test/fixtures/form"
import SETMINLENGTH from "../SETMINLENGTH"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore FormFields type check for tests
  $$runtime.elementsByDataName.name = form.elements[0]
})

test("sets the description of a field", () => {
  const expectedResult = {
    type: "update-element",
    key: "97ab",
    attribute: "min_length",
    value: "20",
  }

  SETMINLENGTH("name", 20)
  
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("value param is optional", () => {
  SETMINLENGTH("name")
  // @ts-ignore value attribute will exist after SETMINLENGTH call
  expect($$runtime.results[0].value).toBeNull()
})

test("will force non-number values to numeric values", () => {
  SETMINLENGTH("name", "20")
  SETMINLENGTH("name", true)
  // @ts-ignore value attribute will exist after SETMINLENGTH call
  expect($$runtime.results[0].value).toEqual("20")
  // @ts-ignore value attribute will exist after SETMINLENGTH call
  expect($$runtime.results[1].value).toEqual("1")
})