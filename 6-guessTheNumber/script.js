'use strict';

let correctNumber = Math.floor(Math.random() * 100);

const checkBTN = document.querySelector('.check');
const againBTN = document.querySelector('.again');
const guess = document.querySelector('.guess');
const message = document.querySelector('.message');
const number = document.querySelector('.number');

let currentScoreLBL = document.querySelector('.score');
let highScoreLBL = document.querySelector('.highscore');

let currentScore = parseInt(currentScoreLBL.innerText);
let highScore = parseInt(highScoreLBL.innerText);

checkBTN.addEventListener('click', (e) => {
  const guessed = parseInt(guess.value);
  if (isNaN(guessed) || guessed <= 0 || guessed > 100) {
    message.innerText = '⛔️  Enter a valid number';
  } else {
    if (guessed === correctNumber) {
      // Changes to be made when correct number is guessed
      message.innerText = '🎉 You guessed correctly.';
      document.body.style.backgroundColor = '#60b347';
      number.innerText = correctNumber;
      checkBTN.disabled = true;
      if (currentScore > highScore) {
        highScore = currentScore;
        highScoreLBL.innerText = highScore;
      }
      party.element(document.body, {
        count: 1000,
        countVariation: 0.5,
        angleSpan: 80,
        yVelocity: -3000,
        yVelocityVariation: 1,
        rotationVelocityLimit: 6,
        scaleVariation: 0.8,
      });
    } else {
      if (guessed < correctNumber) {
        // Change 'message' class
        message.innerText = '⬇ You guessed less.';
      } else {
        message.innerText = '⬆ You guessed more.';
      }
      currentScore--;
      currentScoreLBL.innerText = currentScore;
    }
  }
});

againBTN.addEventListener('click', (e) => {
  guess.value = '';
  checkBTN.disabled = false;
  currentScore = 100;
  currentScoreLBL.innerText = currentScore;
  document.body.style.backgroundColor = '#222';
  number.innerText = '?';
  correctNumber = Math.floor(Math.random() * 100);
  message.innerText = 'Start Guessing';
});
