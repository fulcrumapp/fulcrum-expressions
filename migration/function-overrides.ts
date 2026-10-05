export type ExpressionFunction = (...args: never[]) => unknown

export const functionOverrides: Readonly<Record<string, ExpressionFunction>> =
  Object.freeze({})
