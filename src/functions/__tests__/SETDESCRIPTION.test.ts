import { prepareRuntime } from "../../test/helpers"
import form from "../../test/fixtures/form"
import SETDESCRIPTION from "../SETDESCRIPTION"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore FormFields type check for tests
  $$runtime.elementsByDataName.name = form.elements[0]
})

test("sets the description of a field", () => {
  const expectedResult = {
    type: "update-element",
    key: "97ab",
    attribute: "description",
    value: '"Name of park"',
  }

  SETDESCRIPTION("name", "Name of park")
  
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("value param is optional", () => {
  SETDESCRIPTION("name")
  // @ts-ignore value attribute will exist after SETDESCRIPTION call
  expect($$runtime.results[0].value).toBeNull()
})

test("will accept value params other than strings", () => {
  SETDESCRIPTION("name", 12345)
  SETDESCRIPTION("name", true)
  // @ts-ignore value attribute will exist after SETDESCRIPTION call
  expect($$runtime.results[0].value).toEqual("\"12345\"")
  // @ts-ignore value attribute will exist after SETDESCRIPTION call
  expect($$runtime.results[1].value).toEqual("\"true\"")
})