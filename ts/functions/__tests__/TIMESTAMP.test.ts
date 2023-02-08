import TIMESTAMP from "../TIMESTAMP"

test("returns a timestamp value", () => {
  expect(TIMESTAMP().length).toBe(19)
  expect(TIMESTAMP(new Date("December 16, 1982 03:24:00"))).toEqual("1982-12-16 03:24:00")
})
