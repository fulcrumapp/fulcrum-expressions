import STORAGE from "../STORAGE"

test("it uses localStorage if it exists", () => {
  expect(STORAGE()).toEqual(window.localStorage)
})
