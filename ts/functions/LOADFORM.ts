/**
 * Load a form into Data Events
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/loadform/
 */

interface LoadFormOptions {
  ids?: string[];
  name?: string;
}

interface StatusChoice {
}

interface StatusField {
  type: 'StatusField';
  label: string;
  key: '@status';
  description: string;
  data_name: string;
  default_value: string;
  enabled: boolean;
  read_only: boolean;
  hidden: boolean;
  required: boolean;
  disabled: boolean;
  default_previous_value: boolean;
  choices: StatusChoice[];
}

type FormGeometryType = 'Point' | 'LineString' | 'Polygon';

interface FormReportTemplate {
  id: string;
  name: string;
}

interface Form {
  id: string;
  name: string;
  description: string | null;
  version: number;
  title_field_keys: string[];
  status_field: StatusField;
  status: StatusField | null;
  auto_assign: boolean;
  hidden_on_dashboard: boolean;
  geometry_types: FormGeometryType[];
  geometry_required: boolean;
  script: string | null;
  projects_enabled: boolean;
  assignment_enabled: boolean;
  attachment_ids: string[];
  report_templates: FormReportTemplate[];
  elements: any[];
}

interface LoadFormResult {
  form: Form;
}

export default function LOADFORM(
  options: LoadFormOptions,
  callback: (error: Error, result: LoadFormResult) => void
): void
{}