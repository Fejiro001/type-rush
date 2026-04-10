"use strict";
import { Score } from "./Score.js";

const wordDisplay = document.querySelector(".displayed-word");
const currentWord = document.querySelector(".current-word");
const totalWords = document.querySelector(".total-words");
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

// All Audio
const startGameMusic = new Audio("./assets/media/audio/start-game.wav");
startGameMusic.type = "audio/wav";

const backgroundMusic = new Audio("./assets/media/audio/background.mp3");
backgroundMusic.type = "audio/mp3";

const correctMusic = new Audio("./assets/media/audio/correct.mp3");
correctMusic.type = "audio/mp3";

const errorMusic = new Audio("./assets/media/audio/error.flac");
errorMusic.type = "audio/flac";

const gameOverMusic = new Audio("./assets/media/audio/game-over.wav");
gameOverMusic.type = "audio/wav";


let currentIndex = 0;
let gamePoints = 0;
let timeLeft = 99;
let timer;
const scoresArray = [];

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
  if (currentIndex >= wordsArray.length) {
    endGame();
    return;
  }

  currentWord.textContent = currentIndex + 1;
  displayWord(wordsArray[currentIndex]);
  currentIndex++;
};

const incrementPoints = () => {
  gamePoints++;
  currentPoints.textContent = gamePoints;
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
    correctMusic.play();
    clearInput();
    incrementPoints();
    showNextWord();
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
      errorMusic.play();
      letter.classList.add("wrong");
      letter.classList.remove("correct");
    }
  });

  checkAllMatched();
});

// Start game
const startGame = () => {
  backgroundMusic.play();
  backgroundMusic.volume = 0.5;
  backgroundMusic.loop = true;
  shuffle(wordsArray);
  showNextWord();
  startCountdown();
};

startGame();

const createNewScoreObject = () => {
  const date = new Date().toLocaleDateString("en-ca", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  let userAccuracy = (gamePoints / wordsArray.length) * 100;

  const score = new Score(date, gamePoints, userAccuracy);
  return score;
};

const endGame = () => {
  // Stop timer
  clearInterval(timer);
  
  // Stop music
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  
  gameOverMusic.play();

  // Create and store score
  const scoreObj = createNewScoreObject();
  scoresArray.push(scoreObj);
};

const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Function to switch screens
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Show requested screen
    document.getElementById(screenId).classList.add('active');
}

// Link Start Button
startBtn.addEventListener('click', () => {
    if (typeof startNewGame === "function") {
        startNewGame();
    }
    showScreen('typing-screen'); 
});

restartBtn.addEventListener('click', () => {
    showScreen('start-screen');
});
