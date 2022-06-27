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
let activePlayerFlag = 0;
let currentScore = 0;
let activePlayer;

// Create player class
class Player {
  constructor(score, scoreElement, currentScoreElement, sectionElement) {
    this.score = score;
    this.scoreElement = scoreElement;
    this.currentScoreElement = currentScoreElement;
    this.sectionElement = sectionElement;
  }

  setCurrentScore = function (newScore, increment) {
    currentScore = increment ? currentScore + newScore : newScore;
    this.currentScoreElement.textContent = currentScore;
  };

  addCurrentScoreToScore = function () {
    this.score += currentScore;
    this.scoreElement.textContent = this.score;
  };

  toggleActive = function () {
    this.sectionElement.classList.toggle('player--active');
  };
}

// Create player objects for the 2 players
const player0 = new Player(0, score0El, currentScore0El, player0Section);
const player1 = new Player(0, score1El, currentScore1El, player1Section);

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

activePlayer = players[activePlayerFlag];

const switchPlayer = function () {
  activePlayer.setCurrentScore(0, false);
  activePlayer.toggleActive();
  activePlayerFlag = 1 - activePlayerFlag;
  activePlayer = players[activePlayerFlag];
  activePlayer.toggleActive();
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display the dice.
  if (diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Check if rolled 1:
  if (dice != 1) {
    // Add dice to current score
    activePlayer.setCurrentScore(dice, true);

    // Switch to next player
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  activePlayer.addCurrentScoreToScore();
  switchPlayer();
});

btnNew.addEventListener('click', function () {
  // If Player 2 is active, switch; otherwise clear current score
  activePlayerFlag ? switchPlayer() : activePlayer.setCurrentScore(0, false);

  setInitialState();
});
