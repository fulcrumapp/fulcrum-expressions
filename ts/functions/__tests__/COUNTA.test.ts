import COUNTA from "../COUNTA"

test("returns the count of items", () => {
  expect(COUNTA([1, 2, 3])).toBe(3)
  expect(COUNTA([0])).toBe(1)
  expect(COUNTA([])).toBe(0)
  expect(COUNTA(["orange", "lemon", null, "grape"])).toBe(3)
})

test("it returns 0 for non-array inputs", () => {
  expect((COUNTA())).toBe(0)
  expect((COUNTA(null))).toBe(0)
  expect((COUNTA(undefined))).toBe(0)
  expect((COUNTA({}))).toBe(0)
})
