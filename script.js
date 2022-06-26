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

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // Display the dice.
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Check if rolled 1:
  if (dice != 1) {
    // Add dice to current score
    currentScore += dice;
    currentScore0El.textContent = currentScore; // CHANGE LATER (Both players)

    // Switch to next player
  } else {
  }
});
