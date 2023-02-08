import SIN from "../SIN"

test("accepts a number value and returns the correct sine", () => {
  expect(SIN(12)).toBe(-0.5365729180004349)
  expect(SIN(90)).toBe(0.8939966636005579)
  expect(SIN(86)).toBe(-0.9234584470040598)
  expect(SIN(-15)).toBe(-0.6502878401571168)
})

test("accepts a stringed number value and returns the correct sine", () => {
  expect(SIN("12")).toBe(-0.5365729180004349)
  expect(SIN("90")).toBe(0.8939966636005579)
  expect(SIN("86")).toBe(-0.9234584470040598)
  expect(SIN("-15")).toBe(-0.6502878401571168)
})

test("returns NaN for a bad input", () => {
  expect(SIN("hi")).toBeNaN()
  // @ts-ignore Need to pass in bad input to get NaN
  expect(SIN(true)).toBeNaN()
})