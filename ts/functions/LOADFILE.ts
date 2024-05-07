/**
 * Load a reference file into Data Events
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/loadfile/
 */

interface LoadFileOptions {
  name?: string;
  id?: string;
  form_id?: string;
  form_name?: string;
}

export default function LOADFILE(
  options: LoadFileOptions,
  callback: (error: Error, result: any) => void
): void
{}