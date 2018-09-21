export type FormFieldValues =
  ChoiceFieldValue

interface ChoiceFieldValue {
  choice_values?: string[]|null,
  other_values?: string[]|null
}