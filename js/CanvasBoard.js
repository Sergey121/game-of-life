import { Board } from './Board';
import { parseId } from './utils';

const fillColor = 'rgb(12, 53, 71)';
const strokeColor = 'rgb(175, 216, 248)';
const bgColor = 'rgb(236, 240, 241)';

class CanvasBoard extends Board {
  #canvas = null;
  #context = null;
  #prevSelectedCell = null;

  initialize() {
    super.initialize();

    const canvas = document.createElement('canvas');
    canvas.width = this.ui.columns * this.ui.cellSize;
    canvas.height = this.ui.rows * this.ui.cellSize;

    const content = document.getElementById('content');
    content.innerHTML = '';

    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');

    this.#context.strokeStyle = strokeColor;

    for (let i = 0; i < this.ui.rows; i++) {
      for (let j = 0; j < this.ui.columns; j++) {
        this.#drawEmptyCell(i, j);
      }
    }

    canvas.addEventListener('mousemove', this.#handleMouseMove);
    canvas.addEventListener('click', this.#handleMouseClick);

    content.appendChild(canvas);
  }

  #drawEmptyCell = (row, column) => {
    this.#context.strokeStyle = strokeColor;
    this.#context.fillStyle = bgColor;
    this.#context.fillRect(
      column * this.ui.cellSize,
      row * this.ui.cellSize,
      this.ui.cellSize,
      this.ui.cellSize,
    );
    this.#context.strokeRect(
      column * this.ui.cellSize,
      row * this.ui.cellSize,
      this.ui.cellSize,
      this.ui.cellSize,
    );
  }

  #drawFilledCell = (row, column) => {
    this.#context.fillStyle = fillColor;
    this.#context.fillRect(
      column * this.ui.cellSize,
      row * this.ui.cellSize,
      this.ui.cellSize,
      this.ui.cellSize,
    );
  }

  draw() {
    this.live.forEach((id) => {
      const [row, column] = parseId(id);
      this.#drawFilledCell(row, column);
    });

    this.died.forEach((id) => {
      const [row, column] = parseId(id);
      this.#drawEmptyCell(row, column);
    });
  }

  #handleMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const row = Math.floor(y / this.ui.cellSize);
    const column = Math.floor(x / this.ui.cellSize);

    if (event.buttons === 1) {
      if (!this.#prevSelectedCell || this.#prevSelectedCell[0] !== row || this.#prevSelectedCell[1] !== column) {
        this.#drawFilledCell(row, column);
        this.onCellClick(row, column);
      }
    }

    this.#prevSelectedCell = [row, column];
  }

  #handleMouseClick = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const row = Math.floor(y / this.ui.cellSize);
    const column = Math.floor(x / this.ui.cellSize);

    this.#drawFilledCell(row, column);
    this.onCellClick(row, column);
  }
}

export { CanvasBoard };
