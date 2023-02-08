import { form } from "../../../../__test-fixtures__"
import { prepareRuntime } from "../../test/helpers"
import DATANAMES from "../DATANAMES"

beforeAll(() => {
  const runtime = prepareRuntime()
  runtime.form = form
  runtime.prepare()
})

test("returns the data names of the form fields", () => {
  const names = DATANAMES()
  expect(names).toEqual([ "name", "items", "cost", "choice_value", "child_items", "child_item_cost", "choice_field" ])
})

test("it accepts a type argument to filter the data names by type", () => {
  const names = DATANAMES("Repeatable")
  expect(names).toEqual([ "items", "child_items" ])
})

test("if a type passed in is not a valid FormFieldType it returns all the elements", () => {
  const names = DATANAMES("choicefield")
  expect(names).toEqual([ "name", "items", "cost", "choice_value", "child_items", "child_item_cost", "choice_field" ])
})
