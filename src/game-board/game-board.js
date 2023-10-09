const GameBoard = () => {
  const board = [];
  const shipPlacements = {};

  function createGameBoard() {
    let cell = 1;
    for (let i = 0; i < 10; i++) {
      board[i] = [];

      for (let j = 0; j < 10; j++) {
        board[i][j] = cell;
        cell += 1;
      }
    }
  }

  createGameBoard();

  const getBoard = () => board;
  const getBoardCell = (index) => board?.[index[0]]?.[index[1]];
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

  return {
    getBoard,
    getBoardCell,
    getShipPlacements,
    updateShipPlacements,
    checkAvailableShipPlacements,
  };
};

export default GameBoard;
