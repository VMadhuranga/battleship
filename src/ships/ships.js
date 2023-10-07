const Ship = (length) => {
  const shipLength = length;
  let sunken = false;
  let hitCount = 0;

  const getShipLength = () => shipLength;

  const isSunk = () => {
    if (hitCount === this.shipLength) {
      sunken = true;
    }

    return sunken;
  };

  const hit = () => {
    hitCount += 1;
  };

  return {
    getShipLength,
    hit,
    isSunk,
  };
};

const ShipTypes = () => {
  const carrier = Ship(5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(3);
  const patrolBoat = Ship(2);

  return {
    carrier,
    battleship,
    destroyer,
    submarine,
    patrolBoat,
  };
};

export default ShipTypes;
