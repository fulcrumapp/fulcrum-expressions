import FIELD from "../../functions/FIELD"
import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import { FormFields, FormTextField, RepeatableField } from "../../types/fields"
import isSetValueSupported from "../is-set-value-supported"

beforeEach(() => {
  prepareRuntime()
  $$runtime.form = form
  const repeatable: RepeatableField = $$runtime.form.elements[1]
  const text: FormTextField = $$runtime.form.elements[0]
  // add elementsByKey (used in isSetValueSupported)
  $$runtime.elementsByKey[repeatable.key] = repeatable
  $$runtime.elementsByKey[text.key] = text
  // add elementsByDataName (used in FIELD)
  $$runtime.elementsByDataName.name = text
  $$runtime.elementsByDataName.items = repeatable
})

test("determines whether SETVALUE can be called for a form element", () => {
  const containerElements = $$runtime.form.elements
  const element = FIELD("name")
  expect(isSetValueSupported(containerElements, element, element.type)).toBe(true)
})

test("returns false if the type passed in doesn't exist", () => {
  const containerElements = $$runtime.form.elements
  const element = FIELD("items")
  // should return false if type doesn't exist
  expect(isSetValueSupported(containerElements, element, "FailField")).toBe(false)

  // element does not exist on our current form object
  const linkElement: FormFields = {
    data_name: "my-field",
    disabled: false,
    hidden: false,
    key: "abcd",
    label: "My Hyperlink Field",
    required: false,
    type: "HyperlinkField",
  }
  expect(isSetValueSupported(containerElements, linkElement, linkElement.type)).toBe(false)
})
