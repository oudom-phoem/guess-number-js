"use strict";

const MAX_SCORE = 10;
const MIN_NUMBER = 1;
const MAX_NUMBER = 20;

const generateSecretNumber = function () {
  return Math.trunc(Math.random() * MAX_NUMBER + MIN_NUMBER);
};

let secretNumber = generateSecretNumber();
let score = MAX_SCORE;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const displaySecretNumber = function (secretNumber) {
  document.querySelector(".number").textContent = secretNumber;
};

const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

const changeStyles = function (backgroundColor, width) {
  document.querySelector("body").style.backgroundColor = backgroundColor;
  document.querySelector(".number").style.width = width;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = document.querySelector(".guess").value.trim();

  // When there is no input (empty string)
  if (guess === "") {
    displayMessage("⛔️ No number!");
  } else {
    // Convert the input to a number after the empty check
    const guessNumber = Number(guess);

    // When user guess is outside the valid range
    if (guessNumber < MIN_NUMBER || guessNumber > MAX_NUMBER) {
      displayMessage(`🚫 Invalid! Enter (${MIN_NUMBER} - ${MAX_NUMBER}).`);

      // When player wins
    } else if (guessNumber === secretNumber) {
      displayMessage("🎉 Correct Number!");
      displaySecretNumber(secretNumber);

      changeStyles("#60b347", "30rem");

      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }

      // When guess is wrong
    } else {
      if (score > 1) {
        displayMessage(
          guessNumber > secretNumber ? "📈 Too high!" : "📉 Too low!"
        );
        score--;
        displayScore(score);
      } else {
        displayMessage("💥 You lost the game!");
        displayScore(0);
      }
    }
  }
});

// Restart game
document.querySelector(".again").addEventListener("click", function () {
  score = MAX_SCORE;
  secretNumber = generateSecretNumber();

  displayMessage("Start guessing...");
  displayScore(score);
  displaySecretNumber("?");
  document.querySelector(".guess").value = "";

  changeStyles("#222", "15rem");
});
