"use strict";
import { Score } from "./Score.js";

const wordDisplay = document.querySelector(".displayed-word");
const currentWord = document.querySelector(".current-word");
const currentPoints = document.querySelector(".points-value");
const timeCountdown = document.querySelector(".time-value");
const inputField = document.querySelector(".word-input");

const wordsArray = [
  "dinosaur",
  "love",
  "pineapple",
  "calendar",
  "robot",
  "building",
  "population",
  "weather",
  "bottle",
  "history",
  "dream",
  "character",
  "money",
  "absolute",
  "discipline",
  "machine",
  "accurate",
  "connection",
  "rainbow",
  "bicycle",
  "eclipse",
  "calculator",
  "trouble",
  "watermelon",
  "developer",
  "philosophy",
  "database",
  "periodic",
  "capitalism",
  "abominable",
  "component",
  "future",
  "pasta",
  "microwave",
  "jungle",
  "wallet",
  "canada",
  "coffee",
  "beauty",
  "agency",
  "chocolate",
  "eleven",
  "technology",
  "alphabet",
  "knowledge",
  "magician",
  "professor",
  "triangle",
  "earthquake",
  "baseball",
  "beyond",
  "evolution",
  "banana",
  "perfumer",
  "computer",
  "management",
  "discovery",
  "ambition",
  "music",
  "eagle",
  "crown",
  "chess",
  "laptop",
  "bedroom",
  "delivery",
  "enemy",
  "button",
  "superman",
  "library",
  "unboxing",
  "bookstore",
  "language",
  "homework",
  "fantastic",
  "economy",
  "interview",
  "awesome",
  "challenge",
  "science",
  "mystery",
  "famous",
  "league",
  "memory",
  "leather",
  "planet",
  "software",
  "update",
  "yellow",
  "keyboard",
  "window"
];
const backgroundMusic = new Audio("./assets/media/audio/background.wav");
backgroundMusic.type = "audio/wav";
let randomWord = "";
let currentIndex = 0;
let points = 0;
let timeLeft = 99;
let timer;

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
    }
  }, 1000);
};

const clearInput = () => {
  inputField.value = "";
};

const checkAllMatched = () => {
  if (Array.from(document.querySelectorAll(".displayed-word span")).every((letter) => letter.classList.contains("correct"))) {
    clearInput();
    showNextWord();
    incrementHits();
  }
};

inputField.addEventListener("input", (e) => {
  const letters = document.querySelectorAll(".displayed-word span");
  const typedIndex = e.target.value.length - 1;

  if (typedIndex >= 0 && e.target.value[typedIndex].toLowerCase() === letters[typedIndex].textContent) {
    letters[typedIndex].classList.add("correct");
  } else {
    letters[typedIndex].classList.add("wrong");
  }

  checkAllMatched();
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    const letters = document.querySelectorAll(".displayed-word span");
    const typedIndex = e.target.value.length - 1;

    if (letters[typedIndex]) {
      letters[typedIndex].classList.remove("correct");
      letters[typedIndex].classList.remove("wrong");
    }
  }
});

// Start game
const startGame = () => {
  shuffle(wordsArray);
  showNextWord();
  startCountdown();
};

startGame();


