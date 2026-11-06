/**
 * Runs a headless FLOW() data event.
 *
 * A `js` function node accepts `input.run` as a callback. The engine sends
 * that callback's source as `input.expression` and never sends `input.run`.
 */

export interface FlowJsRunArgs {
  form: object;
  state: object;
  tools: object;
}

export interface FlowJsInput {
  /**
   * Authoring callback. Converted with `toString()` before the payload is sent.
   * Do not set this together with `expression`.
   */
  run?: (args: FlowJsRunArgs) => object;
  /**
   * Wire form of a `js` node. A string of 1 to 4096 characters.
   * Do not set this together with `run`.
   */
  expression?: string;
}

export interface FlowNodeOptions {
  id: string;
  kind: 'agentic' | 'function' | 'decision';
  function?: string;
  input?: FlowJsInput | object;
  instruction?: string;
  next?: string;
}

export interface FlowOptions {
  schema_version: number;
  flow_id?: string;
  nodes: FlowNodeOptions[];
}

export interface FlowError extends Error {
  code: 'invalid_definition';
}

/**
 * Sends a flow definition to the host. `input.run` is stringified first.
 * On an authoring failure, this throws an error whose `code` is `invalid_definition`.
 */
export default function FLOW(
  options: FlowOptions,
  callback?: (error: Error | null, result: object | null) => void
): void
{}
