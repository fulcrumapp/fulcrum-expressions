import formValues from "../../test/fixtures/form_values"
import repeatable from "../../test/fixtures/repeatable"
import { prepareRuntime } from "../../test/helpers"
import REPEATABLEVALUES from "../REPEATABLEVALUES"

beforeEach(() => {
  prepareRuntime()
  $$runtime.elementsByDataName = {}
  $$runtime.elementsByDataName.items = repeatable
  const cost = repeatable.elements[0]
  cost.parent = repeatable
  $$runtime.elementsByDataName.cost = cost

  const choiceValue = repeatable.elements[1]
  choiceValue.parent = repeatable
  $$runtime.elementsByDataName.choice_value = choiceValue

  const childItems = repeatable.elements[2]
  childItems.parent = repeatable
  $$runtime.elementsByDataName.child_items = childItems

  const childItemCost = childItems.elements[0]
  childItemCost.parent = childItems
  $$runtime.elementsByDataName.child_item_cost = childItemCost
})

const repeatableValue = formValues.form_values["1337"]

test("returns a specific field out of a collection of repeatable items", () => {
  const costs = REPEATABLEVALUES(repeatableValue, "cost")

  expect(costs).toEqual([1, 2, 3])
})

test("returns granchild data out of repeatables", () => {
  const childItems = REPEATABLEVALUES(repeatableValue, "child_items")
  const childItemsCost = childItems.map((item) => {
    return REPEATABLEVALUES(item, "child_item_cost")
  })

  expect(childItemsCost).toEqual([ [ 4, 5 ], [ 10 ], null ])

  const childItemsAll = REPEATABLEVALUES(repeatableValue, ["child_items", "child_item_cost"])

  expect(childItemsAll).toEqual([ 4, 5, 10, null ])
})

test("returns a specific field out of a blank collection of repeatable items", () => {
  const costs = REPEATABLEVALUES([], "cost")

  expect(costs).toEqual([])
})

test("returns no value if the data name of the field does not exist", () => {
  const costs = REPEATABLEVALUES(repeatableValue, "does_not_exist")

  expect(costs).toBeUndefined()
})
