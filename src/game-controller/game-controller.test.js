import GameController from "./game-controller";

const controller = GameController();

test("Should return a message for successful ship placement", () => {
  expect(controller.placeShips("carrier", [0, 0])).toBe(
    "Ship placed successfully",
  );

  expect(controller.placeShips("patrolBoat", [9, 0])).toBe(
    "Ship placed successfully",
  );
});

test("Should update shipPlacement object with property ship type and value ship coordinates", () => {
  controller.placeShips("carrier", [0, 0]);
  controller.placeShips("patrolBoat", [9, 0]);

  expect(controller.getShipPlacements()).toEqual({
    carrier: {
      coordinates: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ],
      cellsTaken: [1, 2, 3, 4, 5],
    },
    patrolBoat: {
      coordinates: [
        [9, 0],
        [9, 1],
      ],
      cellsTaken: [91, 92],
    },
  });
});

test("Should not place ships from outside of the game board. if so return a message indicating that", () => {
  expect(controller.placeShips("battleship", [0, 9])).toBe(
    "Cannot place ship outside of game board",
  );
  expect(controller.placeShips("destroyer", [-1, 4])).toBe(
    "Cannot place ship outside of game board",
  );
  expect(controller.placeShips("submarine", [2, 10])).toBe(
    "Cannot place ship outside of game board",
  );
});

test("Should not update shipsPlacement object if ship is outside of game board", () => {
  controller.placeShips("battleship", [0, 9]);
  controller.placeShips("destroyer", [-1, 4]);
  controller.placeShips("submarine", [2, 10]);

  expect(
    Object.hasOwn(controller.getShipPlacements(), "battleship"),
  ).toBeFalsy();

  expect(
    Object.hasOwn(controller.getShipPlacements(), "destroyer"),
  ).toBeFalsy();

  expect(
    Object.hasOwn(controller.getShipPlacements(), "submarine"),
  ).toBeFalsy();
});

test("Should not place ships on already acquired space. if so return a message indicating that", () => {
  expect(controller.placeShips("destroyer", [0, 1])).toBe(
    "Cannot place ship space already acquired",
  );

  expect(controller.placeShips("submarine", [9, 1])).toBe(
    "Cannot place ship space already acquired",
  );
});

test("Should not update shipsPlacement object if space already acquired", () => {
  controller.placeShips("destroyer", [0, 1]);
  controller.placeShips("submarine", [9, 1]);

  expect(
    Object.hasOwn(controller.getShipPlacements(), "destroyer"),
  ).toBeFalsy();

  expect(
    Object.hasOwn(controller.getShipPlacements(), "submarine"),
  ).toBeFalsy();
});

test("if received attack is missed update missed attacks object", () => {
  controller.receiveAttack([2, 0]);

  expect(controller.getMissedAttacks().values()).toContainEqual([2, 0]);
});

test("if received attack is hit update hit attacks object", () => {
  controller.receiveAttack([0, 1]);

  expect(controller.getHitAttacks().values()).toContainEqual([0, 1]);
});

test("if received attack is hit update ship hit count", () => {
  const ship = controller.checkShipAttacked([0, 1]);
  const previousShipCount = controller.ships[ship].getShipHitCount();

  controller.receiveAttack([0, 1]);
  const currentShipCount = controller.ships[ship].getShipHitCount();

  expect(previousShipCount).toBe(currentShipCount - 1);
});

test("Report whether or not all of their ships have been sunk.", () => {
  const isAllShipsSunk = controller.checkAllShipsSunk();

  if (isAllShipsSunk) {
    expect(isAllShipsSunk).toBe(true);
  } else {
    expect(isAllShipsSunk).toBe(false);
  }
});
