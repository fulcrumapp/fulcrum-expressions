interface AsyncFunctionSchema {
  [key: number]: Function
}

interface SetIntervalSchema {
  // interval values refer to the timeout id generated as it calls setTimeout repeatedly
  [key: number]: number
}

interface HostState {
  timeouts: AsyncFunctionSchema,
  intervals: SetIntervalSchema,
  nextTimeoutID: number
  nextIntervalID: number
}

let hostState: HostState

export const resetState = () => {
  hostState = {
    intervals: {},
    nextIntervalID: 0,
    nextTimeoutID: 0,
    timeouts: {},
  }
}

resetState()

export const state = () => hostState
