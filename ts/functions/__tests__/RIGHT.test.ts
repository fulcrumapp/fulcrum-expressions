import RIGHT from "../RIGHT"

test("returns the right characters of a string", () => {
  expect(RIGHT("abc", 1)).toBe("c")
  expect(RIGHT("abc", 1.9)).toBe("c")
  expect(RIGHT("abc", "1")).toBe("c")
  expect(RIGHT("abc")).toBe("c")
  expect(RIGHT("abc", 2)).toBe("bc")
  expect(RIGHT("abc", 1000)).toBe("abc")
  expect(RIGHT("", 1000)).toBe("")
  expect(RIGHT(7000, 2)).toBe("00")
  expect(RIGHT(true, 4)).toBe("true")
})

test("returns undefined for invalid input", () => {
  expect((RIGHT("abc", -1))).toBeUndefined()
  expect((RIGHT("abc", "-1"))).toBeUndefined()
  expect((RIGHT({}, 4))).toBeUndefined()
  expect((RIGHT({}))).toBeUndefined()
  expect((RIGHT(undefined))).toBeUndefined()
  expect((RIGHT(null))).toBeUndefined()
  expect((RIGHT(new Date()))).toBeUndefined()
})
