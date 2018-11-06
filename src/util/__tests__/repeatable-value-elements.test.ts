import form from "../../test/fixtures/form"
import repeatableValueElements, { repeatableValueElementsByDataNameCache,
                                  repeatableValueElementsByKeyCache,
                                  repeatableValueElementsCache } from "../repeatable-value-elements"

const repeatable = form.elements[1]
// @ts-ignore form does not have undefined fields
const repeatableCost = repeatable.elements[0]
// @ts-ignore form does not have undefined fields
const repeatableChoiceValue = repeatable.elements[1]
// @ts-ignore form does not have undefined fields
const repeatableChildItems = repeatable.elements[2]

test("returns an object of repeatable fields and caches the fields", () => {
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
  // @ts-ignore TS doesn't recognize form.elements[1] as a repeatable field though it is type "Repeatable"
  expect(repeatableValueElements(repeatable)).toEqual(expectedValue)
  expect(repeatableValueElementsCache[repeatable.key]).toEqual(expectedValue.all)
  expect(repeatableValueElementsByKeyCache[repeatable.key]).toEqual(expectedValue.byKey)
  expect(repeatableValueElementsByDataNameCache[repeatable.key]).toEqual(expectedValue.byDataName)
})
