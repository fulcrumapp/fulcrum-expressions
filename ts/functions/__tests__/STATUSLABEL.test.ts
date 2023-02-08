import { prepareRuntime } from "../../test/helpers"
import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import STATUSLABEL from "../STATUSLABEL"

beforeEach(() => {
  RESETCONFIG()
  prepareRuntime()
})

test("returns the status value of a record", () => {
  $$runtime.statusesByValue = { pending: "Inspection Pending"}
  CONFIGURE({ recordStatus: "pending" })

  expect(STATUSLABEL()).toBe("Inspection Pending")
})

test("returns undefined if there is no status for the record", () => {
  expect(STATUSLABEL()).toBeUndefined()
})