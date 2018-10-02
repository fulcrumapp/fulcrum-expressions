import MAX from "../MAX"

test("returns the maximum number in a list of numbers", () => {
  expect(MAX(1, 2, 3)).toBe(3)
  expect(MAX(-1, -2, -3)).toBe(-1)
  expect(MAX(-1, [-2, 5], -3)).toBe(5)
})

test("it accepts numbers as strings", () => {
  expect(MAX("1", "2", "3")).toBe(3)
  expect(MAX("1.11", "2.22", "3.33")).toBe(3.33)
  expect(MAX(["1.11", "2.22"], "3.33")).toBe(3.33)
})

test("it return undefined for invalid input", () => {
  expect((MAX([]))).toBeUndefined()
  expect((MAX({}))).toBeUndefined()
  expect((MAX(undefined))).toBeUndefined()
  expect((MAX(null))).toBeUndefined()
  expect((MAX(new Date()))).toBeUndefined()
  expect((MAX(NaN, -2, -3))).toBeUndefined()
  expect((MAX())).toBeUndefined()
  expect((MAX(3, 4, 5, "Test"))).toBeUndefined()
})
