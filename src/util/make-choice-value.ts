import EXISTS from "../functions/EXISTS"
import { ChoiceFieldValue } from "../types/values"

export default function makeChoiceValue(choices: string[], others: string[]): ChoiceFieldValue {
  choices = EXISTS(choices) ? choices : []
  others = EXISTS(others) ? others : []
  return { choice_values: choices, other_values: others }
}
