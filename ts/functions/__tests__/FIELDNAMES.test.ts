import { form } from "../../../../__test-fixtures__"
import { prepareRuntime } from "../../test/helpers"
import { FormTextField, RepeatableField } from "../../types/fields"
import FIELDNAMES from "../FIELDNAMES"

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

test("returns the child field names", () => {
  expect(FIELDNAMES("items")).toEqual(["cost", "choice_value", "child_items", "child_item_cost"])
  expect(FIELDNAMES("items", {repeatables: false})).toEqual(["cost", "choice_value", "child_items"])
})

test("returns undefined for invalid data names", () => {
  expect(FIELDNAMES("does_not_exist")).toBeUndefined()
  expect(FIELDNAMES("name")).toBeUndefined()
})
