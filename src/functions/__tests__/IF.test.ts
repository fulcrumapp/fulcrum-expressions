import IF from "../IF"

test("evaluates a condition", () => {
  expect(IF(1 > 0, 10, 20)).toEqual(10)
  expect(IF(1 < 0, 10, 20)).toEqual(20)
})
