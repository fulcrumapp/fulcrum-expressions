import RAND from "../RAND"

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

test("returns a random number between 0 and 1", () => {
  // @ts-ignore Extended expect to include toBeWithinRange matcher
  expect(RAND()).toBeWithinRange(0, 1)
})
