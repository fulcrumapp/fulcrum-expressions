import { form } from "../../../../__test-fixtures__"
import { prepareRuntime } from "../../test/helpers"
import { FormTextField, RepeatableField } from "../../types/fields"
import FIELDS from "../FIELDS"

beforeEach(() => {
  const runtime = prepareRuntime()
  runtime.form = form
  // normally this is done when runtime connects to host
  // @ts-ignore name does not recognize 0-indexed element of elements array is a FormTextField
  const name: FormTextField = form.elements[0]
  // @ts-ignore items does not recognize 1-indexed element of elements array is a RepeatableField
  const items: RepeatableField = form.elements[1]
  $$runtime.elementsByDataName.name = name // name element, no children
  $$runtime.elementsByDataName.items = items // items element, children
})

test("returns the child fields", () => {
  expect(FIELDS("items").length).toBe(4)
  expect(FIELDS("items", {repeatables: false}).length).toBe(3)
})

test("returns undefined if no child fields exist", () => {
  expect((FIELDS("does_not_exist"))).toBeUndefined()
  expect((FIELDS("name"))).toBeUndefined()
})
