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

    let lastTime = 0;

    const run = (now) => {
      const speed = this.ui.speed;
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
    const [generation, live] = this.board.next();
    this.ui.updateGeneration(generation);
    this.ui.updateLive(live);
  }

  reset() {
    this.board.reset();
    this.ui.updateGeneration(0);
    this.ui.updateLive(0);
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
    this.board.initialize();
  }

  setBoard(example) {
    this.reset();
    this.board.setBoard(example);
  }
}

export { Game };
