import { prepareRuntime } from "../../test/helpers"
import CONFIRM from "../CONFIRM"
import MESSAGEBOX from "../MESSAGEBOX"

const messageBoxMock = jest.fn()

beforeEach(() => {
  prepareRuntime()
  $$runtime.$$messageBox = messageBoxMock
})

test("accepts three arguments and calls MESSAGEBOX", () => {
  const title = "Confirm"
  const message = "Are you sure you want to do that?"
  const callback = () => true
  const expectedOutput = MESSAGEBOX({ title, message, buttons: ["Cancel", "Okay"] }, callback)

  expect(CONFIRM(title, message, callback)).toEqual(expectedOutput)
})

test("accepts two arguments, message and a callback", () => {
  const message = "Are you sure you want to do that?"
  const callback = () => true
  const expectedOutput = MESSAGEBOX({ message, buttons: ["Cancel", "Okay"] }, callback)

  expect(CONFIRM(message, callback)).toEqual(expectedOutput)
})

test("throws an error if less than two arguments are passed", () => {
  const willError = () => {
    // @ts-ignore Testing for callbackless invocation
    CONFIRM("fail")
  }

  expect(willError).toThrowError("CONFIRM requires two arguments, a string message and a callback")
})
