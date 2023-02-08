import CODE from "../CODE"

test("it returns numeric code for the first characters in a string", () => {
  expect(CODE("test")).toEqual(116)
  expect(CODE("t")).toEqual(116)
  expect(CODE("1")).toEqual(49)
  expect(CODE(1)).toEqual(49)
  expect(CODE(1.7)).toEqual(49)
  expect(CODE(NaN)).toEqual(78)
})

test("it returns NaN if an invalid input is passed", () => {
  expect(CODE("")).toEqual(NaN)
  expect(CODE({})).toEqual(NaN)
  expect(CODE()).toEqual(NaN)
  expect(CODE(null)).toEqual(NaN)
  expect(CODE(undefined)).toEqual(NaN)
  expect(CODE(["h"])).toEqual(NaN)
  expect(CODE(new Date())).toEqual(NaN)
})
