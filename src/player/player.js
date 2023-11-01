import GameController from "../game-controller/game-controller";

export const Player = () => {
  const controller = GameController();

  return { controller };
};

const player = Player();

export default player;
