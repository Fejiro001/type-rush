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

