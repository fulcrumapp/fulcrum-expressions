import EXISTS from "../functions/EXISTS"

export default function makeChoiceValue(choices: string[], others: string[]): {} {
  choices = EXISTS(choices) ? choices : []
  others = EXISTS(others) ? others : []
  return { choice_values: choices, other_values: others }
}
