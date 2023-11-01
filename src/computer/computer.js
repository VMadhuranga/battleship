import GameController from "../game-controller/game-controller";
import player from "../player/player";

const Computer = () => {
  const controller = GameController();

  const placeShipsRandomly = () => {
    while (Object.keys(controller.getShipPlacements()).length !== 5) {
      Object.keys(controller.ships).forEach((ship) => {
        if (!Object.keys(controller.getShipPlacements()).includes(ship)) {
          const xPosition =
            Math.floor(
              Math.random() * (9 - controller.ships[ship].getShipLength()) - 0,
            ) + 1;
          const yPosition = Math.floor(Math.random() * 9) + 1;

          controller.placeShips(ship, [xPosition, yPosition]);
        }
      });
    }
  };

  const attackShip = () => {
    let randomPlace = Math.floor(Math.random() * (100 - 1 + 1) + 1);

    while (
      player.controller.getMissedAttacks().has(randomPlace) ||
      player.controller.getHitAttacks().has(randomPlace)
    ) {
      randomPlace = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    }

    player.controller.receiveAttack(
      player.controller.gameBoard.getBoardCellCoordinates(randomPlace),
    );
  };

  return { controller, placeShipsRandomly, attackShip };
};

export default Computer;
