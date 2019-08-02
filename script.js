const pointCells = document.querySelectorAll(".point");
const bonusCells = document.querySelectorAll(".bonus");
const rollButton = document.querySelector(".roller");
const limitCheck = document.querySelector(".limit");
const limitNumber = document.querySelector(".limit-number");
const sliderNumber = document.querySelector(".slider-number");

function d6() {
  return Math.floor(Math.random() * 6 + 1);
}

function makeRoll() {
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

function getBonus(rolls) {
  const bonus = rolls.map(item => Math.floor((item - 10) / 2));
  bonus.splice(-1, 1);
  bonus.push(bonus.reduce((acc, item) => acc + item, 0));
  return bonus;
}

function fillCells() {
  const num = parseInt(limitNumber.value);
  const rolls = limitCheck.checked && num <= 108 && num >= 18 ? getLimited() : makeRoll();
  const bonus = getBonus(rolls);
  for (let i = 0; i < pointCells.length; i++) {
    pointCells[i].innerText = rolls[i];
    bonusCells[i].innerText = bonus[i];
  }
}

function getLimited() {
  let rolls = makeRoll();
  while (rolls[6] !== parseInt(limitNumber.value)) rolls = makeRoll();
  return rolls;
}

rollButton.addEventListener("click", fillCells);
limitNumber.addEventListener("input", () => {
  sliderNumber.innerText = limitNumber.value;
});
