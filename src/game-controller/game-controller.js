import ShipTypes from "../ships/ships";
import GameBoard from "../game-board/game-board";

const GameController = () => {
  const ships = ShipTypes();
  const gameBoard = GameBoard();

  const shipPlacements = {};
  const hitAttacks = new Map();
  const missedAttacks = new Map();

  const calculateShipPlacement = (shipLength, startPosition) => {
    const coordinates = [];
    const cellsTaken = [];

    for (let i = 0; i < shipLength; i++) {
      coordinates.push([startPosition[0], startPosition[1] + i]);
      cellsTaken.push(
        gameBoard.getBoardCell([startPosition[0], startPosition[1] + i]),
      );
    }

    return { coordinates, cellsTaken };
  };

  const checkIsInsideTheGameBoard = (shipLength, startPosition) =>
    startPosition[0] >= 0 &&
    startPosition[0] <= 9 &&
    startPosition[1] >= 0 &&
    startPosition[1] + (shipLength - 1) <= 9;

  const getShipPlacements = () => shipPlacements;

  const updateShipPlacements = (shipType, coordinates, cellsTaken) => {
    shipPlacements[shipType] = { coordinates, cellsTaken };
  };

  const checkAvailableShipPlacements = (cellsNeeded) =>
    !Object.keys(shipPlacements).some((key) =>
      shipPlacements[key].cellsTaken.some((taken) =>
        cellsNeeded.includes(taken),
      ),
    );

  const checkShipAttacked = (coordinates) =>
    Object.keys(shipPlacements).find((key) =>
      shipPlacements[key].cellsTaken.includes(
        gameBoard.getBoardCell(coordinates),
      ),
    );

  const getMissedAttacks = () => missedAttacks;
  const getHitAttacks = () => hitAttacks;

  const updateMissedAttacks = (coordinates) => {
    missedAttacks.set(gameBoard.getBoardCell(coordinates), coordinates);
  };

  const updateHitAttacks = (coordinates) => {
    hitAttacks.set(gameBoard.getBoardCell(coordinates), coordinates);
  };

  const placeShips = (shipType, startPosition) => {
    const shipLength = ships[shipType].getShipLength();
    const shipPlacement = calculateShipPlacement(shipLength, startPosition);
    const isInsideTheGameBoard = checkIsInsideTheGameBoard(
      shipLength,
      startPosition,
    );
    const isShipPlacementAvailable = checkAvailableShipPlacements(
      shipPlacement.cellsTaken,
    );

    if (isInsideTheGameBoard && isShipPlacementAvailable) {
      updateShipPlacements(
        shipType,
        shipPlacement.coordinates,
        shipPlacement.cellsTaken,
      );
    } else if (!isShipPlacementAvailable) {
      return "Cannot place ship space already acquired";
    } else if (!isInsideTheGameBoard) {
      return "Cannot place ship outside of game board";
    }

    return "Ship placed successfully";
  };

  const receiveAttack = (coordinates) => {
    const shipAttacked = checkShipAttacked(coordinates);

    if (shipAttacked) {
      ships[shipAttacked].hit();
      updateHitAttacks(coordinates);
    } else {
      updateMissedAttacks(coordinates);
    }
  };

  const checkAllShipsSunk = () =>
    Object.keys(ships).every((key) => ships[key].isSunk());

  return {
    ships,
    gameBoard,
    placeShips,
    getShipPlacements,
    receiveAttack,
    getMissedAttacks,
    getHitAttacks,
    checkShipAttacked,
    checkAllShipsSunk,
  };
};

export default GameController;
