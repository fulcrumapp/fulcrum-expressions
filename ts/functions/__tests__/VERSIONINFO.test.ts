import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import VERSIONINFO from "../VERSIONINFO"

beforeEach(RESETCONFIG)

test("it returns the platform info from the configuration object", () => {
  expect(VERSIONINFO()).toBe("")

  CONFIGURE({
              deviceModel: "MQCK2LL/A",
              // tslint:disable-next-line:object-literal-sort-keys
              deviceManufacturer: "Apple",
              platform: "iOS",
              platformVersion: "2.0",
              application: "Chrome",
              applicationVersion: "4.2.3.5.2",
              applicationBuild: "Webkit",
               })
  expect(VERSIONINFO()).toEqual("Apple MQCK2LL/A, iOS 2.0, Chrome 4.2.3.5.2 Webkit")
})

test("it returns the default platform name if it is not present on configuration obejct", () => {
  CONFIGURE({
              deviceModel: "MQCK2LL/A",
              // tslint:disable-next-line:object-literal-sort-keys
              deviceManufacturer: "Apple",
              platform: "iOS",
              platformVersion: "2.0",
              application: "Chrome",
              applicationVersion: "4.2.3.5.2",
              applicationBuild: "Webkit",
               })
  expect(VERSIONINFO()).toEqual("Apple MQCK2LL/A, iOS 2.0, Chrome 4.2.3.5.2 Webkit")

  // passing in false overwrites the entire config object so the keys required
  // no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(VERSIONINFO()).toBe("")
})

test("accepts an optional argument as a separator", () => {
  CONFIGURE({
                deviceModel: "MQCK2LL/A",
                // tslint:disable-next-line:object-literal-sort-keys
                deviceManufacturer: "Apple",
                platform: "iOS",
                platformVersion: "2.0",
                application: "Chrome",
                applicationVersion: "4.2.3.5.2",
                applicationBuild: "Webkit",
                })
  expect(VERSIONINFO(" - ")).toEqual("Apple MQCK2LL/A - iOS 2.0 - Chrome 4.2.3.5.2 Webkit")
})
