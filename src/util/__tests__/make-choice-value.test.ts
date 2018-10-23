import { ChoiceFieldValue } from "../../types/values"
import makeChoiceValue from "../make-choice-value"

test("returns a ChoiceFieldValue from given params", () => {
  const candyChoices: string[] = ["Mars Bar", "Snickers", "KitKat"]
  const otherChoices: string[] = ["Almond Joy"]
  const expectedValue: ChoiceFieldValue = {
    choice_values: candyChoices,
    other_values: otherChoices,
  }
  expect(makeChoiceValue(candyChoices, otherChoices)).toEqual(expectedValue)
})

test("returns an empty array if either choices or others are empty", () => {
  const emptyValues: ChoiceFieldValue = {
    choice_values: [],
    other_values: [],
  }
  expect(makeChoiceValue()).toEqual(emptyValues)
})

test("returns an empty array if either choices or other are null", () => {
  const emptyValues: ChoiceFieldValue = {
    choice_values: [],
    other_values: [],
  }
  expect(makeChoiceValue(null, null)).toEqual(emptyValues)
})
