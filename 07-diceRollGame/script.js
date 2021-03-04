'use strict';

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
let currentActive = 0;

const dice = document.querySelector('.dice');
const rollDiceBTN = document.querySelector('.btn-roll');
const holdBTN = document.querySelector('.btn-hold');
const newBTN = document.querySelector('.btn-new');

const currentScorePL0 = document.querySelector('#current-0');
const currentScorePL1 = document.querySelector('#current-1');

const totalScorePL0LBL = document.querySelector('#score-0');
const totalScorePL1LBL = document.querySelector('#score-1');

let currentScore0 = parseInt(currentScorePL0.innerText);
let currentScore1 = parseInt(currentScorePL1.innerText);

let totalScore0 = parseInt(totalScorePL0LBL.innerText);
let totalScore1 = parseInt(totalScorePL1LBL.innerText);

const playGame = (randomDiceRoll) => {
  if (currentActive === 0) {
    currentScore0 += randomDiceRoll;
    currentScorePL0.innerText = `${currentScore0}`;
  } else {
    currentScore1 += randomDiceRoll;
    currentScorePL1.innerText = `${currentScore1}`;
  }
};

const changePlayer = () => {
  if (currentActive === 0) {
    player0.classList.remove('active');
    currentScorePL0.innerText = '0';
    player1.classList.add('active');
    currentActive = 1;
    currentScore0 = 0;
    currentScore1 = 0;
  } else {
    player1.classList.remove('active');
    currentScorePL1.innerText = '0';
    player0.classList.add('active');
    currentActive = 0;
    currentScore0 = 0;
    currentScore1 = 0;
  }
};

const checkWinner = (score, player) => {
  if (score >= 20) {
    player.classList.remove('active');
    player.classList.add('player-winner');
    rollDiceBTN.disabled = true;
    holdBTN.disabled = true;
    party.element(player, {
      count: 1000,
      countVariation: 0.5,
      angleSpan: 80,
      yVelocity: -3000,
      yVelocityVariation: 1,
      rotationVelocityLimit: 6,
      scaleVariation: 0.8,
    });
    return true;
  }
  return false;
};

rollDiceBTN.addEventListener('click', (e) => {
  const randomDiceRoll = Math.trunc(Math.random() * 6 + 1);
  const imageURL = `images/dice-${randomDiceRoll}.png`;
  dice.src = imageURL;
  if (randomDiceRoll === 1) {
    changePlayer();
  } else {
    playGame(randomDiceRoll);
  }
});

holdBTN.addEventListener('click', (e) => {
  if (currentActive === 0) {
    totalScore0 += currentScore0;
    totalScorePL0LBL.innerText = `${totalScore0}`;
    if (!checkWinner(totalScore0, player0)) {
      changePlayer();
    }
  } else {
    totalScore1 += currentScore1;
    totalScorePL1LBL.innerText = `${totalScore1}`;
    if (!checkWinner(totalScore1, player1)) {
      changePlayer();
    }
  }
});

newBTN.addEventListener('click', (e) => {
  totalScore0 = 0;
  totalScore1 = 0;
  currentScore0 = 0;
  currentScore1 = 0;
  totalScorePL0LBL.innerText = `0`;
  totalScorePL1LBL.innerText = `0`;
  currentScorePL0.innerText = `0`;
  currentScorePL1.innerText = `0`;
  if (player0.classList.contains('player-winner')) {
    player0.classList.remove('player-winner');
  }
  if (player1.classList.contains('player-winner')) {
    player1.classList.remove('player-winner');
  }
  if (player1.classList.contains('active')) {
    player1.classList.remove('active');
  }
  player0.classList.add('active');
  rollDiceBTN.disabled = false;
  holdBTN.disabled = false;
  currentActive = 0;
});
