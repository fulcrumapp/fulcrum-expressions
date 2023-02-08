import { prepareRuntime } from "../../test/helpers"
import CURRENTLOCATION from "../CURRENTLOCATION"

beforeEach(prepareRuntime)

test("returns the current location from runtime if it exists", () => {
  // @ts-ignore Have to manually add currentLocation to make test work
  $$runtime.currentLocation = "Pheonix, AZ"
  expect(CURRENTLOCATION()).toEqual("Pheonix, AZ")
})

test("returns null if current location is not available", () => {
  expect(CURRENTLOCATION()).toBeNull()
})
