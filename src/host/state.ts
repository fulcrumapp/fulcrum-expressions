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
    timeouts: {},
    intervals: {},
    nextTimeoutID: 0,
    nextIntervalID: 0
  }
}

resetState()

export const state = () => hostState
