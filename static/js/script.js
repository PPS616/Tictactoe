const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('display');
const restartButton = document.getElementById('game-restart');

const gameOverScreen = document.getElementById('game-over-screen');
const gameOverText = document.getElementById('game-over-text');
const newGameButton = document.getElementById('new-game-button');

let isXNext = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = isXNext ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)){
    endGame(false);
  }
  else if (isDraw()){
    endGame(true);
  }
  else{
    swapTurns();
    setStatus();
  }
};

const endGame = (draw) => {
  let text = draw ? 'Draw!' : `${isXNext ? 'X' : 'O'} Wins!`;
  gameOverText.innerText = text;
  gameOverScreen.style.display = 'flex'; // Show the game-over screen
};

newGameButton.addEventListener('click', () => {
  gameOverScreen.style.display = 'none'; // Hide the game-over screen
  restartGame(); // Reset the game
});

const isDraw = () => {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
};

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
  cell.innerText = currentClass;
};

const swapTurns = () => {
  isXNext = !isXNext;
};

const setStatus = () => {
  statusDisplay.innerText = `${isXNext ? 'X' : 'O'}'s turn`;
};

const checkWin = (currentClass) => {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

const restartGame = () => {
  isXNext = true;
  statusDisplay.innerText = 'X\'s turn';
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameOverScreen.style.display = 'none'; // Hide the game-over screen
};

newGameButton.addEventListener('click', restartGame);

restartGame();

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

setStatus();
