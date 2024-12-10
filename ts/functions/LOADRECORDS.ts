/**
 * Load records into Data Events
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/loadrecords/
 */

import { GeoJSONGeometry } from "../types/geometry";

interface LoadRecordsOptions {
  /**
   * The record IDs to load
   */
  ids?: string[];
  /**
   * The form ID that contains the records. If no form_id or form_name is passed, the current form_id is used.
   */
  form_id?: string;
  /**
   * The form name that contains the records. If no form_id or form_name is passed, the current form_id is used.
   */
  form_name?: string;
  /**
   * The maximum number of records to return.
   */
  limit?: number;
  /**
   * The sort order.
   */
  sort?: {
    data_names: string[];
    direction: 'asc' | 'desc';
  };
  /**
   * The where clauses to filter the records. These should be in the form "data_name = 'value'".
   */
  where_clauses?: string[];
}

interface RecordAttributes {
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
  geometry: GeoJSONGeometry | null;
  form_values: {
    [key: string]: any;
  };
}

interface LoadRecordsResult {
  records: RecordAttributes[];
}

export default function LOADRECORDS(
  options: LoadRecordsOptions,
  callback: (error: Error, result: LoadRecordsResult) => void
): void
{}