import GameController from "../game-controller/game-controller";

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

  return { controller, placeShipsRandomly };
};

export default Computer;
