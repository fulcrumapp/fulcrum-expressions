import calculationResult from "../calculation-result"

test("it does not generate an error if there is one", () => {
  const result = calculationResult("test", [], "", null, false)
  expect(result.error).toBeNull()
})

test("it generates a specific error per type", () => {
  const result = (value: any) => calculationResult("test", value, "", null, true).error

  expect(result([])).toEqual("[Array]")
  expect(result(undefined)).toEqual("[Undefined]")
  expect(result(NaN)).toEqual("[Not a Number]")
  expect(result(jest.fn())).toEqual("[Function]")
  expect(result(new Date())).toBeNull()
  expect(result({})).toEqual("[Object]")
})
