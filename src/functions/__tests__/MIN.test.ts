import MIN from "../MIN"

test("returns the minimum number in a list of numbers", () => {
  expect(MIN(1, 2, 3)).toBe(1)
  expect(MIN(-1, -2, -3)).toBe(-3)
  expect(MIN(-1, [-2, 5], -3)).toBe(-3)
})

test("it accepts numbers as strings", () => {
  expect(MIN("1", "2", "3")).toBe(1)
  expect(MIN("1.11", "2.22", "3.33")).toBe(1.11)
  expect(MIN(["1.11", "2.22"], "3.33")).toBe(1.11)
})

test("it return undefined for invalid input", () => {
  expect((MIN([]))).toBeUndefined()
  expect((MIN({}))).toBeUndefined()
  expect((MIN(undefined))).toBeUndefined()
  expect((MIN(null))).toBeUndefined()
  expect((MIN(new Date()))).toBeUndefined()
  expect((MIN(NaN, -2, -3))).toBeUndefined()
  expect((MIN())).toBeUndefined()
  expect((MIN(3, 4, 5, "Test"))).toBeUndefined()
})
