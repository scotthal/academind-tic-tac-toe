function updateActivePlayerName() {
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function resetGame() {
  gameOver = false;
  activePlayer = 0;
  turnCount = 0;
  gameOverElement.style.display = "none";
  for (let y = 0; y < 3; ++y) {
    for (let x = 0; x < 3; ++x) {
      gameData[y][x] = -1;
      gameFieldElements[3 * y + x].textContent = "";
      gameFieldElements[3 * y + x].classList.remove("disabled");
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Set names for both players!");
    return;
  }
  resetGame();
  updateActivePlayerName();
  gameAreaElement.style.display = "block";
}

function selectGameField(event) {
  const target = event.target;
  const x = +target.dataset.x;
  const y = +target.dataset.y;

  if (gameOver || gameData[y][x] !== -1) {
    return;
  }
  gameData[y][x] = activePlayer;

  target.textContent = players[activePlayer].symbol;
  target.classList.add("disabled");

  const winner = getGameWinner();
  if (winner >= 0) {
    declareGameOver(winner);
  }

  if (++turnCount >= 9) {
    declareGameOver(-1);
  }

  activePlayer ^= 1;
  updateActivePlayerName();
}

function getGameWinner() {
  let winner = -1;
  for (let y = 0; y < 3 && winner < 0; ++y) {
    if (
      gameData[y][0] === gameData[y][1] &&
      gameData[y][1] === gameData[y][2]
    ) {
      winner = gameData[y][0];
    }
  }
  for (let x = 0; x < 3 && winner < 0; ++x) {
    if (
      gameData[0][x] === gameData[1][x] &&
      gameData[1][x] === gameData[2][x]
    ) {
      winner = gameData[0][x];
    }
  }
  if (
    winner < 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    winner = gameData[0][0];
  }
  if (
    winner < 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    winner = gameData[0][2];
  }
  return winner;
}

function declareGameOver(winner) {
  gameOver = true;
  if (winner < 0) {
    gameOverElement.firstElementChild.textContent = "DRAW !!!";
  } else {
    gameOverElement.firstElementChild.textContent = `${players[winner].name} WIN !!!`;
  }
  gameOverElement.style.display = "block";
}
