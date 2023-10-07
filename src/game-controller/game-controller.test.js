import GameController from "./game-controller";

const controller = GameController();

test("Should update shipPlacement object with property ship type and value ship coardinates", () => {
  controller.placeShips("carrier", [0, 0]);

  expect(controller.gameBoard.getShipPlacements()).toEqual({
    carrier: {
      coardinates: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
      cellsTaken: [1, 2, 3, 4, 5],
    },
  });
});

// test("Ship coardinates length should equal to ship's length");

test("Should not update shipsPlacement object if ship is outside of game board", () => {
  controller.placeShips("battleship", [0, 9]);
  expect(
    Object.hasOwn(controller.gameBoard.getShipPlacements(), "battleship"),
  ).toBeFalsy();
});

// test("Should not place ships on top of each other");
