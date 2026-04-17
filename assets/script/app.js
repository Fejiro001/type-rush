"use strict";
import { Score } from "./Score.js";

const GAME_TIME = 99;

const wordDisplayContainer = document.querySelector(".word-display");
const wordDisplay = document.querySelector(".displayed-word");
const currentWord = document.querySelector(".current-word");
const totalWords = document.querySelector(".total-words");
const startWords = document.querySelector(".start-words");
const totalTime = document.querySelector(".total-time");
const currentPoints = document.querySelector(".points-value");
const timeCountdown = document.querySelector(".time-value");
const form = document.querySelector(".word-form");
const inputField = document.querySelector(".word-input");
const startBtn = document.getElementById("start-btn");
const scoreboardBtn = document.querySelectorAll(".scoreboard-btn");
const restartBtn = document.getElementById("restart-btn");
const returnBtn = document.querySelectorAll("#return-btn");
const gameStats = document.querySelectorAll(".stat-row");
const scoreBoard = document.querySelector(".score-table-body");

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
let timeLeft = GAME_TIME;
let timer;
const scoresArray = [];

totalWords.textContent = startWords.textContent = wordsArray.length;
totalTime.textContent = GAME_TIME;

// Prevent copy and paste
wordDisplay.addEventListener("copy", (e) => e.preventDefault());

inputField.addEventListener("paste", (e) => e.preventDefault());

// Shuffle function
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Display word from shuffled words array
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

  currentIndex++;
  currentWord.textContent = currentIndex;
  displayWord(wordsArray[currentIndex - 1]);
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
  displayTimeLeft();

  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeCountdown.textContent = "0s";
      endGame();
      return;
    }
    displayTimeLeft();
  }, 1000);
};

const playSound = (audio) => {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
};

const clearInput = () => {
  inputField.value = "";
};

const animate = (element, className, duration) => {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
};

const checkAllMatched = () => {
  const letters = document.querySelectorAll(".displayed-word span");
  const typed = inputField.value.trim();

  const allCorrect = typed.length === letters.length && Array.from(letters).every((letter) => letter.classList.contains("correct"));

  if (allCorrect) {
    clearInput();
    playSound(correctMusic);
    animate(wordDisplayContainer, "next-word", 250);
    incrementPoints();
    showNextWord();
  }
};

let canPlayError = true;

const playErrorSound = () => {
  if (!canPlayError) return;

  canPlayError = false;
  playSound(errorMusic);

  setTimeout(() => {
    canPlayError = true;
  }, 120);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputField.addEventListener("input", (e) => {
  const letters = document.querySelectorAll(".displayed-word span");
  const typed = e.target.value.trim().split("");

  letters.forEach((letter, index) => {
    if (typed[index] === undefined) {
      letter.classList.remove("correct", "wrong");
    } else if (typed[index].toLowerCase() === letter.textContent.toLowerCase()) {
      letter.classList.add("correct");
      letter.classList.remove("wrong");
    } else {
      playErrorSound();
      letter.classList.add("wrong");
      letter.classList.remove("correct");
      animate(wordDisplayContainer, "input-error", 300);
    }
  });

  checkAllMatched();
});

// Start game
const startGame = () => {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
  backgroundMusic.volume = 0.5;
  backgroundMusic.loop = true;
  shuffle(wordsArray);
  showNextWord();
  startCountdown();
};

const createNewScoreObject = () => {
  const date = new Date().toLocaleDateString("en-ca", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  let userAccuracy = currentIndex === 0 ? 0 : (gamePoints / currentIndex) * 100;
  userAccuracy = userAccuracy.toPrecision(2);

  const score = new Score(date, gamePoints, userAccuracy);
  return score;
};

const displayGameStats = (score) => {
  gameStats[0].children[1].textContent = score.points;
  gameStats[1].children[1].textContent = `${score.percentage}%`;

  const avgPerWord = gamePoints === 0 ? 0 : (GAME_TIME / gamePoints).toFixed(1);
  gameStats[2].children[1].textContent = `${avgPerWord}s`;
};

const endGame = () => {
  clearInterval(timer);
  inputField.disabled = true;

  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  gameOverMusic.play();

  // Create and store score
  const scoreObj = createNewScoreObject();
  displayGameStats(scoreObj);
  scoresArray.push(scoreObj);

  showScreen("end-screen");
};

const populateScoreBoard = () => {
  scoreBoard.replaceChildren();

  scoresArray.forEach((score, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${score.points}</td>
        <td>${score.percentage}%</td>
        <td>${score.date}</td>
      `;

    scoreBoard.appendChild(row);
  });
};

function showScreen(screenName) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(screenName).classList.add("active");
}

const resetGame = () => {
  inputField.disabled = false;
  clearInterval(timer);

  currentIndex = 0;
  gamePoints = 0;
  timeLeft = GAME_TIME;

  currentPoints.textContent = 0;
  inputField.value = "";
  wordDisplay.innerHTML = "";
  timeCountdown.textContent = `${GAME_TIME}s`;
};

const focusInput = () => {
  setTimeout(() => inputField.focus(), 0);
};

function sortScores() {
  scoresArray.sort((a, b) => b.points - a.points);
}
function limitToTopScores() {
  if (scoresArray.length > 9) {
    scoresArray.splice(9);
  }
}
startBtn.addEventListener("click", () => {
  startGameMusic.play();
  showScreen("typing-screen");
  resetGame();
  focusInput();
  startGame();
});

scoreboardBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    showScreen("scoreboard-screen");
    populateScoreBoard();
  });
});

restartBtn.addEventListener("click", () => {
  resetGame();
  showScreen("typing-screen");
  focusInput();
  startGame();
});

returnBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    resetGame();
    showScreen("start-screen");
  });
});
