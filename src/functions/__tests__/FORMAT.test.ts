import FORMAT from "../FORMAT"

test("it generates a string from a template", () => {
  expect(FORMAT("%s/%s/%s", 1, 2, 3)).toEqual("1/2/3")
})
