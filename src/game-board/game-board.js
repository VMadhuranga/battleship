const GameBoard = () => {
  const board = [];

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

  const getBoardCellCoordinates = (cell) =>
    board.reduce((acc, val, index) => {
      if (val.indexOf(cell) > -1) {
        acc.push(index, val.indexOf(cell));
      }

      return acc;
    }, []);

  return {
    getBoard,
    getBoardCell,
    getBoardCellCoordinates,
  };
};

export default GameBoard;
