import TYPEOF from "../TYPEOF"

test("returns the type of a variable", () => {
  expect(TYPEOF(null)).toEqual("null")
  expect(TYPEOF(undefined)).toEqual("undefined")
  expect(TYPEOF("test")).toEqual("string")
  expect(TYPEOF(1)).toEqual("number")
  expect(TYPEOF(NaN)).toEqual("nan")
  expect(TYPEOF(new Date())).toEqual("date")
  expect(TYPEOF(() => { return })).toEqual("function")
  expect(TYPEOF(true)).toEqual("boolean")
  expect(TYPEOF(/test/)).toEqual("regexp")
  expect(TYPEOF({})).toEqual("object")
  expect(TYPEOF([])).toEqual("array")
  // @ts-ignore Need to trigger default case
  expect(TYPEOF(Symbol("foo"))).toEqual("unknown")
})
