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

  return {
    getBoard,
    getBoardCell,
  };
};

export default GameBoard;
