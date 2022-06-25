const gameData = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
];

let turnCount = 0;
let gameOver = false;
let editedPlayer = 0;
let activePlayer = 0;

const players = [
  {
    name: "",
    symbol: "X"
  },
  {
    name: "",
    symbol: "O"
  }
];

const playerConfigOverlayElement = document.querySelector("#config-overlay");
const backdropElement = document.querySelector("#backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.querySelector("#config-errors");
const gameAreaElement = document.querySelector("#active-game");
const activePlayerNameElement = document.querySelector("#active-player-name");
const gameOverElement = document.querySelector("#game-over");

const editPlayer1ButtonElement = document.querySelector("#edit-player-1-btn");
const editPlayer2ButtonElement = document.querySelector("#edit-player-2-btn");
const cancelConfigButtonElement = document.querySelector("#cancel-config-btn");
const startNewGameButtonElement = document.querySelector("#start-game-btn");
const gameFieldElements = document.querySelectorAll("#game-board li");

editPlayer1ButtonElement.addEventListener("click", openPlayerConfig);
editPlayer2ButtonElement.addEventListener("click", openPlayerConfig);

cancelConfigButtonElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameButtonElement.addEventListener("click", startNewGame);

for (const gameFieldElement of gameFieldElements) {
  gameFieldElement.addEventListener("click", selectGameField);
}
