import { GUID } from "./primitives"

export type FormFieldTypes =
  "TextField"
  | "YesNoField"
  | "Label"
  | "Section"
  | "ChoiceField"
  | "ClassificationField"
  | "PhotoField"
  | "VideoField"
  | "AudioField"
  | "BarcodeField"
  | "DateTimeField"
  | "TimeField"
  | "Section"
  | "Repeatable"
  | "AddressField"
  | "SignatureField"
  | "HyperlinkField"
  | "CalculatedField"
  | "RecordLinkField"

export type FormFields =
  FormTextField
  | DateTimeField
  | DateTimeField
  | TimeField
  | YesNoField
  | ChoiceField
  | ClassificationField
  | PhotoField
  | VideoField
  | AudioField
  | Section
  | AddressField
  | SignatureField
  | HyperlinkField
  | CalculatedField
  | RecordLinkField
  | RepeatableField

export interface FormField {
  type: FormFieldTypes
  /** The id for the field. Must be unique to the form and lowercase. The Fulcrum app builder uses
   * system generated 4 character codes. */
  key: string
  /** The field label, visible to mobile and web users. */
  label: string
  /** Can be set manually or auto generated using the label of the element. This field will be
   * the column name on all exported files. It is recommended to use something that works easily
   * with Esri Shapefiles that have a 10 character maximum column heading limitation. */
  data_name: string
  /** Is this field required? */
  required: boolean
  /** Is this field read only? */
  disabled: boolean
  /** Is this field visible on mobile? */
  hidden: boolean
  /** The attribute to use as default value. */
  default_value: string
  /** Helper text for the user. */
  description?: string
  /** Match all or any of the conditions to display this field. */
  visible_conditions_type?: FormFieldConditions
  /** Array of objects containing visibility conditions */
  visible_conditions?: FormFieldCondition[]
  /**	Match all or any of the conditions to make this field required */
  required_conditions_type?: FormFieldConditions
  /** Array of objects containing requirement conditions */
  required_conditions?: FormFieldCondition[]
  /** Parent element of this field if it is in a section or repeatable */
  parent?: FormField,
}

interface FormFieldDefaultPreviousValue {
  /** Whether to automaticyepally set the previously used value. */
  default_previous_value?: boolean
}

interface StatusField {
  type: "StatusField"
  /** The id for the field. Must be unique to the form and lowercase. The Fulcrum app builder uses
   * system generated 4 character codes. */
  key: string
  /** The field label, visible to mobile and web users. */
  label: string
  /** Can be set manually or auto generated using the label of the element. The status field will be
   * the column name on all exported files. It is recommended to use something that works easily
   * with Esri Shapefiles that have a 10 character maximum column heading limitation. */
  data_name: string
  /** Is the status field required? */
  required: boolean
  /** Is the status field read only? */
  enabled: boolean
  /** Is the status field visible on mobile? */
  hidden: boolean
  /** The attribute to use as default value. */
  default_value: string
  /** Whether the status can be modified by the user */
  read_only: boolean
  /** Helper text for the user. */
  description?: string
  /** List of choices for the status field */
  choices: StatusChoiceOption[]
  /** Whether to automatically set the previously used value. */
  default_previous_value?: boolean
}

interface StatusChoiceOption {
  /** What’s shown to the user in the web and mobile apps when they select a status for records in this app. */
  label: string
  /** What’s stored in the record. */
  value: string
  /** The hexadecimal value for the color used for the status and the marker color on the map. */
  color: string
}

type FormFieldConditions = "all" | "any"

interface FormFieldCondition {
  /** The key of the record link field to match */
  field_key: string
  /** Condition operator */
  operator: ConditionOperator,
  /** The value to match against key field. (empty string for `is_empty` and `is_not_empty`) */
  value: string
}


interface FormTextField extends FormField, FormFieldDefaultPreviousValue {
  type: "TextField",
  /** Is it a numeric field? */
  numeric?: boolean
  /** If it a numeric field, what is the format? */
  format?: "decimal" | "integer"
  /** Custom validation pattern using a regular expression (regex) pattern. */
  pattern?: string
  /** Description to show user on validation error. */
  pattern_description?: string
  /** Minimum length of text string (when numeric=false). */
  min_length?: number
  /** Maximum length of text string (when numeric=false). */
  max_length?: number
  /** Minimum number (when numeric=true). */
  min?: number
  /** Maximum number (when numeric=true). */
  max?: number
}

