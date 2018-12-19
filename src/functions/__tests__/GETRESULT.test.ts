import GETRESULT from "../GETRESULT"
import Runtime from "../../runtime";

test("returns result off of runtime", () => {
  const runtime = new Runtime
  expect(GETRESULT()).toBeNull()
  runtime.result = "test"
  expect(GETRESULT()).toEqual("test")
})
