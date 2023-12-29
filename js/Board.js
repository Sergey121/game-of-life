import { Cell } from './Cell';
import { parseId } from './utils';

class Board {
  constructor(ui) {
    this.#ui = ui;
  }

  #ui = null;

  #grid = [];
  #generation = 0;

  #live = new Set();
  #died = new Set();

  get ui() {
    return this.#ui;
  }

  get generation() {
    return this.#generation;
  }

  get live() {
    return [...this.#live.keys()];
  }

  get died() {
    return [...this.#died.keys()];
  }

  initialize() {
    this.#grid = [];
    const columns = this.#ui.columns;
    const rows = this.#ui.rows;

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(new Cell(`${i},${j}`, 0));
      }
      this.#grid.push(row);
    }
  }

  onCellClick(row, column) {
    const value = this.#grid[row][column].value === 0 ? 1 : 0;
    this.#grid[row][column].value = value;

    if (value === 0) {
      this.#died.add(this.#grid[row][column].id);
      this.#live.delete(this.#grid[row][column].id);
    } else {
      this.#live.add(this.#grid[row][column].id);
      this.#died.delete(this.#grid[row][column].id);
    }
    this.draw();
  }

  draw() {
    throw new Error('Must be implemented by subclass!');
  }

  next() {
    this.#runStep();
    return this.generation;
  }

  reset() {
    this.#generation = 0;
    this.#grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value === 1) {
          this.#died.add(cell.id);
        }
        cell.value = 0;
      });
    });

    this.draw();

    this.#live.clear();
    this.#died.clear();
  }

  changeFieldSize() {
    this.reset();
    this.initialize();
  }

  #runStep() {
    this.#generateNextGeneration();
    this.#generation++;
    this.draw();
  }

  #generateNextGeneration() {
    const live = new Set();
    const died = new Set();

    this.live.forEach((id) => {
      const [row, column] = parseId(id);
      const cell = this.#grid[row][column];
      const [neighbors, liveNeighbors] = this.#getNeighbors(cell);

      if (liveNeighbors.length < 2 || liveNeighbors.length > 3) {
        died.add(id);
      } else {
        live.add(id);
      }

      neighbors.forEach((neighbor) => {
        if (neighbor.value === 0) {
          const [row, column] = neighbor.position;
          const id = `${row},${column}`;
          const cell = this.#grid[row][column];
          const [, liveNeighbors] = this.#getNeighbors(cell);

          if (liveNeighbors.length === 3) {
            live.add(id);
          } else {
            died.add(id);
          }
        }
      });
    });

    [...live.keys()].forEach((id) => {
      const [row, column] = parseId(id);
      this.#grid[row][column].value = 1;
    });

    [...died.keys()].forEach((id) => {
      const [row, column] = parseId(id);
      this.#grid[row][column].value = 0;
    });

    this.#live = live;
    this.#died = died;
  }

  #getNeighbors(cell) {
    const [row, column] = cell.position;
    const neighbors = [];

    let moves = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [-1, 1], [1, -1]];

    for (let i = 0; i < moves.length; i++) {
      let nextRow = row + moves[i][0];
      let nextColumn = column + moves[i][1];

      if (nextRow === -1) {
        nextRow = this.#ui.rows - 1;
      } else if (nextRow === this.#ui.rows) {
        nextRow = 0;
      }

      if (nextColumn === -1) {
        nextColumn = this.#ui.columns - 1;
      } else if (nextColumn === this.#ui.columns) {
        nextColumn = 0;
      }

      neighbors.push(this.#grid[nextRow][nextColumn]);
    }

    return [neighbors, neighbors.filter((neighbor) => neighbor.value === 1)];
  }
}

export { Board };
