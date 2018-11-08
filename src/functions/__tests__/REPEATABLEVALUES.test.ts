import repeatable from "../../test/fixtures/repeatable"
import { prepareRuntime } from "../../test/helpers"
import REPEATABLEVALUES from "../REPEATABLEVALUES"

beforeEach(() => {
  prepareRuntime()
})

const repeatableField = repeatable

test("returns a specific field out of a collection of repeatable items", () => {
  const costs = REPEATABLEVALUES(repeatableField, "cost")

  expect(costs).toEqual([1, 2, 3])
})

test("returns granchild data out of repeatables", () => {
  const childItems = REPEATABLEVALUES(repeatableField, "child_items").map((item) => {
    return REPEATABLEVALUES(item, "child_item_cost")
  })

  expect(childItems).toEqual([ [ 4, 5 ], [ 10 ], null ])

  const childItemsAll = REPEATABLEVALUES(repeatableField, ["child_items", "child_item_cost"])

  expect(childItemsAll).toEqual([ 4, 5, 10, null ])
})

test("returns a specific field out of a blank collection of repeatable items", () => {
  const costs = REPEATABLEVALUES([], "cost")

  expect(costs).toEqual([])
})

test("returns no value if the data name of the field does not exist", () => {
  const costs = REPEATABLEVALUES(repeatableField, "does_not_exist")

  expect(costs).toBeUndefined()
})
