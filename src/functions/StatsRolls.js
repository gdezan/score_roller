const pointBuyDict = {
  3: -9,
  4: -6,
  5: -4,
  6: -2,
  7: -1,
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
  16: 12,
  17: 15,
  18: 19,
};

function d6() {
  return Math.floor(Math.random() * 6 + 1);
}

function fourDSixDropLowest() {
  let rolls = [];
  let bigTotal = 0;
  for (let i = 0; i < 6; i++) {
    let smallest = 7;
    let total = 0;

    for (let i = 0; i < 4; i++) {
      const roll = d6();
      smallest = Math.min(smallest, roll);
      total += roll;
    }
    total -= smallest;
    rolls.push(total);
    bigTotal += total;
  }
  rolls.push(bigTotal);
  return rolls;
}

function threeDSix() {
  let rolls = [];
  let bigTotal = 0;
  for (let i = 0; i < 6; i++) {
    let total = 0;
    for (let i = 0; i < 3; i++) {
      total += d6();
    }
    rolls.push(total);
    bigTotal += total;
  }
  rolls.push(bigTotal);
  return rolls;
}

function twoDSixPlusSix() {
  let rolls = [];
  let bigTotal = 0;
  for (let i = 0; i < 6; i++) {
    const total = d6() + d6() + 6;
    rolls.push(total);
    bigTotal += total;
  }
  rolls.push(bigTotal);
  return rolls;
}

export function getPointBuy(rolls) {
  const pointBuy = rolls.map(item => pointBuyDict[item]);
  pointBuy.splice(-1, 1);
  pointBuy.push(pointBuy.reduce((acc, item) => acc + item, 0));
  return pointBuy;
}

export function getRolls(rollType) {
  switch (rollType) {
    case "4d6dl":
      return fourDSixDropLowest();
    case "3d6":
      return threeDSix();
    case "2d6p6":
      return twoDSixPlusSix();
    default:
      return null;
  }
}

export function getBonus(rolls) {
  const bonus = rolls.map(item => Math.floor((item - 10) / 2));
  bonus.splice(-1, 1);
  bonus.push(bonus.reduce((acc, item) => acc + item, 0));
  return bonus;
}
