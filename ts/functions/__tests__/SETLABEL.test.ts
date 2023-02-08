import { prepareRuntime } from "../../test/helpers"
import { form } from "../../../../__test-fixtures__"
import SETLABEL from "../SETLABEL"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore FormFields type check for tests
  $$runtime.elementsByDataName.name = form.elements[0]
})

test("sets the description of a field", () => {
  const expectedResult = {
    type: "update-element",
    key: "97ab",
    attribute: "label",
    value: '"Name"',
  }

  SETLABEL("name", "Name")

  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("value param is optional", () => {
  SETLABEL("name")
  // @ts-ignore value attribute will exist after SETLABEL call
  expect($$runtime.results[0].value).toBeNull()
})

test("will accept value params other than strings", () => {
  SETLABEL("name", 12345)
  SETLABEL("name", true)
  // @ts-ignore value attribute will exist after SETLABEL call
  expect($$runtime.results[0].value).toEqual("\"12345\"")
  // @ts-ignore value attribute will exist after SETLABEL call
  expect($$runtime.results[1].value).toEqual("\"true\"")
})