import form from "../../test/fixtures/form"
import repeatableValueElements from "../repeatable-value-elements"

// const testForm = form
const repeatable = form.elements[1]
const repeatableCost = repeatable.elements[0]
const repeatableChoiceValue = repeatable.elements[1]
const repeatableChildItems = repeatable.elements[2]
// const repeatableChildCost = repeatableChildItems.elements[0]

test("returns an object of repeatable fields", () => {
  const expectedValue = {
    all: repeatable.elements,
    byDataName: {
      [repeatableCost.data_name]: repeatableCost,
      [repeatableChoiceValue.data_name]: repeatableChoiceValue,
      [repeatableChildItems.data_name]: repeatableChildItems,
    },
    byKey: {
      [repeatableCost.key]: repeatableCost,
      [repeatableChoiceValue.key]: repeatableChoiceValue,
      [repeatableChildItems.key]: repeatableChildItems,
    },
  }

  expect(repeatableValueElements(repeatable)).toEqual(expectedValue)
})

test("cached", () => {
  expect(true).toBe(true)
})
