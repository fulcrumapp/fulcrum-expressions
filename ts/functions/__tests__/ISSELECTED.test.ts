import ISSELECTED from "../ISSELECTED"

test("returns true if a choice value is selected", () => {
  expect(ISSELECTED({choice_values: ["test"]}, "test")).toBe(true)
  expect(ISSELECTED({choice_values: ["1", "2"]}, "1")).toBe(true)
  expect(ISSELECTED({choice_values: ["1", "2"]}, ["1", "2"])).toBe(true)
  expect(ISSELECTED({choice_values: ["1", "2"]}, ["1", "2", "3"])).toBe(false)
  expect(ISSELECTED({other_values: ["test"]}, "test")).toBe(true)
  expect(ISSELECTED({other_values: []}, "test")).toBe(false)
  expect(ISSELECTED({other_values: null}, "test")).toBe(false)
  // @ts-ignore Bad typing on purpose
  expect(ISSELECTED()).toBe(false)
  // @ts-ignore Bad typing on purpose
  expect(ISSELECTED(null)).toBe(false)
  // @ts-ignore Too few params on purpose
  expect(ISSELECTED({choice_values: ["1"]})).toBe(false)
  expect(ISSELECTED({choice_values: ["1"], other_values: ["2"]}, "1")).toBe(true)
  expect(ISSELECTED({choice_values: ["1"], other_values: ["2"]}, "2")).toBe(true)
})
