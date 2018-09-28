import { prepareRuntime } from "../../test-helpers"
import ALERT from "../ALERT"

beforeEach(prepareRuntime)

test("allows the message for the single argument", () => {
  ALERT("Hello!")
  expect($$runtime.results[0]).toEqual({
    message: "Hello!",
    type: "message",
    title: null,
  })
})

test("it allows a title and a message with multiple arguments", () => {
  ALERT("Welcome", "Hello!")
  expect($$runtime.results[0]).toEqual({
    type: "message",
    message: "Hello!",
    title: "Welcome",
  })
})

test("it attempts to stringify values", () => {
  ALERT("Welcome", 5)
  expect($$runtime.results[0]).toEqual({
    type: "message",
    message: "5",
    title: "Welcome",
  })
})
