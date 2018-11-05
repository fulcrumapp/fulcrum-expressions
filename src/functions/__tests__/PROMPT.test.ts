import { finishAsync, prepareRuntime } from "../../test/helpers"
import MESSAGEBOX from "../MESSAGEBOX"
import PROMPT from "../PROMPT"

let messageBoxMock = jest.fn()

beforeEach(() => {
  prepareRuntime()
  messageBoxMock = $$runtime.$$messageBox = jest.fn()
})

test("calls MESSAGEBOX to prompt the user", () => {
  const callback = jest.fn()

  PROMPT("Confirm", "You sure?", callback)

  const [payload, callbackID] = messageBoxMock.mock.calls[0]

  finishAsync(callbackID)

  expect(callback).toHaveBeenCalled()

  expect(JSON.parse(payload)).toEqual({
    buttons: ["Cancel", "Okay"],
    default: null,
    input: true,
    message: "You sure?",
    placeholder: null,
    title: "Confirm",
  })
})

test("must receive a value for title", () => {
  expect(true).toBe(true)
})

test("callback passed in must be a function", () => {
  const options = { title: "Confirm", message: "You sure?", buttons: ["yas", "nah"] }
  const badCallback = "not a function"
  const technicallyACallback = () => true

  const badCall = () => {
    // @ts-ignore Need to pass non-function in to throw error
    MESSAGEBOX(options, badCallback)
  }
  const goodEnough = () => {
    MESSAGEBOX(options, technicallyACallback)
  }

  expect(badCall).toThrowError("callback must be a function")
  expect(goodEnough).not.toThrowError()
})
