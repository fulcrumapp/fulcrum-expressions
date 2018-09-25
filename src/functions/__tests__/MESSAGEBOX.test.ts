import MESSAGEBOX, { MessageBoxPayload } from "../MESSAGEBOX"

test("it must receive an options hash", () => {
  // @ts-ignore Need to check an error is thrown
  expect(MESSAGEBOX).toThrow("options must be provided")
})

test("options.buttons must be an array", () => {
  const noop = () => { return }

  const hashButtons: Object = { buttons: {yes: "yep", no: "nope"} }
  const testHashButtons: Function = () => {
    MESSAGEBOX(hashButtons, noop)
  }

  const stringButton: Object = { buttons: "Yasssss"}
  const testStringButton: Function = () => {
    MESSAGEBOX(stringButton, noop)
  }

  const correctButton: Object = { buttons: ["yeppers", "nah"] }
  const testCorrectButton: Function = () => {
    MESSAGEBOX(correctButton, noop)
  }

  expect(testHashButtons).toThrow("options.buttons must be an array")
  expect(testStringButton).toThrow("options.buttons must be an array")
  expect(testCorrectButton).not.toThrow()
})
