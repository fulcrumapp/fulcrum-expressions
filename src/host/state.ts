interface AsyncFunctionSchema {
  [key: number]: Function
}

interface HostState {
  timeouts: AsyncFunctionSchema,
  intervals: AsyncFunctionSchema,
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
