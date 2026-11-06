/**
 * Runs a headless FLOW() data event.
 *
 * A `js` function node accepts `input.run` as a callback. The engine sends
 * that callback's source as `input.expression` and never sends `input.run`.
 * Delivering the run outcome to the form is not part of this contract.
 */

export interface FlowJsRunArgs {
  form: Record<string, unknown>;
  state: Record<string, unknown>;
  tools: Record<string, (args: Record<string, unknown>) => Promise<unknown>>;
}

export type FlowJsResult = Record<string, unknown>;

export type FlowJsCallback = (
  args: FlowJsRunArgs
) => FlowJsResult | Promise<FlowJsResult>;

/**
 * Exactly one of `run` or `expression`. Null counts as absent, matching the runtime.
 * The engine sends `run` as `expression`.
 */
export type FlowJsInput =
  | {
      /**
       * Authoring callback. Converted with `toString()` before the payload is sent.
       */
      run: FlowJsCallback;
      expression?: null;
    }
  | {
      /**
       * Wire form of a `js` node. A string of 1 to 4096 characters.
       */
      expression: string;
      run?: null;
    };

export interface FlowOutputDeclaration {
  [key: string]: 'string' | 'number' | 'boolean';
}

export interface FlowRetry {
  max_attempts: number;
  on?: Array<'tool_error' | 'timeout'>;
}

export interface FlowDecisionWhen {
  ref: string;
  op: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'exists' | 'not_exists';
  value?: unknown;
}

interface FlowNodeLimits {
  timeout_seconds?: number;
  max_calls?: number;
  on_error?: string;
  next?: string;
}

export interface FlowAgenticNode extends FlowNodeLimits {
  id: string;
  kind: 'agentic';
  instruction: string;
  interactive?: boolean;
  model?: string;
  output?: FlowOutputDeclaration;
}

export interface FlowJsFunctionNode extends FlowNodeLimits {
  id: string;
  kind: 'function';
  function: 'js';
  input: FlowJsInput;
  retry?: FlowRetry;
}

type FlowToolInput = Record<string, unknown> & {
  run?: never;
};

export interface FlowToolFunctionNode extends FlowNodeLimits {
  id: string;
  kind: 'function';
  function: string;
  input?: FlowToolInput;
  retry?: FlowRetry;
}

export type FlowFunctionNode = FlowJsFunctionNode | FlowToolFunctionNode;

export interface FlowDecisionNode {
  id: string;
  kind: 'decision';
  cases: Array<{ when: FlowDecisionWhen; next: string }>;
  default: string;
  max_calls?: number;
}

export type FlowNodeOptions = FlowAgenticNode | FlowFunctionNode | FlowDecisionNode;

export interface FlowOptions {
  schema_version: 1;
  flow_id?: string;
  nodes: FlowNodeOptions[];
}

type CheckedFlowNode<N> = N extends { kind: 'function'; function: 'js' }
  ? (N extends { input: FlowJsInput } ? N : never)
  : N;

/**
 * Sends a flow definition to the host. `input.run` is stringified first.
 * On an authoring failure, this throws an error whose `code` is `invalid_definition`.
 * The completion callback is not part of this contract.
 * A `js` node must set exactly one of `input.run` or `input.expression`.
 * Other function nodes must not set `run`. `expression` remains a normal tool argument.
 */
export default function FLOW<N extends FlowNodeOptions>(
  options: Omit<FlowOptions, 'nodes'> & { nodes: Array<CheckedFlowNode<N>> }
): void
{}
