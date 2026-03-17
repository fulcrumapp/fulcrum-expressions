/**
 * Returns the current form object.
 *
 * View Documentation - https://docs.fulcrumapp.com/docs/calculations-ref-form
 */

export default function FORM(): {
  id: string;
  name: string;
  description: any;
  script: string;
  field_effects: any;
  elements: Array<{
    label: string;
    type: string;
    display?: string;
    elements?: Array<{
      neutral_enabled?: boolean;
      label: string;
      type: string;
      key: string;
      visible_conditions_type?: string;
      visible_conditions_behavior: string;
      required_conditions_type?: string;
      description: any;
      default_value?: string;
      data_name: string;
      required: boolean;
      hidden: boolean;
      disabled: boolean;
      default_previous_value: boolean;
      positive?: {
        label: string;
        value: string;
      };
      negative?: {
        label: string;
        value: string;
      };
      neutral?: {
        label: string;
        value: string;
      };
      ai_prompt: any;
      visible_conditions: Array<{
        field_key: string;
        operator: string;
        value: string;
      }>;
      required_conditions: Array<{
        field_key: string;
        operator: string;
        value: string;
      }>;
      expression?: string;
      display: any;
      pattern: any;
      pattern_description: any;
      min_length: any;
      max_length: any;
      multiple?: boolean;
      allow_other?: boolean;
      choice_list_id: any;
      use_choice_list?: boolean;
      choices?: Array<{
        label: string;
        value: string;
      }>;
      elements?: Array<{
        label: string;
        type: string;
        annotations_enabled?: boolean;
        deidentification_enabled?: boolean;
        timestamp_enabled?: boolean;
        latlongstamp_enabled?: boolean;
        key: string;
        visible_conditions_type?: string;
        visible_conditions_behavior: string;
        required_conditions_type?: string;
        description: any;
        default_value?: string;
        data_name: string;
        required: boolean;
        hidden: boolean;
        disabled: boolean;
        default_previous_value: boolean;
        ai_prompt: any;
        min_length: any;
        max_length: any;
        visible_conditions: Array<{
          field_key: string;
          operator: string;
          value: string;
        }>;
        required_conditions: Array<{
          field_key: string;
          operator: string;
          value: string;
        }>;
        display: any;
        elements?: Array<{
          label: string;
          type: string;
          annotations_enabled: boolean;
          deidentification_enabled: boolean;
          timestamp_enabled: boolean;
          latlongstamp_enabled: boolean;
          key: string;
          visible_conditions_type: any;
          visible_conditions_behavior: string;
          required_conditions_type: any;
          description: any;
          default_value: any;
          data_name: string;
          required: boolean;
          hidden: boolean;
          disabled: boolean;
          default_previous_value: boolean;
          ai_prompt: any;
          min_length: any;
          max_length: any;
          visible_conditions: Array<any>;
          required_conditions: Array<any>;
        }>;
        allow_other?: boolean;
        multiple?: boolean;
        use_choice_list?: boolean;
        choices?: Array<{
          label: string;
          value: string;
        }>;
        default_url?: string;
        pattern: any;
        pattern_description: any;
        expression?: string;
        neutral_enabled?: boolean;
        positive?: {
          label: string;
          value: string;
        };
        negative?: {
          label: string;
          value: string;
        };
        neutral?: {
          label: string;
          value: string;
        };
        choice_list_id: any;
        numeric?: boolean;
        format?: string;
        min: any;
        max: any;
      }>;
      allow_multiple_records?: boolean;
      allow_creating_records?: boolean;
      allow_existing_records?: boolean;
      allow_updating_records?: boolean;
      form_id?: string;
      record_conditions?: Array<any>;
      record_conditions_type: any;
      record_defaults?: Array<any>;
      annotations_enabled?: boolean;
      deidentification_enabled?: boolean;
      timestamp_enabled?: boolean;
      latlongstamp_enabled?: boolean;
      title_field_key: any;
      geometry_types?: Array<string>;
      geometry_required?: boolean;
      title_field_keys?: Array<string>;
      record_title_key?: string;
    }>;
    key: string;
    visible_conditions_type: any;
    visible_conditions_behavior: string;
    required_conditions_type: any;
    description: any;
    default_value?: string;
    data_name: string;
    required: boolean;
    hidden: boolean;
    disabled: boolean;
    default_previous_value: boolean;
    visible_conditions: Array<any>;
    required_conditions: Array<any>;
    numeric?: boolean;
    format?: string;
    min: any;
    max: any;
    ai_prompt: any;
    min_length: any;
    max_length: any;
    pattern: any;
    pattern_description: any;
  }>;
  assignment_enabled: boolean;
  hidden_on_dashboard: boolean;
  auto_assign: boolean;
  projects_enabled: boolean;
  geometry_required: boolean;
  geometry_types: Array<string>;
  title_field_keys: Array<string>;
  report_templates: Array<any>;
  created_at: any;
  updated_at: any;
  status_field: {
    type: string;
    label: string;
    key: string;
    data_name: string;
    default_value: string;
    enabled: boolean;
    read_only: boolean;
    hidden: boolean;
    description: string;
    choices: Array<{
      label: string;
      value: string;
      color: string;
    }>;
    required: boolean;
    disabled: boolean;
    default_previous_value: boolean;
  };
} {
  return $$runtime.form;
}
