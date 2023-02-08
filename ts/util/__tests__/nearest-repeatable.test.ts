import repeatable from "../../test/fixtures/repeatable"
import nearestRepeatable from "../nearest-repeatable"

const repeatableSansElements =  {
  data_name: "items",
  default_value: "",
  description: "",
  disabled: false,
  geometry_required: false,
  geometry_types: ["Point"],
  hidden: false,
  key: "1337",
  label: "Items",
  max_length: null,
  min_length: null,
  required: false,
  title_field_key: null,
  title_field_keys: ["1ce4"],
  type: "Repeatable",
}
const costField = repeatable.elements[0]
const choiceField = repeatable.elements[1]
const childItems = repeatable.elements[2]
// @ts-ignore parent key exists in type FormField
costField.parent = repeatableSansElements
// @ts-ignore parent key exists in type FormField
childItems.parent = repeatableSansElements
// @ts-ignore elements key on childItems is not undefined
const grandchildCost = childItems.elements[0]
// @ts-ignore parent key exists in type FormField
grandchildCost.parent = childItems
const greatGrandChild = {
  data_name: "great_grand_child",
  default_value: null,
  description: "",
  disabled: false,
  hidden: false,
  key: "45ki",
  label: "Great Grand Child",
  required: false,
  type: "PhotoField",
  parent: grandchildCost,
}


test("returns the nearest repeatable", () => {
  expect(nearestRepeatable(costField)).toEqual(repeatableSansElements)
  expect(nearestRepeatable(grandchildCost)).toEqual(childItems)
  expect(nearestRepeatable(greatGrandChild)).toEqual(childItems)
})

test("returns null if the element does not have a parent repeatable", () => {
  expect(nearestRepeatable(choiceField)).toBeNull()
  expect(nearestRepeatable(null)).toBeNull()
  expect(nearestRepeatable()).toBeNull()
})
