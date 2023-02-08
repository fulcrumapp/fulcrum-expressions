import repeatable from "../../test/fixtures/repeatable"
import { RepeatableField } from "../../types/fields"
import repeatableValues from "../repeatable-values"

const repeatableField: RepeatableField = repeatable

const differentItems = [
  { form_values: { "362a": "gizmo" } },
]

const items = [
  { form_values: { 1338: "98.00" } },
]

test("returns an array of values for a specific field contained in a repeatable", () => {
  expect(repeatableValues(repeatableField, items, "cost")).toEqual([98])
  expect(repeatableValues(repeatableField, differentItems, "choice_value")).toEqual(["gizmo"])
})

test("returns null if a non-array if passed in for items", () => {
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatableField, "fail", "fail_field")).toBeNull()
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatableField, 78900, "fail_field")).toBeNull()
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatableField, true, "fail_field")).toBeNull()
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatableField, { badField: "test"} , "fail_field")).toBeNull()
})

test("returns if the dataName param is invalid", () => {
  expect(repeatableValues(repeatableField, items, "not_cost")).toBeNull()
  expect(repeatableValues(repeatableField, differentItems, "not_choice_value")).toBeNull()
})
