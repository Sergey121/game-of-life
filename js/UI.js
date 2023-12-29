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
  #cellSizeEl = document.getElementById('cellSize');

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
    this.#cellSizeEl.addEventListener('change', this.#handleChangeCellSize);

    window.document.querySelectorAll("input[name='board_type']").forEach((el) => {
      el.addEventListener('change', this.#handleBoardTypeChange);
    });
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

  #handleBoardTypeChange = (event) => {
    const value = event.target.value;
    this.#game.changeBoardType(value);
  }

  #handleChangeCellSize = (event) => {
    const value = Number.parseInt(event.target.value);
    if (Number.isNaN(value)) {
      return window.alert('Incorrect value.');
    }
    this.#cellSize = Math.round(value);
    this.#game.changeCellSize();
  }

  updateGeneration(generation) {
    this.#generationNumberEl.textContent = generation;
  }
}

export { UI };
