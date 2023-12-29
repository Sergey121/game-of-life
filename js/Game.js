import { HtmlBoard } from './HtmlBoard';
import { UI } from './UI';
import { CanvasBoard } from './CanvasBoard';

class Game {
  ui = new UI(this);
  board = null;

  #isRunning = false;

  initialize() {
    this.board = new CanvasBoard(this.ui);
    this.board.initialize();
  }

  start() {
    if (this.#isRunning) {
      return;
    }

    this.#isRunning = true;

    const speed = this.ui.speed;
    let lastTime = 0;

    const run = (now) => {
      if (!this.#isRunning) {
        return;
      }

      const delta = now - lastTime;
      if (delta > speed) {
        this.next();
        lastTime = now;
      }
      window.requestAnimationFrame(run);
    }

    window.requestAnimationFrame(run)
  }

  stop() {
    this.#isRunning = false;
  }

  next() {
    const generation = this.board.next();
    this.ui.updateGeneration(generation);
  }

  reset() {
    this.board.reset();
    this.ui.updateGeneration(0);
  }

  changeFieldSize() {
    this.reset();
    this.board.changeFieldSize();
  }

  changeBoardType(value) {
    this.reset();
    this.board = value === 'htmlBoard' ? new HtmlBoard(this.ui) : new CanvasBoard(this.ui);
    this.board.initialize();
  }

  changeCellSize() {
    this.reset();
    this.initialize();
  }
}

export { Game };
