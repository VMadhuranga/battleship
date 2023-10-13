import Computer from "./computer";

const computer = Computer();
computer.placeShipsRandomly();
const shipPlacement = computer.controller.getShipPlacements();

test("Computer should place ship randomly", () => {
  expect(shipPlacement).toHaveProperty("carrier");
  expect(shipPlacement).toHaveProperty("battleship");
  expect(shipPlacement).toHaveProperty("destroyer");
  expect(shipPlacement).toHaveProperty("patrolBoat");
  expect(shipPlacement).toHaveProperty("submarine");
});

test("Computer's shipPlacement object length should 5", () => {
  expect(Object.keys(shipPlacement).length).toBe(5);
});
