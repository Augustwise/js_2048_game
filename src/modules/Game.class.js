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
  getState() {}

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
  getStatus() {}

  /**
   * Starts the game.
   */
  start() {
    this.gameStatus = 'playing';
    startMessage.classList.add('hidden');
    this.buttonStart.classList.add('restart');
    this.buttonStart.textContent = 'Restart';
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
  }

  // Add your own methods here
}

module.exports = Game;
