/**
 * Runs inference on an ONNX runtime model.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/inference/
 */

interface InferenceOptions {
  photo_id: string;
  form_id?: string;
  form_name?: string;
  model: string;
  size: number;
  format: 'chw' | 'hwc';
  type: 'float' | 'uint8';
  std?: [number, number, number],
  mean?: [number, number, number],
}

interface InferenceResult {
  outputs: number[];
  time: number;
  original: {
    width: number;
    height: number;
    orientation: number;
  };
  resized: {
    width: number;
    height: number;
    orientation: number;
  };
}

export default function INFERENCE(
  options: InferenceOptions,
  callback: (error: Error, result: InferenceResult) => void
): void
{}