interface DateTimeField extends FormField, FormFieldDefaultPreviousValue {
  type: "DateTimeField"
}

interface TimeField extends FormField, FormFieldDefaultPreviousValue {
  type: "TimeField"
}

interface ChoiceOption {
  label: string
  value: string
}

interface YesNoField extends FormField, FormFieldDefaultPreviousValue {
  type: "YesNoField"
  /** Enable N/A choice? */
  neutral_enabled: boolean
  /**
   * Label/Value for neutral choice
   * @default {"label": "N/A", "value": "n/a"}
   */
  neutral?: ChoiceOption
  /**
   * Label/Value for positive choice
   * @default {"label": "Yes", "value": "yes"}
   */
  positive: ChoiceOption
  /**
   * Label/Value for negative choice
   * @default {"label": "No", "value": "no"}
   */
  negative: ChoiceOption
}

interface ChoiceField extends FormField, FormFieldDefaultPreviousValue {
  type: "ChoiceField"
  choices: ChoiceOption[]
  /** Multiple choice field? */
  multiple?: boolean
  /** Allow other values? */
  alow_other?: boolean
}

interface ClassificationField extends FormField, FormFieldDefaultPreviousValue {
  type: "ClassificationField"
  /** The id of the classification set to reference. */
  classification_set_id: GUID
}

interface PhotoField extends FormField {
  type: "PhotoField"
  /** Minimum number of photos. */
  min_length?: number
  /** Maximum number of photos. */
  max_length?: number
}

interface VideoField extends FormField {
  type: "VideoField"
  /** GPS track enabled? */
  track_enabled?: boolean
  /** Audio enabled? */
  audio_enabled?: boolean
  /** Minimum number of videos */
  min_length?: number
  /** Maximum number of videos. */
  max_length?: number
}

interface AudioField extends FormField {
  type: "AudioField"
  /** GPS track enabled? */
  track_enabled?: boolean
  /** Minimum number of audio recordings */
  min_length?: number
  /** Maximum number of audio recordings. */
  max_length?: number
}

interface Section extends FormField {
  type: "Section"
  /** Display type for the section */
  display: "inline" | "drilldown"
  /** FormField's nested inside of this section */
  elements: FormFields[]
}

interface AddressField extends FormField {
  type: "AddressField"
  /** Automatically reverse geocode to determine address? */
  auto_populate?: boolean
}

interface SignatureField extends FormField {
  type: "SignatureField"
  /** The text that appears below the signature line. */
  agreement_text?: string
}

interface HyperlinkField extends FormField {
  type: "HyperlinkField"
  /** Optional default URL. */
  default_url?: string
}

interface CalculatedFieldCurrencyDisplay {
  style: "currency"
  currency: string
}

interface CalculatedField extends FormField, FormFieldDefaultPreviousValue {
  type: "CalculatedField"
  /** Calculation display object. If the style is "currnecy" then a local currecy is required. */
  display: { style: "text" | "number" | "date" } | { style: "currency", currency: string }
}

type ConditionOperator = "equal_to" | "not_equal_to" | "is_empty" | "is_not_empty"

interface RecordLinkDefaultProperty {
  /** The key of the source field. */
  source_field_key: string
  /** The key of the destination field. */
  destination_field_key: string
}

interface RecordLinkField extends FormField, FormFieldDefaultPreviousValue {
  type: "RecordLinkField"
  /** Whether to allow the user to select existing records from the app linked in the record link field. */
  allow_existing_records: boolean
  /** Whether to allow the user to create new records in the app that is linked to the record link field. */
  allow_creating_records: boolean
  /** Whether to allow the user to update data in existing records in the app linked to the record link field. */
  allow_updating_records: boolean
  /** Whether to allow the user to select multiple records to link from the app linked to the record link field. */
  allow_multiple_records: boolean
  /** Match all or any of the conditions to filter linked records. */
  record_conditions_type: FormFieldConditions
  /** Array of objects containing conditions to filter linked records */
  record_conditions: FormFieldCondition[]
  /** Array of objects containing conditions to filter linked records */
  record_defaults: RecordLinkDefaultProperty[]
}

interface RepeatableField extends FormField {
  type: "Repeatable"
}
