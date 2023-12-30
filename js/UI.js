import { Modal } from './Modal';
import { examples } from './examples';

const defaultSpeed = 100;

class UI {
  #game = null;
  #rows = 100;
  #columns = 100;
  #cellSize = 10;
  #speed = defaultSpeed;

  #examplesModal = new Modal(() => this.#renderExampleContent());

  #startButton = document.getElementById('startGame');
  #nextButton = document.getElementById('nextGeneration');
  #stopButton = document.getElementById('stopGame');
  #resetButton = document.getElementById('resetGame');
  #generationNumberEl = document.getElementById('generationNumber');
  #liveNumberEl = document.getElementById('liveNumber');
  #numberOfRowsEl = document.getElementById('numberOfRows');
  #numberOfColumnsEl = document.getElementById('numberOfColumns');
  #cellSizeEl = document.getElementById('cellSize');
  #examplesButtonEl = document.getElementById('examplesModal');
  #speedRangeEl = document.getElementById('speedRange');

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
    this.#examplesButtonEl.addEventListener('click', this.#handleShowExamples);
    this.#speedRangeEl.addEventListener('change', this.#handleChangeSpeed);

    window.document.querySelectorAll('input[name=\'board_type\']').forEach((el) => {
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

  #handleShowExamples = () => {
    this.#examplesModal.showModal();
  }

  #renderExampleContent = () => {
    const content = document.createElement('div');
    content.innerHTML = `
      <div class="modal__header">
        <h2>Examples</h2>
        <button id="closeBtn" class="modal__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </button>
      </div>
      <div class="examples__content"></div>
    `;

    const examplesContentEl = content.querySelector('.examples__content');

    for (const example of examples) {
      const exampleEl = document.createElement('div');
      exampleEl.classList.add('example');
      exampleEl.innerHTML = `
        <div class="example__header">
          <h3>${example.name}</h3>
          <button class="example__btn button">Use</button>
        </div>
        <div class="example__content">
          <div class="example__description">${example.description}</div>
          <div class="example__board">
            <div class="example__board-content"></div>
          </div>
        </div>
      `;

      const exampleBoardEl = exampleEl.querySelector('.example__board-content');
      for (const row of example.pattern) {
        const rowEl = document.createElement('div');
        rowEl.classList.add('example__row');
        for (const cell of row) {
          const cellEl = document.createElement('div');
          cellEl.classList.add('example__cell');
          cellEl.classList.add(cell ? 'example__cell--alive' : 'example__cell--dead');
          rowEl.appendChild(cellEl);
        }
        exampleBoardEl.appendChild(rowEl);
      }

      exampleEl.querySelector('.example__btn').addEventListener('click', () => {
        this.#game.setBoard(example);
        this.#examplesModal.closeModal();
      });

      examplesContentEl.appendChild(exampleEl);
    }



    content.querySelector('#closeBtn').addEventListener('click', () => {
      this.#examplesModal.closeModal();
    });

    return content;
  }

  #handleChangeSpeed = (event) => {
    const value = Number.parseInt(event.target.value);
    this.#speed = Math.round(defaultSpeed * 10 / value);
  }

  updateGeneration(generation) {
    this.#generationNumberEl.textContent = generation;
  }

  updateLive(live) {
    this.#liveNumberEl.textContent = live;
  }
}

export { UI };
