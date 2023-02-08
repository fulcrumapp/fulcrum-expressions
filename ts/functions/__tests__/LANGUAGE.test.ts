import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import LANGUAGE from "../LANGUAGE"

beforeEach(RESETCONFIG)

test("it returns the langauge from the configuration object", () => {
  // default set to en-US
  expect(LANGUAGE()).toBe("en-US")

  CONFIGURE({ language: "zh-CN" })
  expect(LANGUAGE()).toBe("zh-CN")
})

test("it returns the default decimal separator if it is not present on configuration obejct", () => {
  CONFIGURE({ language: "zh-CN" })
  expect(LANGUAGE()).toBe("zh-CN")

  // passing in false overwrites the entire config object so the key
  // language no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(LANGUAGE()).toBe("en-US")
})
