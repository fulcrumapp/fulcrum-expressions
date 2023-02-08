import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import DEVICEINFO from "../DEVICEINFO"

beforeEach(RESETCONFIG)

test("it returns the device info from the configuration object", () => {
  CONFIGURE({ deviceModel: "MQCK2LL/A", deviceManufacturer: "Apple" })
  expect(DEVICEINFO()).toBe("Apple, MQCK2LL/A")
})

test("it accepts an optional separator value", () => {
  CONFIGURE({ deviceModel: "MQCK2LL/A", deviceManufacturer: "Apple" })
  expect(DEVICEINFO(": ")).toBe("Apple: MQCK2LL/A")
})

test("passing a non-string separater will not break the function", () => {
  CONFIGURE({ deviceModel: "MQCK2LL/A", deviceManufacturer: "Apple" })

  expect(DEVICEINFO([])).toBe("AppleMQCK2LL/A")
  expect(DEVICEINFO(true)).toBe("AppletrueMQCK2LL/A")
  expect(DEVICEINFO(90)).toBe("Apple90MQCK2LL/A")
})

test("if device model and manufacturer are not set it returns an empty string", () => {
  expect(DEVICEINFO()).toBe("")
})
