'use strict';

const startMessage = document.querySelector('.message-start');

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    console.log(initialState);

    this.gameStatus = 'idle';
    this.gameScore = 0;
    this.size = 4;
    this.gameField = document.querySelector('.game-field');
    this.buttonStart = document.querySelector('.button.start');

    this.board = initialState || [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.buttonStart.addEventListener('click', () => {
      if (this.gameStatus === 'playing') {
        this.restart();
      } else {
        this.start();
      }
    });
  }

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {}

  /**
   * @returns {number}
   */
  getScore() {}

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.board;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.gameStatus;
  }

  /**
   * Starts the game.
   */
  start() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.gameStatus = 'playing';
    startMessage.classList.add('hidden');
    this.buttonStart.classList.add('restart');
    this.buttonStart.textContent = 'Restart';

    this.addRandomCell();
    this.addRandomCell();
    this.updateBoard();
  }

  /**
   * Resets the game.
   */
  restart() {
    this.gameStatus = 'idle';
    this.gameScore = 0;
    startMessage.classList.remove('hidden');
    this.buttonStart.classList.remove('restart');
    this.buttonStart.textContent = 'Start';

    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.updateBoard();
  }

  getEmptyCells() {
    const emptyCells = [];

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    return emptyCells;
  }

  getRandomValue() {
    const randomNumber = Math.random();

    return randomNumber < 0.1 ? 4 : 2;
  }

  addRandomCell() {
    const emptyCells = this.getEmptyCells();

    if (emptyCells.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];

    this.board[row][col] = this.getRandomValue();
  }

  updateBoard() {
    const tableRows = this.gameField.querySelectorAll('.field-row');

    this.board.forEach((rowValues, rowIndex) => {
      const fieldCells = tableRows[rowIndex].querySelectorAll('.field-cell');

      rowValues.forEach((cellValue, colIndex) => {
        const cellElement = fieldCells[colIndex];

        cellElement.textContent = '';
        cellElement.className = 'field-cell';

        if (cellValue !== 0) {
          cellElement.textContent = cellValue;
          cellElement.classList.add(`tile`);
          cellElement.classList.add(`field-cell--${cellValue}`);
        }
      });
    });
  }
}

module.exports = Game;
