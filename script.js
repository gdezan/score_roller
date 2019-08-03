const pointCells = document.querySelectorAll(".point");
const bonusCells = document.querySelectorAll(".bonus");
const pbeCells = document.querySelectorAll(".pbe-point");
const rollButton = document.querySelector(".roller");
const limitCheck = document.querySelector("#fix-check");
const fixSlider = document.querySelector("#fix-slider");
const sliderNumber = document.querySelector("#fix-number");
const greaterCheck = document.querySelector("#greater-check");
const greaterSlider = document.querySelector("#greater-slider");
const greaterNumber = document.querySelector("#greater-number");
const pbeGrid = document.querySelector(".pbe-grid-container");
const gridContainer = document.querySelector(".grid-container");
const pbeCheck = document.querySelector(".pbe-check");

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
  const num = parseInt(fixSlider.value);
  let rolls = [];

  if (limitCheck.checked) {
    rolls = getLimited();
  } else if (greaterCheck.checked) {
    rolls = getGreater();
  } else {
    rolls = makeRoll();
  }

  const bonus = getBonus(rolls);
  const pbe = getPointBuy(rolls);
  for (let i = 0; i < pointCells.length; i++) {
    pointCells[i].innerText = rolls[i];
    bonusCells[i].innerText = bonus[i];
    pbeCells[i].innerText = pbe[i];
  }
}

function getLimited() {
  let rolls = makeRoll();
  while (rolls[6] !== parseInt(fixSlider.value)) rolls = makeRoll();
  return rolls;
}

function getGreater() {
  let rolls = makeRoll();
  while (rolls[6] <= parseInt(greaterSlider.value)) rolls = makeRoll();
  return rolls;
}

function getPointBuy(rolls) {
  const pointBuy = rolls.map(item => pointBuyDict[item]);
  pointBuy.splice(-1, 1);
  pointBuy.push(pointBuy.reduce((acc, item) => acc + item, 0));
  return pointBuy;
}

function togglePbe() {
  if (pbeCheck.checked) {
    pbeGrid.classList.remove("pbe-before");
    gridContainer.classList.add("grid-after");
  } else {
    pbeGrid.classList.add("pbe-before");
    gridContainer.classList.remove("grid-after");
  }
}

pbeCheck.addEventListener("click", togglePbe);
rollButton.addEventListener("click", fillCells);
fixSlider.addEventListener("input", () => {
  sliderNumber.innerText = fixSlider.value;
});
greaterSlider.addEventListener("input", () => {
  greaterNumber.innerText = greaterSlider.value;
});
