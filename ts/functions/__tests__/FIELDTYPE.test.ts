import { form } from "../../../../__test-fixtures__"
import { prepareRuntime } from "../../test/helpers"
import { ChoiceField, FormTextField, RepeatableField } from "../../types/fields"
import FIELDTYPE from "../FIELDTYPE"

beforeEach(() => {
  const runtime = prepareRuntime()
  runtime.form = form
  // normally this is done when runtime connects to host
  // @ts-ignore name does not recognize 0-indexed element of elements array is a FormTextField
  const name: FormTextField = form.elements[0]
  // @ts-ignore items does not recognize 1-indexed element of elements array is a RepeatableField
  const items: RepeatableField = form.elements[1]
  // @ts-ignore name does not recognize 2-indexed element of elements array is a FormTextField
  const choiceField: ChoiceField = form.elements[2]
  $$runtime.elementsByDataName.name = name
  $$runtime.elementsByDataName.items = items
  $$runtime.elementsByDataName.choice_field = choiceField
})

test("returns field type for data name", () => {
  expect(FIELDTYPE("name")).toEqual("TextField")
  expect(FIELDTYPE("items")).toEqual("Repeatable")
  expect(FIELDTYPE("choice_field")).toEqual("ChoiceField")
})

test("returns undefined for invalid dataNames", () => {
  expect(FIELDTYPE("does_not_exist")).toBeUndefined()
})
