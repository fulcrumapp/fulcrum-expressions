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

test("options.validates must be a function", () => {
  const noop = () => { return }
  const arrayValidate: Object = { validate: ["this is not valid", "failure imminent"] }
  const testArrayValidate: Function = () => {
    MESSAGEBOX(arrayValidate, noop)
  }
  const correctValidate: Object = { validate: () => true }
  const testCorrectValidate: Function = () => {
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
