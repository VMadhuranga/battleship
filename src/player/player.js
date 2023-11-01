import GameController from "../game-controller/game-controller";
import { computer } from "../computer/computer";

export const Player = () => {
  const controller = GameController();

  const attackShip = (coordinates) => {
    computer.controller.receiveAttack(
      computer.controller.gameBoard.getBoardCellCoordinates(coordinates),
    );
  };

  return { controller, attackShip };
};

const player = Player();

export default player;
