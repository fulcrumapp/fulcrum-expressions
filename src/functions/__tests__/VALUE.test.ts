import { prepareRuntime } from "../../test/helpers"
import VALUE from "../VALUE"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore
  $$runtime.variables.$name = "Test Record"
  // @ts-ignore
  $$runtime.variables.$choice_field = { choice_values: ["apples", "oranges"], other_values: ["other"]}
})

test("returns a data value by a string", () => {
  expect(VALUE("name")).toEqual("Test Record")
  expect(VALUE("choice_field")).toEqual({ choice_values: ["apples", "oranges"], other_values: ["other"]})
  expect(VALUE(null)).toBeUndefined()
  expect(VALUE("invalid_field")).toBeUndefined()
})
