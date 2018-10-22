import FIELD from "../../functions/FIELD"
import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import { converters } from "../converters"
import makeValue from "../make-value"

beforeEach(() => {
  prepareRuntime()
  // need to populate elementsByDataName so that FIELD call in make-value works
  const field: FormFields = {
    data_name: "name",
    disabled: false,
    hidden: false,
    key: "abcd",
    label: "My TextField",
    required: false,
    type: "TextField",
  }

  $$runtime.elementsByDataName.name = field
})

test("returns a properly formatted value based on the form element type", () => {
  const element = FIELD("name")
  const result = makeValue(element, "Testy McTesterson")
  expect(result).toEqual("Testy McTesterson")
})

test("calls the correct value converter based on form element type", () => {
  const textFieldFunc = converters.TextField = jest.fn()
  const element = FIELD("name")
  makeValue(element, "Testy McTesterson")

  expect(textFieldFunc).toHaveBeenCalled()
})

test("returns null if no value is passed in", () => {
  const element = FIELD("name")
  const result = makeValue(element)
  expect(result).toBeNull()
})

test("returns null if element type is not a FormField", () => {
  const badField  = {
    data_name: "whoops",
    disabled: false,
    hidden: false,
    key: "efgh",
    label: "Huge Mistake",
    required: false,
    type: "FailField",
  }
  // @ts-ignore Not a proper FormField so makeValue returns null
  $$runtime.elementsByDataName.whoops = badField
  const badElement = FIELD("whoops")
  expect(makeValue(badElement, "this doesn't matter")).toBeNull()
})
