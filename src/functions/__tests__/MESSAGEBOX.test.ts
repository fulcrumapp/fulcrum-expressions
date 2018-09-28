import { finishAsync, prepareRuntime } from "../../test/helpers"
import MESSAGEBOX from "../MESSAGEBOX"

let messageBoxMock = jest.fn()

beforeEach(() => {
  prepareRuntime()
  messageBoxMock = $$runtime.$$messageBox = jest.fn()
})

test("it must receive an options hash", () => {
  expect(MESSAGEBOX).toThrow("options must be provided")
})

test("options.buttons must be an array", () => {
  const noop = () => { return }

  const hashButtons: Object  = { buttons: {yes: "yep", no: "nope"} }
  const testHashButtons = () => {
    MESSAGEBOX(hashButtons, noop)
  }

  const stringButton: Object = { buttons: "Yasssss"}
  const testStringButton = () => {
    MESSAGEBOX(stringButton, noop)
  }

  const correctButton = { buttons: ["yeppers", "nah"] }
  const testCorrectButton = () => {
    MESSAGEBOX(correctButton, noop)
  }

  expect(testHashButtons).toThrow("options.buttons must be an array")
  expect(testStringButton).toThrow("options.buttons must be an array")
  expect(testCorrectButton).not.toThrow()
})

test("options.validates must be a function", () => {
  const noop = () => { return }
  const arrayValidate: Object = { validate: ["this is not valid", "failure imminent"] }
  const testArrayValidate = () => {
    MESSAGEBOX(arrayValidate, noop)
  }
  const correctValidate = { validate: () => true }
  const testCorrectValidate = () => {
    MESSAGEBOX(correctValidate, noop)
  }

  expect(testArrayValidate).toThrowError("options.validate must be a function")
  expect(testCorrectValidate).not.toThrowError()
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

test("generates a valid payload and executes the callback", () => {
  const options = { title: "Confirm", message: "You sure?", buttons: ["yas", "nah"] }
  const callback = jest.fn()

  MESSAGEBOX(options, callback)

  const [payload, callbackID] = messageBoxMock.mock.calls[0]

  finishAsync(callbackID)

  expect(callback).toHaveBeenCalled()

  expect(JSON.parse(payload)).toEqual({
    buttons: ["yas", "nah"],
    default: null,
    input: null,
    message: "You sure?",
    placeholder: null,
    title: "Confirm",
  })
})
