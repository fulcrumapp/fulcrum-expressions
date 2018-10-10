export type FormFieldValues =
  ChoiceFieldValue
  | AddressFieldValue


export interface AddressFieldValue {
  sub_thoroughfare?: string,
  thoroughfare?: string,
  suite?: string,
  locality?: string,
  sub_admin_area?: string, 
  admin_area?: string, 
  postal_code?: string,
  country?: string
}

export interface ChoiceFieldValue {
  choice_values?: string[] | null,
  other_values?: string[] | null
}
