import FALSE from "../ts/functions/FALSE"
import PI from "../ts/functions/PI"
import TRUE from "../ts/functions/TRUE"

// Storage only: never[] accepts implementations with concrete parameter types
// under strict function variance; callers need each function's own signature.
export type ExpressionFunction = (...args: never[]) => unknown

export const functionOverrides: Readonly<Record<string, ExpressionFunction>> =
  Object.freeze({
    FALSE,
    PI,
    TRUE,
  })
