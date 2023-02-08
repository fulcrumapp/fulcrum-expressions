import ISLANDSCAPE from "../ISLANDSCAPE"
import { MediaObject } from "../ISPORTRAIT"

test("is checks whether the media is portrait", () => {
  expect(ISLANDSCAPE({width: 100, height: 200})).toEqual(false)
  expect(ISLANDSCAPE({width: 200, height: 100})).toEqual(true)
})

test("it handles differences in photo and video orientations", () => {
  const photo: MediaObject = { width: 100, height: 200, orientation: 6 }
  const video: MediaObject = { width: 200, height: 100, orientation: 270}

  expect(ISLANDSCAPE(photo)).toEqual(true)
  expect(ISLANDSCAPE(video)).toEqual(false)
})

test("it returns undefined for if width or height attributes are missing from media param", () => {
  const noHeight: {} = { width: 100 }
  const noWidth: {} = { height: 200 }

  expect(ISLANDSCAPE(noHeight)).toBeUndefined()
  expect(ISLANDSCAPE(noWidth)).toBeUndefined()
  expect(ISLANDSCAPE()).toBeUndefined()
})
