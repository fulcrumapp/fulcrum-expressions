export type FormFieldValues =
  ChoiceFieldValue
  | AddressFieldValue


export interface AddressFieldValue {
  sub_thoroughfare?: string|null,
  thoroughfare?: string|null,
  suite?: string|null,
  locality?: string|null,
  sub_admin_area?: string|null, 
  admin_area?: string|null, 
  postal_code?: string|null,
  country?: string|null
}

export interface ChoiceFieldValue {
  choice_values?: string[] | null,
  other_values?: string[] | null
}
