import PLUCK from "../PLUCK"

test("plucks out items from an array of objects based on a property", () => {
  const users = [
    { name: "Daniel", password: "password" },
    { name: "Susie", password: "password123" },
    { name: "Craig", password: "test123" },
  ]

  const doggos = [
    { name: "Nikko", breed: "Pit bull terrier", age: 3 },
    { name: "Zoltan", breed: "Golden Retriever", age: 2 },
    { name: "Daisy", age: 4 },
  ]

  expect(PLUCK(users, "name")).toEqual([ "Daniel", "Susie", "Craig" ])
  expect(PLUCK(doggos, "breed")).toEqual([ "Pit bull terrier", "Golden Retriever", undefined ])
  expect(PLUCK(doggos, "age")).toEqual([ 3, 2, 4])
})
