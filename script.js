'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

// 0 for Player 1, 1 for Player 2
let activePlayer = 0;

// Create player class
function Player(
  score,
  currentScore,
  scoreElement,
  currentScoreElement,
  sectionElement
) {
  this.score = score;
  this.currentScore = currentScore;
  this.scoreElement = scoreElement;
  this.currentScoreElement = currentScoreElement;
  this.sectionElement = sectionElement;

  this.setCurrentScore = function (newScore, increment) {
    this.currentScore = increment ? this.currentScore + newScore : newScore;
    this.currentScoreElement.textContent = this.currentScore;
  };

  this.addCurrentScoreToScore = function () {
    this.score += this.currentScore;
    this.scoreElement.textContent = this.score;
  };

  this.makeActive = function () {
    this.sectionElement.classList.add('player--active');
  };

  this.makeInactive = function () {
    this.sectionElement.classList.remove('player--active');
  };
}

// Create player objects for the 2 players
const player0 = new Player(0, 0, score0El, currentScore0El, player0Section);
const player1 = new Player(0, 0, score1El, currentScore1El, player1Section);

const players = [player0, player1];

// Starting conditions
function setInitialState() {
  diceEl.classList.add('hidden');

  players.forEach(player => {
    player.score = 0;
    player.scoreElement.textContent = 0;
  });
}

setInitialState();

const switchPlayer = function () {
  players[activePlayer].setCurrentScore(0, false);
  players[activePlayer].makeInactive();
  activePlayer = 1 - activePlayer;
  players[activePlayer].makeActive();
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // Display the dice.
  if (diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Check if rolled 1:
  if (dice != 1) {
    // Add dice to current score
    players[activePlayer].setCurrentScore(dice, true);

    // Switch to next player
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  players[activePlayer].addCurrentScoreToScore();
  switchPlayer();
});

btnNew.addEventListener('click', function () {
  activePlayer
    ? switchPlayer()
    : players[activePlayer].setCurrentScore(0, false);

  setInitialState();
});
