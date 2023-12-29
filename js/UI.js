class UI {
  #game = null;
  #rows = 100;
  #columns = 100;
  #cellSize = 10;
  #speed = 100;

  #startButton = document.getElementById('startGame');
  #nextButton = document.getElementById('nextGeneration');
  #stopButton = document.getElementById('stopGame');
  #resetButton = document.getElementById('resetGame');
  #generationNumberEl = document.getElementById('generationNumber');
  #numberOfRowsEl = document.getElementById('numberOfRows');
  #numberOfColumnsEl = document.getElementById('numberOfColumns');

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
    this.#startButton.addEventListener('click', this.#handleStartClick);
    this.#nextButton.addEventListener('click', this.#handleNextClick)
    this.#stopButton.addEventListener('click', this.#handleStopClick);
    this.#resetButton.addEventListener('click', this.#handleResetClick);
    this.#numberOfRowsEl.addEventListener('change', this.#handleChangeRows);
    this.#numberOfColumnsEl.addEventListener('change', this.#handleChangeColumns);
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

  #handleResetClick = () => {
    this.#game.reset();
  }

  #handleChangeRows = (event) => {
    const value = Number.parseInt(event.target.value);
    if (Number.isNaN(value)) {
      return window.alert('Incorrect value.');
    }
    this.#rows = Math.round(value);
    this.#game.changeFieldSize();
  }
  #handleChangeColumns = (event) => {
    const value = Number.parseInt(event.target.value);
    if (Number.isNaN(value)) {
      return window.alert('Incorrect value.');
    }
    this.#columns = Math.round(value);
    this.#game.changeFieldSize();
  }

  updateGeneration(generation) {
    this.#generationNumberEl.textContent = generation;
  }
}

export { UI };
