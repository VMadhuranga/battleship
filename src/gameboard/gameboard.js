const Gameboard = () => {
  const board = [];
  let cell = 1;

  function createGameBoard() {
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

  return { getBoard };
};

export default Gameboard;
