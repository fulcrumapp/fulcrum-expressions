import { formValues } from "../../../../__test-fixtures__"
import repeatable from "../../test/fixtures/repeatable"
import { prepareRuntime } from "../../test/helpers"
import REPEATABLESUM from "../REPEATABLESUM"

beforeEach(() => {
  prepareRuntime()
  $$runtime.elementsByDataName = {}
  $$runtime.elementsByDataName.items = repeatable
  const cost = repeatable.elements[0]
  // @ts-ignore parent is an optional key
  cost.parent = repeatable
  // @ts-ignore
  $$runtime.elementsByDataName.cost = cost

  const choiceValue = repeatable.elements[1]
  // @ts-ignore parent is an optional key
  choiceValue.parent = repeatable
  // @ts-ignore
  $$runtime.elementsByDataName.choice_value = choiceValue

  const childItems = repeatable.elements[2]
  // @ts-ignore parent is an optional key
  childItems.parent = repeatable
  // @ts-ignore
  $$runtime.elementsByDataName.child_items = childItems
  // @ts-ignore childItems.elements is not undefined
  const childItemCost = childItems.elements[0]
  // @ts-ignore parent is an optional key
  childItemCost.parent = childItems
  // @ts-ignore
  $$runtime.elementsByDataName.child_item_cost = childItemCost
})

const repeatableValue = formValues.form_values["1337"]

test("returns the sum of a specific numeric field within a repeatable field", () => {

  const totalCost: number = REPEATABLESUM(repeatableValue, "cost")

  expect(totalCost).toEqual(6)
})

test("returns the sum of grandchild records", () => {

  const totalCost: number = REPEATABLESUM(repeatableValue, ["child_items", "child_item_cost"])

  expect(totalCost).toEqual(19)
})

test("returns the sum of a specific numeric field within a blank collection of repeatable items", () => {

  const totalCost: number = REPEATABLESUM([], "cost")

  expect(totalCost).toBeNaN()
})

test("returns the sum of a specific numeric field when some of the items have no value", () => {
  const repeatableField: any[] = [
    {
      id: "1",
      // tslint:disable-next-line:object-literal-sort-keys
      form_values: {
        1338: 1,
      },
    },
    {
      id: "2",
      // tslint:disable-next-line:object-literal-sort-keys
      form_values: {
      },
    },
    {
      id: "3",
      // tslint:disable-next-line:object-literal-sort-keys
      form_values: {
        1338: 4,
      },
    },
    {
      id: "4",
      // tslint:disable-next-line:object-literal-sort-keys
      form_values: {
        1338: "",
      },
    },
  ]

  const totalCost: number = REPEATABLESUM(repeatableField, "cost")

  expect(totalCost).toBe(5)
})

test("returns no value if the data name of the field does not exist", () => {

  const totalCost: number = REPEATABLESUM(repeatableValue, "does_not_exist")

  expect(totalCost).toBeNaN()
})
