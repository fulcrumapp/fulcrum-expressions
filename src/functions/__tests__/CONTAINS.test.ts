import CONTAINS from "../CONTAINS"

test("returns whether an array or string contains a string", () => {
    expect(CONTAINS(["1", "2", "3"], "1")).toBe(true)
    expect(CONTAINS(["1", "2", "3"], "3")).toBe(true)
    expect(CONTAINS([1, 2, 3], 3)).toBe(true)
    expect(CONTAINS("123", "1")).toBe(true)
    expect(CONTAINS("123", "3")).toBe(true)
    expect(CONTAINS("123", "123")).toBe(true)
    expect(CONTAINS("123", 1)).toBe(true)
    expect(CONTAINS([null, 1], null)).toBe(true)
    expect(CONTAINS([null, undefined], undefined)).toBe(true)
    expect(CONTAINS(["1", "2", "3"], "4")).toBe(false)
    expect(CONTAINS([null, 1], "")).toBe(false)
    expect(CONTAINS([null, 1], undefined)).toBe(false)
})

test("only accepts a non-string or non-array as a collection", () => {
  expect(CONTAINS(null, null)).toBe(false)
  expect(CONTAINS({foo: "bar", hello: "world"}, "world")).toBe(false)
})

test("fromIndex param defaults to 0 if a non-number is passed in", () => {
  expect(CONTAINS(["1", "2", "3"], "3", "beginning")).toBe(true)
})
