const pointCells = document.querySelectorAll(".point");
const bonusCells = document.querySelectorAll(".bonus");
const pbeCells = document.querySelectorAll(".pbe-point");
const rollTypes = document.querySelectorAll(".roll-type");
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
const selectedRoll = document.querySelector(".selected-roll");
const selectedRollText = document.querySelector(".selected-roll-text");
const rollTypesContainer = document.querySelector(".roll-types");
const selectedRollArrow = document.querySelector(".roll-angle-down");
const schemeToggle = document.querySelector(".scheme-toggle");

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

const carbonColorScheme = {
  "--color-accent": "#D65A31",
  "--color-primary": "#474d57",
  "--color-secondary": "#222831",
  "--color-border": "#272a30",
  "--text-primary": "white",
  "--text-contrast": "black",
};

const greenColorScheme = {
  "--color-accent": "#619457",
  "--color-primary": "#e5e5e5",
  "--color-secondary": "#9db697",
  "--color-border": "#44663e",
  "--text-primary": "black",
  "--text-contrast": "white",
};

function changeColorScheme() {
  const root = document.documentElement;
  const scheme = !schemeToggle.checked ? greenColorScheme : carbonColorScheme;
  Object.keys(scheme).forEach(key => {
    root.style.setProperty(key, scheme[key]);
  });
}

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

function makeRoll() {
  switch (selectedRollText.id) {
    case "4d6dl":
      return fourDSixDropLowest();
    case "3d6":
      return threeDSix();
    case "2d6p6":
      return twoDSixPlusSix();
  }
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

let rollTypesOpened = false;
function toggleRollTypes() {
  if (rollTypesOpened) {
    rollTypesContainer.classList.add("hidden-roll-types");
    selectedRollArrow.classList.remove("rotated-angle");
  } else {
    selectedRollArrow.classList.add("rotated-angle");
    rollTypesContainer.classList.remove("hidden-roll-types");
  }
  rollTypesOpened = !rollTypesOpened;
}

function selectRollType(e) {
  const selectedRoll = e.toElement.innerText;
  selectedRollText.innerText = selectedRoll;
  selectedRollText.id = e.toElement.id;
  toggleRollTypes();
}

schemeToggle.addEventListener("click", changeColorScheme);
rollTypes.forEach(e => e.addEventListener("click", e => selectRollType(e)));
selectedRoll.addEventListener("click", toggleRollTypes);
pbeCheck.addEventListener("click", togglePbe);
rollButton.addEventListener("click", fillCells);
fixSlider.addEventListener("input", () => {
  sliderNumber.innerText = fixSlider.value;
});
greaterSlider.addEventListener("input", () => {
  greaterNumber.innerText = greaterSlider.value;
});
