import ShipTypes from "../ships/ships";
import GameBoard from "../gameboard/gameboard";

const GameController = () => {
  const ships = ShipTypes();
  const gameBoard = GameBoard();

  const calculatePosition = (shipType, startPosition) => {
    const shipLength = ships[shipType].getShipLength();
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
    const position = calculatePosition(shipType, startPosition);

    gameBoard.updateShipPlacements(
      shipType,
      position.coardinates,
      position.cellsTaken,
    );
  };

  return { gameBoard, placeShips };
};

export default GameController;
