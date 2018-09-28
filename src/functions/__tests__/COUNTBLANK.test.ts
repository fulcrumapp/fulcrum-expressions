import COUNTBLANK from "../COUNTBLANK"

test("it returns a count of blank items", () => {
  expect(COUNTBLANK([1, 2, 3])).toBe(0)
  expect(COUNTBLANK([1, 2, ""])).toBe(1)
  expect(COUNTBLANK([1, 2, "", undefined])).toBe(2)
  expect(COUNTBLANK([])).toBe(0)
  expect(COUNTBLANK({})).toBe(0)
  expect(COUNTBLANK([undefined])).toBe(1)
  expect(COUNTBLANK(null)).toBe(1)
  expect(COUNTBLANK(0)).toBe(0)
  expect(COUNTBLANK()).toBe(0)
  expect(COUNTBLANK(1, 3, null)).toBe(1)
})
