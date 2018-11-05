import RANDBETWEEN from "../RANDBETWEEN"

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass: boolean = received >= floor && received <= ceiling
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      }
    }
  },
})

test("returns a random integer between low and high", () => {
  // @ts-ignore Extended expect to include toBeWithinRange matcher
  expect(RANDBETWEEN(5, 10)).toBeWithinRange(4, 11)
  // @ts-ignore Extended expect to include toBeWithinRange matcher
  expect(RANDBETWEEN("5", "10")).toBeWithinRange(4, 11)
})

test("returns NaN for invalid input", () => {
  expect(RANDBETWEEN(NaN, 6)).toBeNaN()
  expect(RANDBETWEEN(null)).toBeNaN()
  expect(RANDBETWEEN(undefined)).toBeNaN()
  expect(RANDBETWEEN(true)).toBeNaN()
  expect(RANDBETWEEN([])).toBeNaN()
  expect(RANDBETWEEN({})).toBeNaN()
  expect(RANDBETWEEN(new Date())).toBeNaN()
})
