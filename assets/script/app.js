"use strict";

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
    // 1. Call your partner's game logic function
    if (typeof startNewGame === "function") {
        startNewGame();
    }
    // 2. Switch to Typing Screen (Assumes you have a div with id="typing-screen")
    showScreen('typing-screen'); 
});

// Link Restart Button (Task: New game without reload)
restartBtn.addEventListener('click', () => {
    showScreen('start-screen');
});