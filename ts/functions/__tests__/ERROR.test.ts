import ERROR from "../ERROR"

test("It allows users to throw custom error messages", () => {
  expect(() => {
    ERROR("This is my error")
  }).toThrow()
})
