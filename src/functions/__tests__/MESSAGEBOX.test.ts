import MESSAGEBOX from "../MESSAGEBOX"

test("it must receive an options hash", () => {
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
