"use strict";
import { Score } from "./Score.js";

const wordDisplay = document.querySelector(".displayed-word");
const currentWord = document.querySelector(".current-word");
const totalWords = document.querySelector(".total-words");
const currentPoints = document.querySelector(".points-value");
const timeCountdown = document.querySelector(".time-value");
const inputField = document.querySelector(".word-input");

const wordsArray = ["dino", "love"];
const backgroundMusic = new Audio("./assets/media/audio/background.wav");
backgroundMusic.type = "audio/wav";
let randomWord = "";
let currentIndex = 0;
let points = 0;
let timeLeft = 99;
let timer;

totalWords.textContent = wordsArray.length;

// Shuffle function
const shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Display word from shuffled array
const displayWord = (word) => {
  wordDisplay.innerHTML = word
    .split("")
    .map((letter) => `<span>${letter}</span>`)
    .join("");
};

const showNextWord = () => {
  currentWord.textContent = currentIndex + 1;
  displayWord(wordsArray[currentIndex]);
  randomWord = wordsArray[currentIndex];
  currentIndex++;
};

const incrementHits = () => {
  points++;
  currentPoints.textContent = points;
};

// Timer countdown when game starts
const displayTimeLeft = () => {
  timeCountdown.textContent = `${timeLeft}s`;
};

const startCountdown = () => {
  timer = setInterval(() => {
    displayTimeLeft();
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
};

const clearInput = () => {
  inputField.value = "";
};

const checkAllMatched = () => {
  const letters = document.querySelectorAll(".displayed-word span");
  const typed = inputField.value;

  const allCorrect = typed.length === letters.length && Array.from(letters).every((letter) => letter.classList.contains("correct"));

  if (allCorrect) {
    clearInput();
    incrementHits();
    if (currentIndex < wordsArray.length) {
      showNextWord();
    }
  }
};

inputField.addEventListener("input", (e) => {
  const letters = document.querySelectorAll(".displayed-word span");
  const typed = e.target.value.split("");

  letters.forEach((letter, index) => {
    if (typed[index] === undefined) {
      letter.classList.remove("correct", "wrong");
    } else if (typed[index].toLowerCase() === letter.textContent.toLowerCase()) {
      letter.classList.add("correct");
      letter.classList.remove("wrong");
    } else {
      letter.classList.add("wrong");
      letter.classList.remove("correct");
    }
  });

  checkAllMatched();
});

// Start game
const startGame = () => {
  shuffle(wordsArray);
  showNextWord();
  startCountdown();
};

startGame();

const endGame = () => {

};

endGame();
