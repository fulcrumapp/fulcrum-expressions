import formatValue from "../format-value"

test("It returns null for non value objects", () => {
  expect(formatValue(undefined)).toBeNull()
  expect(formatValue(NaN)).toBeNull()
  expect(formatValue(null)).toBeNull()
  expect(formatValue(jest.fn())).toBeNull()
})

test("It properly machine formats dates", () => {
  expect(formatValue(new Date("2018/01/01"))).toEqual("2018-01-01")
})

test("an array of values are also formatted", () => {
  expect(formatValue([new Date("2018/01/01"), "a"])).toEqual("2018-01-01, a")
})

test("accepting a regexp", () => {
  expect(formatValue(/fo?o/)).toEqual("/fo?o/")
})
