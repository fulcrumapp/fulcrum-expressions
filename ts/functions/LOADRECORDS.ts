/**
 * Load records into Data Events
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/loadrecords/
 */

interface LoadRecordsOptions {
  ids?: string[];
  form_id?: string;
  form_name?: string;
}

interface Record {
  id: string;
  form_id: string;
  created_at: string;
  updated_at: string;
  client_created_at: string;
  client_updated_at: string;
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  assigned_to_id: string | null;
  horizontal_accuracy: number | null;
  vertical_accuracy: number | null;
  version: number;
  status: string | null;
  project_id: string | null;
  geometry: {
    type: string;
    coordinates: number[];
  } | null;
  form_values: {
    [key: string]: any;
  };
}

interface LoadRecordsResult {
  records: Record[];
}

export default function LOADRECORDS(
  options: LoadRecordsOptions,
  callback: (error: Error, result: LoadRecordsResult) => void
): void
{}