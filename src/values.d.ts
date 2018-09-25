export type FormFieldValues =
  ChoiceFieldValue

export interface ChoiceFieldValue {
  choice_values?: string[] | null,
  other_values?: string[] | null
}
