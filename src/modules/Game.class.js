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

    document.addEventListener('keydown', (ev) => {
      switch (ev.key) {
        case 'ArrowUp':
          this.moveUp();
          break;
        case 'ArrowDown':
          this.moveDown();
          break;
        case 'ArrowLeft':
          this.moveLeft();
          break;
        case 'ArrowRight':
          this.moveRight();
          break;
      }
    });
  }

  get rows() {
    return this.board;
  }

  set rows(newRows) {
    this.board = newRows;
  }

  get columns() {
    const cols = [];

    for (let i = 0; i < this.size; i++) {
      const col = [];

      for (let j = 0; j < this.size; j++) {
        col.push(this.board[j][i]);
      }
      cols.push(col);
    }

    return cols;
  }

  set columns(newColumns) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.board[j][i] = newColumns[i][j];
      }
    }
  }

  moveLeft() {
    if (this.gameStatus !== 'playing') {
      return;
    }

    for (let i = 0; i < this.size; i++) {
      const row = this.board[i];

      let RowWithoutZeroElements = row.filter((cell) => cell !== 0);
      let newRow = [...RowWithoutZeroElements];

      while (newRow.length < this.size) {
        newRow.push(0);
      }

      for (let j = 0; j < this.size - 1; j++) {
        if (newRow[j] !== 0 && newRow[j] === newRow[j + 1]) {
          newRow[j] *= 2;
          this.gameScore += newRow[j];
          newRow[j + 1] = 0;
          j++;
        }
      }

      RowWithoutZeroElements = newRow.filter((cell) => cell !== 0);
      newRow = [...RowWithoutZeroElements];

      while (newRow.length < this.size) {
        newRow.push(0);
      }

      this.board[i] = newRow;
    }

    this.addRandomCell();
    this.updateBoard();
  }
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

    // console.log(this.board);
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
