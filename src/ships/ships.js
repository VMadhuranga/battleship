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

export default Ship;
