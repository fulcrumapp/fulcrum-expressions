import { AddressField } from "../../types/fields"
import { AddressFieldValue } from "../../types/values"
import FORMATADDRESS from "../FORMATADDRESS"

test("formats an address", () => {
  const address: AddressFieldValue = {
    sub_thoroughfare: "360",
    thoroughfare: "Central Avenue",
    // tslint:disable-next-line:object-literal-sort-keys
    suite: "200",
    locality: "St. Petersburg",
    sub_admin_area: "Pinellas",
    admin_area: "FL",
    postal_code: "33701",
    country: "US",
  }

  expect(FORMATADDRESS(address)).toEqual("360 Central Avenue #200\nSt. Petersburg FL 33701\nUS")
  expect(FORMATADDRESS(address, " ")).toEqual("360 Central Avenue #200 St. Petersburg FL 33701 US")
  expect(FORMATADDRESS(address, ", ", ", " )).toEqual("360, Central Avenue, #200, St. Petersburg, FL, 33701, US")
  expect(FORMATADDRESS({ locality: "St. Petersburg" })).toEqual("St. Petersburg")
  expect(FORMATADDRESS({ locality: "St. Petersburg", thoroughfare: "Central Avenue" }))
  .toEqual("Central Avenue\nSt. Petersburg")
})

test("returns undefined for invalid input", () => {
  // @ts-ignore param address must be defined
  expect(FORMATADDRESS()).toBeUndefined()
})

test("returns empty string for a non-AddressFieldValue object", () => {
  const notActuallyAnAddress: {} = {
    title: "PB&J",
    // tslint:disable-next-line:object-literal-sort-keys
    ingredients: ["bread", "peanut butter", "jelly"],
    directions: "slather two slices of bread with peanut butter and jelly, put together, and eat.",
  }

  expect(FORMATADDRESS(notActuallyAnAddress)).toEqual("")
})
