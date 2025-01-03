/**
 * Load a reference file into Data Events
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/loadfile/
 */

interface LoadFileOptions {
  /**
   * The name of the file to load. e.g. "data.json"
   */
  name?: string;
  /**
   * The ID of the reference file
   */
  id?: string;
  /**
   * The form ID that contains the reference file. If no form_id or form_name is passed, the current form_id is used.
   */
  form_id?: string;
  /**
   * The form name that contains the reference file. If no form_id or form_name is passed, the current form_id is used.
   */
  form_name?: string;
  /**
   * The name of the global variable to initialize with the content of the loaded file.
   */
  variable?: string;
}

export default function LOADFILE(
  options: LoadFileOptions,
  callback: (error: Error, result: any) => void
): void
{}