import LPAD from "../LPAD"

test("pads a string on the left", () => {
    expect(LPAD("test", 5)).toBe(" test")
    expect(LPAD("t", 5)).toBe("    t")
    expect(LPAD("test", 10)).toBe("      test")
    expect(LPAD("1", 2, "0")).toBe("01")
    expect(LPAD("1", 4, "0")).toBe("0001")
})

test("it accepts numbered strings", () => {
  expect(LPAD("test", "6")).toBe("  test")
  expect(LPAD("test", "10", "0")).toBe("000000test")
})

test("returns undefined if no arguments are passed in", () => {
  expect(LPAD()).toBeUndefined()
})

test("returns undefined if count param is not a number", () => {
  expect(LPAD("test", "test")).toBeUndefined()
  expect(LPAD("test", true)).toBeUndefined()
})

test("padding must be a string", () => {
  expect(LPAD("1", 2, 0)).toBeUndefined()
  expect(LPAD("1", 2, true)).toBeUndefined()
})
