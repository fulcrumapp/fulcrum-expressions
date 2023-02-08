import ISPORTRAIT, { MediaObject } from "../ISPORTRAIT"

test("is checks whether the media is portrait", () => {
  expect(ISPORTRAIT({width: 100, height: 200})).toEqual(true)
  expect(ISPORTRAIT({width: 200, height: 100})).toEqual(false)
})

test("it handles differences in photo and video orientations", () => {
  const photo: MediaObject = { width: 100, height: 200, orientation: 6 }
  const video: MediaObject = { width: 200, height: 100, orientation: 270}

  expect(ISPORTRAIT(photo)).toEqual(false)
  expect(ISPORTRAIT(video)).toEqual(true)
})

test("it returns undefined for if width or height attributes are missing from media param", () => {
  const noHeight: {} = { width: 100 }
  const noWidth: {} = { height: 200 }

  expect(ISPORTRAIT(noHeight)).toBeUndefined()
  expect(ISPORTRAIT(noWidth)).toBeUndefined()
  expect(ISPORTRAIT()).toBeUndefined()
})
