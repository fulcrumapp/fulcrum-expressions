import NUM from "../functions/NUM"

describe("NUM", () => {
  it("converts the input to a number", () => {
    expect(NUM(1)).toBe(1)
    expect(NUM(-1)).toBe(-1)
    expect(NUM("1")).toBe(1)
    expect(NUM({})).toBeNaN()
    expect(NUM()).toBeNaN()
    expect(NUM([])).toBeNaN()
    expect(NUM("test")).toBeNaN()
  })
})