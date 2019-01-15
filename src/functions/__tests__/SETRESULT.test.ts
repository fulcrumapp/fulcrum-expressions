import SETRESULT from "../SETRESULT"
import { prepareRuntime } from "../../test/helpers";

test("returns result off of runtime", () => {
  prepareRuntime()
  SETRESULT("testing... testing...")
  expect($$runtime.result).toEqual("testing... testing...")
})