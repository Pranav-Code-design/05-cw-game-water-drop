// Variables to control game state
let gameRunning = false;
let dropMaker;
let timer;
let score = 0;
let timeLeft = 30;

const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

const winningMessages = [
  "Amazing work! You saved the day!",
  "Fantastic catch! You are a water hero!"
];

const losingMessages = [
  "Try again! You can catch more next time.",
  "Almost there! Keep practicing your aim."
];

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 30;
  updateScore();
  updateTime();

  const existingMessage = document.querySelector(".game-message");
  if (existingMessage) existingMessage.remove();

  gameContainer.querySelectorAll(".water-drop").forEach((drop) => drop.remove());

  dropMaker = setInterval(createDrop, 1000);
  timer = setInterval(() => {
    timeLeft -= 1;
    updateTime();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function createDrop() {
  const drop = document.createElement("div");
  drop.className = "water-drop";

  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  const gameWidth = gameContainer.offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";
  drop.style.animationDuration = "4s";

  drop.addEventListener("click", () => {
    if (!gameRunning) return;

    score += 1;
    updateScore();
    drop.remove();
  });

  gameContainer.appendChild(drop);

  drop.addEventListener("animationend", () => {
    if (drop.parentNode) {
      drop.remove();
    }
  });
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTime() {
  timeDisplay.textContent = timeLeft;
}

function endGame() {
  clearInterval(dropMaker);
  clearInterval(timer);
  gameRunning = false;

  gameContainer.querySelectorAll(".water-drop").forEach((drop) => drop.remove());

  const message = document.createElement("div");
  message.className = "game-message";
  message.textContent = score >= 20
    ? winningMessages[Math.floor(Math.random() * winningMessages.length)]
    : losingMessages[Math.floor(Math.random() * losingMessages.length)];

  gameContainer.appendChild(message);
}
