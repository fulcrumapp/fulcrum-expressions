import { isNull, isUndefined } from "lodash"
import { ChoiceFieldValue } from "../types/values"

/**
 * Creates a ChoiceFieldValue from given params
 * @param choices optional; array of strings
 * @param other optional; array of strings
 * @returns ChoiceFieldValue: { choice_values: [ ... ], other_values: [ ... ] }
 */

export default function makeChoiceValue(choices?: string[]|null, others?: string[]|null): ChoiceFieldValue {
  choices = (!isNull(choices) && !isUndefined(choices)) ? choices : []
  others = (!isNull(others) && !isUndefined(others)) ? others : []
  return { choice_values: choices, other_values: others }
}
