import { Board } from './Board';
import { parseId } from './utils';

class HtmlBoard extends Board {
  elements = [];
  container = null;

  initialize() {
    super.initialize();
    const columns = this.ui.columns;
    const rows = this.ui.rows;
    const cellSize = this.ui.cellSize;

    this.elements.length = 0;

    const content = document.getElementById('content');
    content.innerHTML = '';

    const container = document.createElement('div');

    container.style.width = `${columns * cellSize}px`;
    this.container = container;

    for (let i = 0; i < rows; i++) {
      const row = document.createElement('div');
      row.classList.add('row');

      for (let j = 0; j < columns; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.dataset.position = `${i},${j}`;
        row.appendChild(cell);
        this.elements.push(cell);
      }

      container.appendChild(row);
    }

    content.appendChild(container);

    this.container.addEventListener('click', this.handleClick);
  }

  handleClick = (event) => {
    const position = event.target.dataset.position;
    if (position) {
      const [row, column] = parseId(position);
      this.onCellClick(row, column);
    }
  }

  onCellClick(row, column) {
    super.onCellClick(row, column);
  }

  draw() {
    this.live.forEach((id) => {
      const [row, column] = parseId(id);
      const index = row * this.ui.columns + column;
      const cell = this.elements[index];
      cell.classList.add('alive');
    });

    this.died.forEach((id) => {
      const [row, column] = parseId(id);
      const index = row * this.ui.columns + column;
      const cell = this.elements[index];
      cell.classList.remove('alive');
    });
  }

  reset() {
    super.reset();
    this.clear();
  }

  clear() {
    this.elements.forEach(e => {
      e.classList.remove('alive');
    });
  }

  changeFieldSize() {
    super.changeFieldSize();
    this.initialize();
  }
}

export { HtmlBoard };
