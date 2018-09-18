export type FormFieldTypes =
  "HyperlinkField"
  | "Repeatable"
  | "PhotoField"
  | "VideoField"
  | "AudioField"

export interface FormField {
  type: FormFieldTypes
}
