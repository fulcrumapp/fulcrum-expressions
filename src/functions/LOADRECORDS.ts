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
   * The offset of the records to return.
   */
  offset?: number;
    /**
   * The sort order. Either a string or an array like "order: [['data_name_1', 'asc'], ['data_name_2', 'desc']]"
   */
  order?: string | string[][];
  /**
  * The where clauses to filter the records. Either a string or an object like
  * "where: {
  *   operator: 'and',
  *   predicates: [
  *    { field_name: 'data_name_1', operator: 'contains', value: 'value' }
  *    { field_name: 'data_name_2', operator: 'contains', value: 'value' }
  *    { operator: 'or',
  *      predicates: [
  *        { field_name: 'data_name_3', operator: 'contains', value: 'value' }
  *      ]
  *    }
  *  ]
  * }
  */
  where?: string | { operator: string, predicates: any[]};
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