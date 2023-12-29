class UI {
  #game = null;
  #rows = 100;
  #columns = 100;
  #cellSize = 10;
  #speed = 100;

  #startButton = null;
  #nextButton = null;
  #stopButton = null;

  constructor(game) {
    this.#game = game;
    this.initialize();
  }

  get rows() {
    return this.#rows;
  }

  get columns() {
    return this.#columns;
  }

  get cellSize() {
    return this.#cellSize;
  }

  get speed() {
    return this.#speed;
  }

  initialize() {
    const container = document.getElementById('content');
    const startButton = document.createElement('button');
    startButton.textContent = 'Start';

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';

    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop';

    container.appendChild(startButton);
    container.appendChild(nextButton);
    container.appendChild(stopButton);

    startButton.addEventListener('click', this.#handleStartClick);
    nextButton.addEventListener('click', this.#handleNextClick)
    stopButton.addEventListener('click', this.#handleStopClick);

    this.#startButton = startButton;
    this.#nextButton = nextButton;
    this.#stopButton = stopButton;
  }

  #handleStartClick = () => {
    this.#game.start();
  }

  #handleNextClick = () => {
    this.#game.next();
  }

  #handleStopClick = () => {
    this.#game.stop();
  }
}

export { UI };
