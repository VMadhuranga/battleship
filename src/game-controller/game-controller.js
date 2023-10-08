import ShipTypes from "../ships/ships";
import GameBoard from "../gameboard/gameboard";

const GameController = () => {
  const ships = ShipTypes();
  const gameBoard = GameBoard();

  const calculatePosition = (shipLength, startPosition) => {
    const coardinates = [];
    const cellsTaken = [];

    for (let i = 0; i < shipLength; i++) {
      coardinates.push([startPosition[0], startPosition[1] + i]);
      cellsTaken.push(
        gameBoard.getBoardCell([startPosition[0], startPosition[1] + i]),
      );
    }

    return { coardinates, cellsTaken };
  };

  const placeShips = (shipType, startPosition) => {
    const shipLength = ships[shipType].getShipLength();

    if (
      startPosition[0] >= 0 &&
      startPosition[0] <= 9 &&
      startPosition[1] >= 0 &&
      startPosition[1] + (shipLength - 1) <= 9
    ) {
      const position = calculatePosition(shipLength, startPosition);

      gameBoard.updateShipPlacements(
        shipType,
        position.coardinates,
        position.cellsTaken,
      );
    }
  };

  return { gameBoard, placeShips };
};

export default GameController;
