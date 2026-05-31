/**
 * Runs inference using Legacy ML, Modern ML, or Modern LLM models.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/inference/
 */

export interface LegacyMLInferenceOptions {
  /**
   * The model filename. Must be a string. e.g. 'leaf-classifier.ort'
   */
  model: string;
  /**
   * The photo ID of the image to run inference on.
   * Required for Legacy ML.
   */
  photo_id: string;
  /**
   * The input dimension to resize the image to (e.g. 224, 640).
   * Required for Legacy ML.
   */
  size: number;
  /**
   * Image pixel channel format layout.
   * @default 'chw'
   */
  format?: 'chw' | 'hwc';
  /**
   * Input pixel numerical type.
   * @default 'uint8'
   */
  type?: 'float' | 'uint8';
  /**
   * Channel subtraction mean. Must be an array of exactly 3 numbers.
   */
  mean?: [number, number, number];
  /**
   * Channel division standard deviation. Must be an array of exactly 3 numbers.
   */
  std?: [number, number, number];
  /**
   * Context form ID holding the model as a reference file.
   */
  form_id?: string;
  /**
   * Context form name holding the model as a reference file.
   */
  form_name?: string;
}

export interface ModernMLInferenceOptions {
  /**
   * The model filename. e.g. 'yolov5.tflite' or 'mobile_detector.task'
   */
  model: string;
  /**
   * The photo ID of the image to run inference on.
   * Required for Vision ML.
   */
  photo_id: string;
  /**
   * Image processing parameters nested inside the config block.
   */
  config: {
    /**
     * Input dimension to resize the image to. Must be greater than 0.
     */
    size: number;
    /**
     * Channel format layout.
     * @default 'chw'
     */
    format?: 'chw' | 'hwc';
    /**
     * Data type expected by the model.
     * @default 'int8'
     */
    inputType?: 'int8' | 'float';
    /**
     * Normalization mean. Must be an array of exactly 3 numbers.
     */
    mean?: [number, number, number];
    /**
     * Normalization standard deviation. Must be an array of exactly 3 numbers.
     */
    std?: [number, number, number];
  };
  /**
   * Context form details.
   */
  form_id?: string;
  form_name?: string;
}

export interface BaseLLMConfig {
  /**
   * Temperature parameter controlling generation creativity. Must be non-negative.
   * @default 0.7
   */
  temperature?: number;
  /**
   * Top-K sampling filter. Must be a positive integer.
   * @default 40
   */
  topK?: number;
  /**
   * Top-P nucleus sampling threshold. Must be non-negative.
   * @default 0.95
   */
  topP?: number;
  /**
   * Maximum tokens to generate. Must be a positive integer.
   */
  maxTokens?: number;
  /**
   * Context window size. Must be a positive integer.
   */
  contextSize?: number;
  /**
   * Token patterns where text generation should immediately stop.
   */
  stopTokens?: string[];
}

export type LLMPromptConfig =
  | {
      /**
       * The instruction or prompt text to generate a response for.
       * Required if `systemPrompt` is omitted.
       */
      prompt: string;
      /**
       * System persona or guidance instructions for model behavior.
       * Optional if `prompt` is provided.
       */
      systemPrompt?: string;
    }
  | {
      /**
       * The instruction or prompt text to generate a response for.
       * Optional if `systemPrompt` is provided.
       */
      prompt?: string;
      /**
       * System persona or guidance instructions for model behavior.
       * Required if `prompt` is omitted.
       */
      systemPrompt: string;
    };

export type LLMInferenceConfig = BaseLLMConfig & LLMPromptConfig;

export interface ModernLLMInferenceOptions {
  /**
   * The generative text model filename. Usually ends in .gguf or .litertlm
   */
  model: string;
  /**
   * photo_id is not required for text-only LLM inference.
   */
  photo_id?: never | null;
  /**
   * Generative LLM generation parameters. Enforces that at least one of prompt or systemPrompt must be provided.
   */
  config: LLMInferenceConfig;
  /**
   * Context form details.
   */
  form_id?: string;
  form_name?: string;
}

export type InferenceOptions = 
  | LegacyMLInferenceOptions 
  | ModernMLInferenceOptions 
  | ModernLLMInferenceOptions;

export interface MLInferenceResult {
  outputs: {
    [layerName: string]: {
      value: number[];
      shape: number[];
      type?: string;
    } | any;
  };
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

export interface LLMInferenceResult {
  modelType: 'LLM';
  time: number;
  outputs: {
    text: string;
  };
}

export type InferenceResult = MLInferenceResult | LLMInferenceResult;

export default function INFERENCE(
  options: InferenceOptions,
  callback: (error: Error, result: InferenceResult) => void
): void
{}