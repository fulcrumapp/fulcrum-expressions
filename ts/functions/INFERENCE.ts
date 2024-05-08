/**
 * Runs inference on a photo using an ONNX runtime model.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/inference/
 */

interface InferenceOptions {
  /**
   * The photo ID to run inference on
   */
  photo_id: string;
  /**
   * The form ID that contains the .ort model Reference File
   */
  form_id?: string;
  /**
   * The form name that contains the .ort model Reference File
   */
  form_name?: string;
  /**
   * The model file name to use for inference. e.g. "model.ort"
   */
  model: string;
  /**
   * The size of the image to resize to before running inference
   */
  size: number;
  /**
   * The model input image format, either "chw" (Channel-Width-Height) or "hwc" (Height-Width-Channel).
   */
  format: 'chw' | 'hwc';
  /**
   * The model input image data type, either "float" or "uint8".
   */
  type: 'float' | 'uint8';
  /**
   * The model input image mean
   */
  mean?: [number, number, number],
  /**
   * The model input image standard deviation
   */
  std?: [number, number, number],
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